import { AuthContext } from "./AuthContext";
import axios from 'axios';
import httpStatus from 'http-status'

function AuthProvider({children}){
    async function Login(username,password){
      let data={
        username,
        password
      }

      try{
         let resp = await axios.post("http://localhost:8000/api/users/login",data);
       let token = resp.data.token;
       console.log(resp);
       console.log("Login success");
      // clear
      }
      catch(e){
        console.log(e);
      }
    }
    async function Register(username,password,name){
      let data={
        username,
        password,
        name
      }
         try{
            let resp = await axios.post("http://localhost:8000/api/users/register",data);
            console.log("Register succes",data)
         }
          catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
  }
    }
   return(
     <AuthContext.Provider value={{Login,Register}}>
        {children}
    </AuthContext.Provider>
   );
}

export default AuthProvider;