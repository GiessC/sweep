import { createContext } from 'react';

type User = {}; // TODO: Temporary

interface AuthContextType {
    user: User | null;
    login?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const DEFAULT_VALUE = {
    user: null,
};

const AuthContext = createContext<AuthContextType>(DEFAULT_VALUE);

const AuthProvider = ({ children }: AuthProviderProps) => {
    return (
        <AuthContext.Provider value={DEFAULT_VALUE}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
