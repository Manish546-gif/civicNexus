import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                height: '100vh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: '#fff'
            }}>
                <div style={{ fontWeight: 950, fontSize: '14px', letterSpacing: '0.1em' }}>AUTHENTICATING...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
