import wantedAPI from "../wantedBaseAPI";

import {
  getToDosType,
  todoType,
  createToDoType,
} from "../../../type/todo/todo";

interface IToDoAPI {
  getUserToDoS: () => Promise<todoType[] | undefined>;
  createToDo: (title: string, content: string) => Promise<todoType | undefined>;
  deleteToDo: (id: string) => Promise<string | undefined>;
}
class ToDoAPI implements IToDoAPI {
  private token;
  constructor(token: string | null) {
    this.token = token;
  }

  getUserToDoS = async () => {
    try {
      if (this.token) {
        const { data } = await wantedAPI.get<getToDosType>("/todos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        });
        return data.data;
      }
    } catch {
      new Error("할 일 목록을 가져오는데 실패하였습니다.");
    }
  };

  createToDo = async (title: string, content: string) => {
    try {
      if (this.token) {
        const { data } = await wantedAPI.post<createToDoType>(
          "/todos",
          {
            title,
            content,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token,
            },
          }
        );
        return data.data;
      }
    } catch {
      new Error("할 일 목록을 가져오는데 실패하였습니다.");
    }
  };

  deleteToDo = async (id: string) => {
    try {
      if (this.token) {
        await wantedAPI.delete(`/todos/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        });
        return id;
      }
    } catch {
      new Error("할 일 목록을 가져오는데 실패하였습니다.");
    }
  };
}

export default ToDoAPI;
