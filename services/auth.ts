import { app } from "./firebase";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
const auth= getAuth(app);

const funcaologin = async(email:string , senha: string) =>{
    
    let result = null,
    error = null;
    try{
      
       result= await signInWithEmailAndPassword(auth, email, senha);

    }catch (e) {
        error = e;
   }
   return{error, result};
 };
const funcaocadastrar = async(email:string,senha: string) =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        }catch (erro) {
        }
}


 export {auth,funcaocadastrar,funcaologin}