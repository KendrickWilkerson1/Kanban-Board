import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    const token = this.getToken();

    if (!token) {
      return null;
    } 
    return jwtDecode<JwtPayload>(token)
  } 

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in 
    const token = this.getToken();
    return token;
  }
  
   isTokenExpired(token: string) {
  //   // TODO: return a value that indicates if the token is expired
  try {
    const userToken = jwtDecode<JwtPayload>(token);

    if(!userToken.exp) {
      return true
    }

    const timeStamp = Math.floor(Date.now()/1000);
    return userToken.exp < timeStamp
  } catch (error) {
    return true
  }
  }

  getToken(): string {
    // DONE: return the token 
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    console.log('YOURE IN LOGIN AUTH.TS')
    // DONE: set the token to localStorage 
    localStorage.setItem('id_token', idToken);
    // DONE: redirect to the home page 
    window.location.assign('/');
  }

  logout() {
    // DONE: remove the token from localStorage 
    localStorage.removeItem('id_token');
    // DONE: redirect to the login page 
    window.location.assign('/login');
  }
}

export default new AuthService();
