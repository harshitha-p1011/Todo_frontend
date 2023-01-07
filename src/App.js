import React from "react";
import { useState } from "react";
import './App.css';
import {BrowserRouter as Routes, Route} from "react-router-dom";
import Landing from "./Components/signin_and_register/landing";
import Todo from "./Components/todo/todo";

function App() {
  const[user, setUser]=userState({});
  return(
    <Route>
      <Route>
        <Route path="/" element={<Landing setUser={setUser}/>}/>
        <Route path="/todo" element={<Todo user={user} setUser={setUser}/>}/>
      </Route>
    </Route>
  )
}

export default App;
