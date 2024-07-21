import React, { useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/AuthContext";
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/"
          className="flex items-center hover:text-black transition-colors"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/"
          className="flex items-center hover:text-black transition-colors"
        >
          Account
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/about"
          className="flex items-center hover:text-black transition-colors"
        >
          About
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="https://github.com/GauravSamanta/url-jar"
          className="flex items-center hover:text-black transition-colors"
        >
          source code
        </Link>
      </Typography>
    </ul>
  );
}

export default function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.clear();
      setUser(null);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        className="mx-auto max-w-screen-xl px-6 py-3 mb-10 border-2"
        color="gray"
        shadow={true}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            url jar
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <Link to="/login">
              <Button variant="gradient" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient" size="sm">
                Register
              </Button>
            </Link>
            <Link>
              <Button
                variant="gradient"
                size="sm"
                fullWidth
                onClick={handleLogOut}
              >
                logout
              </Button>
            </Link>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Link to="/login">
              <Button variant="gradient" size="sm" fullWidth>
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient" size="sm" fullWidth>
                Register
              </Button>
            </Link>

            <Link>
              <Button
                variant="gradient"
                size="sm"
                fullWidth
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </Link>
          </div>
        </Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}
