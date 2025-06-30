import React, { useEffect, useState, createContext, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Input,
 
  DialogContent,
 
  DialogTitle,
 
  Stack,
 
} from "@mui/material";

import { CONFIG } from '../config-global';



// ----------------------------------------------------------------------
interface Todo {
  id: string;
  item: string;
}
const TodosContext = createContext({
  todos: [], fetchTodos: () => {}
})
export default function Employee() {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todo")
    const todos = await response.json()
    setTodos(todos.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])
   
  return (
    <>
      <title>{`Employee - ${CONFIG.appName}`}</title>
<TodosContext.Provider value={{todos, fetchTodos}}>
  
    </TodosContext.Provider>
     
    </>
  );
}
