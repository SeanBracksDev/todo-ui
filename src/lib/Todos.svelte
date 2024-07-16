<script lang="ts">
  import { onMount } from "svelte";
  import Todo from "./Todo.svelte";
  import type { TodoType } from "./crud";
  import { getTodos, postTodo, todoApiUrl } from "./crud";

  let todos: TodoType[];
  $: todos = [];

  onMount(async () => getTodos().then((data) => (todos = data)));

  function createTodo() {
    console.log("Creating todo...");
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
</script>

<section class="vh-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div
          class="card"
          id="list1"
          style="border-radius: .75rem; background-color: #eff1f2;"
        >
          <div class="card-body py-4 px-4 px-md-5">
            <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
              <i class="fas fa-check-square me-1"></i>
              <u>Todos</u>
            </p>

            <div class="pb-2">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-row align-items-center">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="exampleFormControlInput1"
                      placeholder="Add new..."
                    />
                    <div>
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-primary"
                        on:click={createTodo}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr class="my-4" />

            <div
              class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3"
            >
              <p class="small mb-0 me-2 text-muted">Filter</p>
              <select data-mdb-select-init>
                <option value="1">All</option>
                <option value="2">Completed</option>
                <option value="3">Active</option>
                <option value="4">Has due date</option>
              </select>
              <p class="small mb-0 ms-4 me-2 text-muted">Sort</p>
              <select data-mdb-select-init>
                <option value="1">Added date</option>
                <option value="2">Due date</option>
              </select>
              <a
                href="#!"
                style="color: #23af89;"
                data-mdb-tooltip-init
                title="Ascending"
                ><i class="fas fa-sort-amount-down-alt ms-2"></i></a
              >
            </div>
            {#each todos as todo (todo.id)}
              <!-- TODO implement deleting & completing todos -->
              <Todo {todo} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #list1 .form-control {
    border-color: transparent;
  }
  #list1 .form-control:focus {
    border-color: transparent;
    box-shadow: none;
  }
</style>
