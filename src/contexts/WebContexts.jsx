import { useEffect, useState, createContext, useContext } from "react";

const WebContext = createContext();

export const useWebContext = () => useContext(WebContext);

const WebProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <WebContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </WebContext.Provider>
  );
};

export default WebProvider;