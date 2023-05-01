import { createContext, useState, useEffect } from "react";
import LogInForm from "../users/LogInForm";
import SignUpForm from "../users/SignUpForm";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState();

    const [form, setForm] = useState("");
    
    useEffect(() => {
        const getCurrentUser = async () => {
            let response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
                credentials: "include"
            });
            let userData = await response.json();
            setAuth(userData);
        }
        getCurrentUser();
    }, []);

    useEffect(() => {
        form
        ? document.body.classList.add("popup")
        : document.body.classList.remove("popup")
    }, [form]);

    return (
        <AuthContext.Provider value={{auth, setAuth, setForm}}>
            {children}
            { form === "signup" && <SignUpForm setForm={setForm}/> }
            { form === "login" && <LogInForm setForm={setForm} setAuth={setAuth}/> }
        </AuthContext.Provider>
    )
}

export default AuthContext;