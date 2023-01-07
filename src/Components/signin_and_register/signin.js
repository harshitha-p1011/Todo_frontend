import React from "react";
import {userNavigate} from "react-router-dom";
import Register from "./register";

function Signin({setUser, setContent}){
    const navigate= userNavigate();
    const handleSignin= function(e){
        e.preventDefault();
        async function getdata(){
            let username= document.getElementById("username").value;
            let password= document.getElementById("password").value;
            const result= awai(
                await fetch("https://todo-backend-6jg0.onrender.com",{method:"POST", headers:{"content-type":"application/json"},
            body: json.stringify({username, password}),})
            ).json();
            if(result["username"]===username){
                setUser(result);
                navigate("/todo");
            } else{
                alert(result["message"]);
            }
        }
        getdata();
    };
    return(
        <div
            className="landingcontent">
                <h1>SignIn</h1>
                <form>
                    <input id="username" type="text" placeholder="Username"/>
                    <br/>
                    <br/>
                    <input id="password" type="password" placeholder="password"/>
                    <br/>
                    <br/>
                    <button onClick={(e)=>{handleSignin(e);}}>SignIn</button>
                </form>
                <p>Don't have a account?</p>
                <button onClick={()=>(<Register setUser={setUser} setContent={setContent}/>)
                }> Register</button>
        </div>
    );
}
export default Signin;
