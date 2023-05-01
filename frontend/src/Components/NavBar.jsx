import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { CgLogIn, CgLogOut, CgProfile } from "react-icons/cg";
import DarkTheme from "./users/DarkTheme";
import AuthContext from "./context/AuthContext";

function NavBar() {
    const [dropdown, setDropdown] = useState(false);

    const { auth, setAuth, setForm } = useContext(AuthContext);

    let click = useCallback(e => {
        if(!e.target.closest(".toggleContainer") && !e.target.matches(".menu") && !e.target.matches(".navIcon")) {
            setDropdown(false);
        }
    }, []);

    let keydown = useCallback(e => {
        if(e.key === "Escape") {
            setDropdown(false);
        }
    }, []);

    useEffect(() =>{
        if(dropdown) {
            document.addEventListener("click", click);
            document.addEventListener("keydown", keydown);
        } else {
            document.removeEventListener("click", click);
            document.removeEventListener("keydown", keydown);
        }
    }, [dropdown]);

    const logout = async () => {
        await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
            method: "DELETE",
            credentials: "include"
        });
        setAuth(null);
    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link className="navLogo" to="/">
                            { auth ? `Hello, ${auth.nickname}!` : auth === null ? "Hello, world!" : "Hello" }
                        </Link>
                    </li>
                    <li>
                        { auth === null &&
                        <>
                            <button className="navButton formButton" onClick={() => setForm("signup")}>Sign up</button>
                            <button className="navButton formButton" onClick={() => setForm("login")}>Log In</button>
                        </> }
                        <button className="navIcon" onClick={() => setDropdown(!dropdown)}></button>
                    </li>
                </ul>
            </nav>
            <div className={dropdown ? "menu active" : "menu"}>
                { auth &&
                  <Link className="underline" to={`/${auth.username}`}>
                    <button><CgProfile className="icon"/>Profile</button>
                  </Link> }
                <DarkTheme/>
                { auth
                ? <button onClick={logout}><CgLogOut className="icon"/>Log Out</button>
                : <button className="formButton" onClick={() => setForm("login")}><CgLogIn className="icon"/>Log In</button> }
            </div>
            <div className="shadow"></div>
        </>
    )
}

export default NavBar;