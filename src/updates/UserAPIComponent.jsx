import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../styles/UserApiComponent.css";
import { getAuth } from "firebase/auth";
import { useAuth } from "../contexts/authcontext";
const API_ENDPOINT = "https://chatters-backend.onrender.com";

const UserAPIComponent = () => {
  const auth = getAuth();
  const myuseaut= useAuth();
  const [fbId, setFbId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   setFbId(auth.currentUser.uid);
  //   console.log(auth.currentUser.uid);
  // }, [auth.currentUser.uid]);

  // setFbId(auth.uid);
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
  const testfun =()=>
    {
      console.log(myuseaut);
    }
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/user/getUser?fb_id=${fbId}`
      );
      setResponse(response.data.fb_id);
    } catch (error) {
      console.error("Error getting user:", error);
      setResponse("Error getting user");
    }
  };

  const updateUser = async () => {
    // setFbId(auth.uid);
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
  
    const userData = {
      name: name,
      last_name: lastName,
      about: about,
      email_id: emailId,
    };
  
    try {
      const updateapi=`${API_ENDPOINT}/user/updateUser?fb_id=${fbId}`;
      console.log(updateapi);
      const response = await axios.put(
        updateapi,
        userData,
        { headers }
      );
      setResponse(JSON.stringify(response.data, null, 2)); // Ensure only the data part of the response is set
    } catch (error) {
      console.error("Error updating user:", error);
      setResponse("Error updating user: " + error.message); // Provide a more detailed error message
    }
  };
  

  const updateUserPic = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const response = await axios.put(
        `${API_ENDPOINT}/user/updateUserPic?fb_id=${fbId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error updating user pic:", error);
      setResponse("Error updating user pic");
    }
  };

  const getUserPic = async () => {
    try {
      const response = await axios.get(`https://chatters-backend.onrender.com/user/getUserPic`, {
        params: { fb_id: fbId },
        responseType: 'blob', // Ensures the response is handled as a binary blob
      });

      const imageUrl = URL.createObjectURL(response.data);
      setProfilePicUrl(imageUrl);
    } catch (error) {
      setError("Error fetching profile picture: " + error.message);
    }
  };

  return (
    <div className="updatecontainer">
      <button onClick={testfun}>test button</button>
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email ID"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />
      <input
        type="text"
        placeholder="About"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>

      <h2>Get User</h2>
      <button onClick={getUser}>Get User</button>

      <h2>Update User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email ID"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />
      <input
        type="text"
        placeholder="About"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <button onClick={updateUser}>Update User</button>

      <h2>Update User Pic</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={updateUserPic}>Update User Pic</button>

      <h2>Get User Pic</h2>
      <button onClick={getUserPic}>Get User Pic</button>

      <h2>Response</h2>
      {/* <div className="response">{response}</div> */}
      <div>
      {profilePicUrl ? (
        <img src={profilePicUrl} alt="Profile" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default UserAPIComponent;
