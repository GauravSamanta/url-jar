import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function AuthContext({ children }) {
  // Initialize state from localStorage
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/getUser", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.data && response.data.data.user._id) {
          setUser(response.data.data.user._id);
          localStorage.setItem("user", response.data.data.user._id); // Save user to localStorage
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Fetch user if not already loaded from localStorage
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};
