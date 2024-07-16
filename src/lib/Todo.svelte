<script lang="ts">
  import type { TodoType } from "./crud";
  import { deleteTodo, toggleTodo } from "./crud";
  export let todo: TodoType;
  let todoRef: HTMLElement;
</script>

<ul
  bind:this={todoRef}
  class="list-group list-group-horizontal rounded-0 bg-transparent"
>
  <li
    class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
  >
    <div class="form-check">
      <input
        class="form-check-input me-0"
        type="checkbox"
        value=""
        id="flexCheckChecked1"
        aria-label="..."
        bind:checked={todo.is_done}
        on:click={() => toggleTodo(todo)}
      />
    </div>
  </li>
  <li
    class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
  >
    <p class="lead fw-normal mb-0">{todo.name}</p>
  </li>
  <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
    <div class="d-flex flex-row justify-content-end mb-1">
      <a href="#!" class="text-info" data-mdb-tooltip-init title="Edit todo"
        ><i class="fas fa-pencil-alt me-3"></i></a
      >
      <a
        href="#!"
        class="text-danger"
        data-mdb-tooltip-init
        title="Delete todo"
        on:click={() => {
          deleteTodo(todo.id);
          if (todoRef.parentNode !== null) {
            todoRef.parentNode.removeChild(todoRef);
          }
        }}><i class="fas fa-trash-alt"></i></a
      >
    </div>
    <div class="text-end text-muted">
      <a
        href="#!"
        class="text-muted"
        data-mdb-tooltip-init
        title="Created date"
      >
        <p class="small mb-0">
          <i class="fas fa-info-circle me-2"></i>{new Date(
            todo.created_at
          ).toLocaleDateString("en-UK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </p>
      </a>
    </div>
  </li>
</ul>

<style>
</style>
