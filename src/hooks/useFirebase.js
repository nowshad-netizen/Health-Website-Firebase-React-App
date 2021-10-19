import { useState } from "react"
import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";
initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();

    const signinUsinggoogle = () => {
        return signInWithPopup(auth, googleProvider)
            .finally(() => { setLoading(false) });
    }
    const signinUsinggit = () => {
        return signInWithPopup(auth, gitProvider).finally(() => { setLoading(false) })
    }
    const registerNewUser = (email, password, name) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                setUserName(name);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                setError(errorCode);
            });
    }
    const setUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(
            result => { }
        )
    };
    const signinwithpassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).finally(() => { setLoading(false) })
    }
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
        })
    }, []);
    const logout = () => {
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {

        });
    }
    return {
        user,
        error,
        signinUsinggoogle,
        signinUsinggit,
        logout,
        registerNewUser,
        signinwithpassword
    }
}


export default useFirebase;