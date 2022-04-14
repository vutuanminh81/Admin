import axios from "axios";
import { async } from "q";
import { useNavigate } from "react-router-dom";

const Session = async (navigate) => {
        await axios.get('http://localhost:3000/get_session')
        .then(respn => {
            if(respn.data === true){
              //alert("has session");
            }else{
              navigate("/login");
            } 
        })
}
export default Session;