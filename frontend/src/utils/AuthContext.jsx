import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function AuthContext({ children }) {
  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/getUser", {
          headers: { "Content-Type": "application/json" },
        });

        if (response) {
          setUser(response.data);
          console.log(user);
          localStorage.setItem('user', JSON.stringify(response.data)); // Save user to localStorage
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Fetch user if not already loaded from localStorage
    if (!user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    // Update localStorage whenever the user state changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};
