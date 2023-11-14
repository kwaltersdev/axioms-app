"use client";
import React from "react";

export const DarkModeButton = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleClick = () => {
    const darkModeTmp = !darkMode;

    if (darkModeTmp) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    setDarkMode(darkModeTmp);
  };

  return (
    <button onClick={handleClick} style={{ border: 'none' }}>
      <span className="material-symbols-outlined">
        {darkMode ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};