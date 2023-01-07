import React from "react";
import Signin from "./signin";

function Register({setUser, setContent
}) {
    function register(e){
        e.preventDefault();
        async function getdata(){
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let confirmpassword= document.getElementById("confirmpassword").value;
            if(password===confirmpassword){
                const result = await(await fetch("", {
                method: "POST",
                headers:{"content-Type":"application/json"},
            body:JSON.stringify({
                username, password}),
            })
            ).json();
            if(result["message"]=== "User Created"){
                setContent(<Signin setUser={setUser} setContent={setContent}/>);
            }else{
                alert(result["message"]);
            }
            } else{
                alert("Password and Confirm password are not matching");
            }
        }
        getsata();
    }
    return(
        <div className="landingcontent">
        <h1>Register</h1>
        <form>
            <input id="username" type="text" placeholder="Username"/>
            <br/>
            <br/>
            <input id="password" type="password" placeholder="confirm"/>
            <br/>
            <br/>
            <input id="confirmpassword" type="password" placeholder="confirmPassword"/>
            <br/>
            <br/>
            <button onClick={(e)=>{
                register(e);
            }}>
            </button>
        </form>
        <p>Already have an account?</p>
        <button onClick={()=>{
            setContent(<Signin setUser={setUser} setContent={setContent} />);
        }}>
            SignIn
        </button>
        </div>
    );
}

export default Register;