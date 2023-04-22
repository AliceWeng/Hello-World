import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";

function DarkTheme() {
    const [darkTheme, setDarkTheme] = useState(null);

    useEffect(() => {
        let boolean = localStorage.getItem("darkTheme");
        if(boolean === "true") {
            setDarkTheme(true);

        }
        if(boolean === "false") setDarkTheme(false);
    }, []);

    useEffect(() => {
        if(darkTheme !== null) localStorage.setItem("darkTheme", darkTheme);
        darkTheme
            ? document.body.classList.add("darkTheme")
            : document.body.classList.remove("darkTheme")
    }, [darkTheme]);

    return (
        <div className="toggleContainer">
            <MdDarkMode/>
            <label htmlFor="toggle">Dark Theme</label>
            <input
                id="toggle"
                type="checkbox"
                checked={darkTheme}
                onClick={() => setDarkTheme(!darkTheme)}/>
            <span className="slider" onClick={() => setDarkTheme(!darkTheme)}></span>
        </div>
    )
}

export default DarkTheme;