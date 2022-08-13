import wantedAPI from "../wantedBaseAPI";

import { todoType, getToDosType, addToDoType } from "../../../type/todo/todo";

interface IToDoAPI {
  getUserToDoS: () => Promise<todoType | undefined>;
  createToDo: (title: string, content: string) => Promise<void>;
  deleteToDo: (todo_id: string) => Promise<void>;
}
class ToDoAPI implements IToDoAPI {
  private token;
  constructor(token: string) {
    this.token = token;
  }

  getUserToDoS = async () => {
    try {
      if (this.token) {
        console.log("지나갑니다~~");
        const { data } = await wantedAPI.get<todoType>("/todos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        });
        return data;
      }
    } catch {
      new Error("할 일 목록을 가져오는데 실패하였습니다.");
    }
  };

  createToDo = async (title: string, content: string) => {
    try {
      if (this.token) {
        const { data } = await wantedAPI.get("/todos:", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
          data: {
            title,
            content,
          },
        });
      }
    } catch {
      new Error("할 일 목록을 가져오는데 실패하였습니다.");
    }
  };

  deleteToDo = async (todo_id: string) => {
    try {
      if (this.token) {
        await wantedAPI.delete(`/todos/${todo_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        });
      }
    } catch {
      new Error("할 일 목록을 가져오는데 실패하였습니다.");
    }
  };
}

export default ToDoAPI;
