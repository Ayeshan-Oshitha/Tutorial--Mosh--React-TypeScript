import LoginStatus from "./auth/LoginStatus";
import useCounterStore from "./counter/store";
import useTasks from "./tasks/useTasks";

const NavBar = () => {
  const { tasks, dispatch } = useTasks();
  const { counter } = useCounterStore();

  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{counter}</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
