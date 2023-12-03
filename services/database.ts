import { app } from "./firebase";
import {getDatabase,ref,push, onValue, child} from "firebase/database"
import { remove } from "firebase/database";

const database = getDatabase(app);
export{database,ref,push,onValue,remove, child}