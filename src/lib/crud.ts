export interface TodoType {
  id: number;
  name: string;
  is_done: boolean;
  created_at: string;
}

export const todoApiUrl = "http://127.0.0.1:8000";

export async function getTodos(): Promise<TodoType[]> {
  const res = await fetch(`${todoApiUrl}/todos/`).catch((err) => {
    throw new Error(err);
  });
  const todos = await res.json().catch((err) => {
    throw new Error(err);
  });
  return todos as TodoType[];
}

export async function postTodo(todos: TodoType[]): Promise<TodoType[]> {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  let todo_name = (document.querySelector("input") as HTMLInputElement).value;

  if (!todo_name) {
    return todos;
  }

  let todo = {
    name: todo_name,
  };

  const request: RequestInfo = new Request(`${todoApiUrl}/todos/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(todo),
  });

  fetch(request).then(async (res) => {
    const created_todo = (await res.json()) as TodoType;
    todos = [...todos, created_todo];
  });
  return todos;
}

export async function deleteTodo(id: number) {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const request: RequestInfo = new Request(`${todoApiUrl}/todos/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  fetch(request);
}

export async function toggleTodo(todo: TodoType) {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const request: RequestInfo = new Request(`${todoApiUrl}/todos/${todo.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ is_done: !todo.is_done }),
  });

  fetch(request);
}
