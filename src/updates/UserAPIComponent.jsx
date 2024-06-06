import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../styles/UserApiComponent.css";
import { getAuth } from "firebase/auth";
const API_ENDPOINT = "https://chatters-backend.onrender.com";

const UserAPIComponent = () => {
  const auth = getAuth();
  const [fbId, setFbId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  useEffect(() => {
    setFbId(auth.uid);
  }, [auth.uid]);
  const createUser = async () => {
    try {
      const userData = {
        fb_id: fbId,
        name: name,
        last_name: lastName,
        email_id: emailId,
        about: about,
        // profile_pic: "string",
      };
      const response = await axios.post(
        `${API_ENDPOINT}/user/createUser`,
        userData
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
      setResponse("Error creating user");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/user/getUser?fb_id=${fbId}`
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error getting user:", error);
      setResponse("Error getting user");
    }
  };

  const updateUser = async () => {
    try {
      const userData = {
        name: name,
        last_name: lastName,
        about: about,
        email_id: emailId,
      };
      const response = await axios.put(
        `${API_ENDPOINT}/user/updateUser?fb_id=${fbId}`,
        userData
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      setResponse("Error updating user");
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
      const response = await axios.get(
        `${API_ENDPOINT}/user/getUserPic?fb_id=${fbId}`
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error getting user pic:", error);
      setResponse("Error getting user pic");
    }
  };

  return (
    <div className="container">
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
      <div className="response">{response}</div>
    </div>
  );
};

export default UserAPIComponent;
