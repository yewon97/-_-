class ToDo {
  constructor() {
    this.toDos = [];
    this.toDoForm = document.getElementById("todo-form");
    this.toDoList = document.getElementById("todo-list");
    this.toDoInput = this.toDoForm.querySelector("input");

    this.toDoForm.addEventListener("submit", (e) => this.handleToDoSubmit(e));
    this.loadToDo();
  }

  handleToDoSubmit(e) {
    e.preventDefault();

    const newTodo = this.toDoInput.value;
    const newTodoId = Date.now();
    this.emptyInput();
    this.saveToDos(newTodo, newTodoId);
    this.paintToDoList();
  }

  emptyInput() {
    this.toDoInput.value = "";
  }

  deleteToDoItem(liId) {
    this.toDos = this.toDos.filter((todo) => todo.id !== Number(liId));
    this.saveToDos();
    this.paintToDoList();
  }

  paintToDoList() {
    this.toDoList.innerHTML = "";
    this.toDos.forEach((todo) => {
      const li = document.createElement("li");
      li.id = todo.id;
      const span = document.createElement("span");
      span.innerText = todo.text;
      li.appendChild(span);
      const button = document.createElement("button");
      button.innerText = "❌";
      button.addEventListener("click", () => this.deleteToDoItem(todo.id));
      li.appendChild(button);
      this.toDoList.appendChild(li);
    });
  }

  saveToDos() {
    localStorage.setItem("todos", JSON.stringify(this.toDos));
  }

  loadToDo() {
    const savedToDos = localStorage.getItem("todos");
    if (savedToDos) {
      const parsedToDos = JSON.parse(savedToDos);
      this.toDos = parsedToDos;
      this.paintToDoList();
    }
  }
}

export default class ToDoFactory {
  static create() {
    const todo = new ToDo();
    return todo;
  }
}
