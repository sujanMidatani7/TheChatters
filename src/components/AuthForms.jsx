import React, { useState } from "react";
import "../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from "../firebase/auth";
import { doSignInWithGoogle, doSendEmailVerification } from "../firebase/auth";
import { useAuth } from "../contexts/authcontext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { error } from "console";
const AuthForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isSigningin, setisSigningin] = useState(false);
  const [raisederror, setraisederror] = useState("");

  const { userLoggedIn } = useAuth();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const onsignin = async (e) => {
    e.preventDefault();
    if (!isSigningin) {
      setisSigningin(true);
      await signInWithEmailAndPassword(email, password);
    }
  };
  const ongooglesignin = async(e)=>
    {
        e.preventDefault();
        if(!isSigningin)
            {
                setisSigningin(true);
                doSignInWithGoogle().catch(error=>
                    {
                        console.log(error);
                    }
                )
            }
    }
  const directHome = () => {
    // window.location.href = '/home';
    navigate("/home");
  };
  return (
    <div className={`container ${active ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          {/* <div className="social-icons">
                        <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div> */}
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button" onClick={directHome()}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          {/* <div className="social-icons">
                        <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                    </div> */}
          <span>or use your email for login</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button type="button" onClick={directHome()}>
            Sign In
          </button>
          <button type="button"> signin in with google </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
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
              Register with your personal details to use all of site features
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
    </div>
  );
};

export default AuthForm;
