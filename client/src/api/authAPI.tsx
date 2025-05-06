import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // DONE: make a POST request to the login route  
  try {
   console.log('LOGIN FUNCTION HAS BEEN CALLED');


    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      console.log('THERE HAS BEEN A LOGIN ERROR')
      return 
      // const errorData = await response.json(); 
      // throw new Error(`Error: ${errorData.message}`);   
    }

    const data = await response.json();
    console.log('GETTING DATA')
    return data;  
  } catch (err) {
    console.log('Error from user login: ', err);  
    return Promise.reject('Could not fetch user info');  
  }
}



export { login };
