import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { todoType, addToDoType } from "../../type/todo/todo";
import ToDoAPI from "../../api/wantedAPI/todo/todo";

const toDoAPI = new ToDoAPI(localStorage.getItem("token"));

const ToDoList = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigage = useNavigate();
  const [todos, setToDos] = useState<todoType[]>([]);
  const getUserToDos = useCallback(async () => {
    try {
      const data = await toDoAPI.getUserToDoS();
      data && setToDos(data);
      console.log("1");
    } catch (error) {
      throw error;
    }
  }, [setToDos, toDoAPI]);

  const createToDo = async (title: string, content: string) => {
    try {
      const data = await toDoAPI.createToDo(title, content);
      data && setToDos([...todos, data]);
    } catch (error) {
      throw error;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await toDoAPI.deleteToDo(id);
      setToDos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!token) {
      alert("로그인해주세요");
      navigage("/");
    } else getUserToDos();
  }, [token, navigage]);

  return (
    <>
      <Lists
        todos={todos}
        getUserToDos={getUserToDos}
        deleteTodo={deleteTodo}
      />
      <ToDoInput createToDo={createToDo} />
    </>
  );
};

interface IToDoInput {
  createToDo: (title: string, content: string) => Promise<void>;
}

const ToDoInput: React.FC<IToDoInput> = ({ createToDo }) => {
  const [toDoInputs, setToDoInputs] = useState<addToDoType>({
    title: "",
    content: "",
  });

  const onChageInputs = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setToDoInputs({ ...toDoInputs, [name]: value });
  };

  return (
    <div>
      <input
        onChange={onChageInputs}
        value={toDoInputs.title}
        name="title"
        type="text"
        placeholder="제목"
      />
      <input
        onChange={onChageInputs}
        value={toDoInputs.content}
        name="content"
        type="text"
        placeholder="할일"
      />
      <button onClick={() => createToDo(toDoInputs.title, toDoInputs.content)}>
        추가
      </button>
    </div>
  );
};

interface ListsProps {
  todos: todoType[];
  getUserToDos: () => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const Lists: React.FC<ListsProps> = ({ todos, getUserToDos }) => {
  return (
    <ul>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => {
          return (
            <li key={todo.id} id={todo.id}>
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.content}</p>
                <button
                  onClick={() => {
                    toDoAPI.deleteToDo(todo.id);
                    getUserToDos();
                  }}
                >
                  delete
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ToDoList;
