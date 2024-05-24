import { useEffect } from "react";

function useDarkTheme(darkTheme: Boolean) {
  useEffect(() => {
    const body = document.querySelector("body");
    if (darkTheme) {
      if (body) {
        body.classList.add("dark-theme");
      }
    } else {
      if (body) {
        body.classList.remove("dark-theme");
      }
    }
  }, [darkTheme]);
}

export default useDarkTheme;
