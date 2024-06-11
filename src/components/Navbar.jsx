import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../lib/axios";

function Navbar() {
  const { user, setUser, isAuth, setIsAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response) {
        setUser(null);
        setIsAuth(false);
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      <div className="wrapper h-[80px] items-center justify-between px-4">
        <h2 className="font-pally-bold text-2xl">
          <Link to={"/"}>Todo App</Link>
        </h2>
        <div className="flex items-center gap-x-3">
          <p>{user?.email}</p>
          {!isAuth ? (
            <Link to={"/login"}>
              <button className="uppercas rounded-md bg-accent p-2 px-3 text-light transition-colors ease-in-out hover:bg-accent-hover">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="uppercas rounded-md bg-accent p-2 px-3 text-light transition-colors ease-in-out hover:bg-accent-hover"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
