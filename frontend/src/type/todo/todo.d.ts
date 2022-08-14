export type todoType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type getToDosType = {
  data: todoType[];
};

export type createToDoType = {
  data: todoType;
};

export type addToDoType = {
  title: string;
  content: string;
};
