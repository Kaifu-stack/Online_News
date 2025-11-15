import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

/**
 * Safe access to authentication context
 */
const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('❌ useAuth must be used within an <AuthProvider>');
    }

    return context;
};

export default useAuth;
