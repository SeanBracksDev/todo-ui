export interface TodoType {
  id: number;
  name: string;
  is_done: boolean;
  created_at: Date;
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

export async function postTodo() {
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  let todo_name = (document.querySelector("input") as HTMLInputElement).value;

  if (!todo_name) {
    return;
  }

  let todo = {
    name: todo_name,
  };

  const request: RequestInfo = new Request(`${todoApiUrl}/todos/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(todo),
  });

  return fetch(request).then(async (res) => {
    const created_todo = (await res.json()) as TodoType;
    todos = [...todos, created_todo];
  });
}
