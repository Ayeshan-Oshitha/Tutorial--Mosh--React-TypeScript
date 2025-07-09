import type React from "react";
import { useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          value={person.name}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          age
        </label>
        <input
          id="age"
          type="number"
          className="form-control"
          value={person.age}
          onChange={(e) => setPerson({ ...person, age: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
