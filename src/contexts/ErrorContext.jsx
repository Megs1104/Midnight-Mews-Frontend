import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(true);
    return (
        <ErrorContext.Provider value={{error,setError}}>
            {children}
        </ErrorContext.Provider>
    )
};