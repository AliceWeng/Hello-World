import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            let response = await fetch("http://localhost:3001/api/user", {
                credentials: "include"
            });
            let user = await response.json();
            setAuth(user);
        }
        getCurrentUser();
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;