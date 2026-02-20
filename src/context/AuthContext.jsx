import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`);
                    setUser(res.data);
                } catch (error) {
                    console.error('Failed to load user', error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const refreshUser = async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`);
            setUser(res.data);
        } catch (error) {
            console.error('Failed to refresh user', error);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (userData) => {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, userData);
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const googleLogin = async (tokenId) => {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google`, { tokenId });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, googleLogin, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
