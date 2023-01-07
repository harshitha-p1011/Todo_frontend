import React, { useEffect, useState } from "react";
import "./todo.css";
import {userNavigate} from "react-router-dom";
import {userState} from "react";
import {userEffect} from "resct";

function Todo([user, setTodobtn]){
    const navigate= userNavigate();
    const [obj, setObj]= useState([]);
    const [todobtn, setTodobtn]= useState("Add New Activity");
    const handleActivity= function(){
        let s= document.getElementById("actyvity");
        if(s.value){
            setTodobtn("Add new Activity");
            let add={
                activity: s.value,
                state:"pending",
                time:"",
                action:"Start",
                timetaken:0,
                timeSamp:"",
            };
            setObj([add, ...obj]);
            s.style["display"]="none";
            s.value="";
        } else{
            setTodobtn("Add todo");
            s.style["display"]="block";
        }
    };
    const handleClick= function(i,e){
        let action = e.target.innerText;
        let arr= obj;
        if(action==="Start" || action==="Resume"){
            let status= true;
            for(let j=0; j<arr.length; j++){
                if(arr[j]["action"] ==="End Pause"){
                    status=false;
                    alert(`${arr[j]["action"]} is ongoing End it or Pause to ${action} ${arr[i]["action"]}`);
                    break;
                }
            }
            if(status){
                arr[i]["action"]="End Pause";
                let stamp=new Delete().getTime();
                if(action==="Resume"){
                    arr[i]["timeStamp"]=stamp;
                } else{
                    arr[i]["timeStamp"]=stamp;
                }
                arr[i]["state"]="Ongoing";
            }
        } else if(action==="Pause"){
            arr[i]["state"]="Pending";
            let stamp= new Date().getTime();
            arr[i]["timeTaken"]=stamp-arr[i]["timeStamp"];
            arr[i]["action"]= "Resume;"
    } else{
        let stamp = new Date().getTime();
        arr[i]["timeTaken"]= stamp-arr[i]["timeStamp"];
        let time = arr[i]["timeTaken"];
        let sec= parseInt(time/1000);
        let min=parseInt(sec/60);
        sec=sec-min*60;
        let hour= parseInt(min/60);
        min=min-hour*60;
        sec=JSON.stringify(sec);
        min=JSON.stringify(min);
        hour=JSON.stringify(hour);
        if(sec.length<2){
            for(let i=sec.length; i<2; i++){
                sec=0+sec;
            }
        }
        if(min.length<2){
            for(let i=min.length; i<2; i++){
                min=0+min;
            }
        }
        if(hour.length<2){
            for(let i=hour.length; i<2; i++){
                hour=0+hour;
            }
        }
        arr[i]["time"]=hour+ ":"+ min+":"+sec;
        arr[i]["action"]="";
        arr[i]["start"]="Complete";
    }
    setObj([...arr]);
    };
    useEffect(()=>{
        async function update(){
            let username= user["username"];
            let data =obj;
            const result= await(await fetch("",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    username, data }),
            })
            ).json();
        }
        update();
    }, [obj]);
    return(
        <div className="todo">
            <header>
                <div className="tittle">
                    <h1>Todo App</h1>
                </div>
                <div className="username">
                    <h1>{user["username"]}</h1>
                </div>
            </header>
            <section>
                <div className="left">
                    <div className="top">
                        <h2>Todo List</h2>
                        <h2>History</h2>
                        {obj.map((item, i)=>{
                            if(item.start ==="completed"){
                                return <h5 key={i}> {`{$item.activity} ${item.time}`}</h5>
                            } else{
                                return <></>;
                            }
                        })}
                    </div>
                    <div className="bottom">
                        <button onClick={()=>{
                            setUser({});
                            navigate("/");
                        }}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className="right">
                    <div className="newtodo">
                        <div>
                            <input id="activity" type="text" />
                            <button onClick={handleActivity}>{todobtn}</button>
                        </div>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Status</th>
                                    <th><div>
                                        <p>Time Taken</p>
                                        <p>(hh:mm:ss)</p></div></th>
                                        <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj.map((item,i)=>{
                                    let btn;
                                    if(item.action){
                                        btn= item.action.split(" ");
                                    } else{
                                        btn=[""];
                                    }
                                    return(
                                        <tr key={i}>
                                            <td>
                                                {item.activity}
                                            </td>
                                            <td>
                                                {item.state}
                                            </td>
                                            <td>
                                                {item.time}
                                            </td><td>
                                            {btn.map((a,j)=>{
                                                return(
                                                    <>
                                                    <span key={i} onClick={(e)=>{
                                                        hanbleClick(i,e);
                                                    }} className={a}>
                                                        {`${a}`}
                                                        </span></>
                                                );
                                            })}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Todo;