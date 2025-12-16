import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { showToast } from './ui.js';

export const checkAuth = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

export const loginUser = async (email, pass) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.location.href = 'index.html';
    } catch (error) {
        showToast(error.message);
    }
};

export const registerUser = async (email, pass) => {
    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        window.location.href = 'index.html';
    } catch (error) {
        showToast(error.message);
    }
};

export const logout = async () => {
    await signOut(auth);
    window.location.href = 'login.html';
};
