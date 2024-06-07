import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";
// import { AuthProvider } from "../contexts/authcontext";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSendEmailVerification,
} from "../firebase/auth";
import { useAuth } from "../contexts/authcontext";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// import exp from "constants";
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [raisedError, setRaisedError] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const API_ENDPOINT = "https://chatters-backend.onrender.com";
  const auth = getAuth();
  const [fbId, setFbId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [about, setAbout] = useState("");
  const createUser = async () => {
    
    const userData = {
      fb_id: fbId,
      name: name,
      last_name: lastName,
      email_id: emailId,
      about: about,
    };

    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${API_ENDPOINT}/user/createUser`,
        userData,
        {
          headers,
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        setFbId(auth.currentUser.uid);
        navigate("/home");
      } catch (error) {
        console.log(error);
        alert(error);
        setRaisedError(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      //create user should be called here
      navigate("/home");
    } catch (error) {
      console.log(error);
      setRaisedError(error.message);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        //get user should be used if user not found createuser should be called
        navigate("/home");
      } catch (error) {
        console.log(error);
        setRaisedError(error.message);
        setIsSigningIn(false);
      }
    }
  };
  const testfun =()=>
  {
    console.log(useAuth);
  }
  const directHome = () => {
    navigate("/home");
  };
  
  return (
    <div className={`container ${active ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={onSignUp}>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            Sign Up
          </button>
          <button type="button" onClick={onGoogleSignIn}>
            Sign up with Google
          </button>
          <button >test button</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={onSignIn}>
          <h1>Sign In</h1>
          <span>or use your email for login</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit">
            Sign In
          </button>
          <button type="button" onClick={onGoogleSignIn}>
            Sign in with Google
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button
              className="hidden"
              id="login"
              onClick={() => setActive(false)}
            >
              Sign In
            </button>
            
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of the site's
              features
            </p>
            <button
              className="hidden"
              id="register"
              onClick={() => setActive(true)}
            >
              Sign Up
            </button>
            
          </div>
        </div>
      </div>
      {/* {raisedError && <div className="error">{raisedError}</div>} */}
    </div>
  );
};

export default AuthForm;
