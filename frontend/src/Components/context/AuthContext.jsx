import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            let response = await fetch(`${process.env.REACT_APP_FETCH_URI}/api/users/auth`, {
                credentials: "include"
            });
            let user = await response.json();
            setAuth(user);
        }
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;