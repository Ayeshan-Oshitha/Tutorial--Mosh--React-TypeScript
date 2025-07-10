import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    // Optimistic Update
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    axios
      .delete(`https://jsonplaceholder.typicode.com/users/` + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <div>
      {error && <p className="text-danger"></p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
