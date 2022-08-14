import React, { useReducer, useContext, createContext, Dispatch } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import ToDoList from "./components/ToDo/ToDoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/create" element={<SignUp />} />
        <Route path="/todolist" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
