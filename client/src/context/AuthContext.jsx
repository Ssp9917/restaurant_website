import React, { createContext, useEffect, useState } from 'react';
import axios from '../config/axiosConfig';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token"); // Retrieve the token from local storage
        if (storedUser) {
            setUser(storedUser);
        }
        if (storedToken) {
            setToken(storedToken); // Set the token in state
        }
        setLoading(false);
    }, []);

    // Save user data and token to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }

        if (token) {
            localStorage.setItem("token", token); // Save the token to local storage
        } else {
            localStorage.removeItem("token"); // Remove the token if there's no user
        }
    }, [user, token]); // Run this effect whenever user or token changes

    const signup = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('/auth/signup', data);
            if (response.status === 201) {
                setToken(response.data.token); // Set the token in state
                setUser(response.data.user); // Set the user in state
                return response.data;
            } else {
                console.log("User not created successfully");
            }
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('/auth/login', data);
            setToken(response.data.token); // Set the token in state
            setUser(response.data.user); // Set the user in state
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };


   



    const logout = async () => {
        setLoading(true);
        try {
            setToken(null)
            setUser(null)

        } catch (error) {
            console.error('logout error:', error);
            throw error;
        } finally {
            setLoading(false);
        }

        return
    };

    return (
        <AuthContext.Provider value={{ user, loading, token, signup, logout,login }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
