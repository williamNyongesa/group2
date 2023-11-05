import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Logout = () => {
   const navigate = useNavigate()
   const {enqueueSnackbar} = useSnackbar()


const handleLogout = () =>{
    fetch("/logout", {
        method: "DELETE",
        credentials: "include"
    })
    .then(r => {
        if(r.status===200){
            enqueueSnackbar("Log out  successfully!", {variant: "success"})
        }else if (r.status===401){
            enqueueSnackbar("Customer not logged in", {variant: "success"})
            navigate("/login")
        }
    })
    navigate("/")
}
    return ( <div>
        <button onClick={handleLogout}>Logout</button>
    </div> );
}
 
export default Logout;