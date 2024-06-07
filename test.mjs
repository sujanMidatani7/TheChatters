import axios from 'axios';

async function createUser() {
  try {
    const url = 'https://chatters-backend.onrender.com/user/createUser';
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const data = {
      "fb_id": "asdfsdf",
      "name": "mc",
      "last_name": "asdf",
      "email_id": "asd",
      "about": "ff",
      "notifications": [],
      "friends_list": [],
      "chat_rooms_joined": [],
      "chat_rooms_created": [],
      "profile_pic": "string"
    };
    const response = await axios.post(url, data, { headers });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
createUser();
