class ToDo {
	constructor(toDoForm, toDoList, toDoInput) {
		this.toDoForm = toDoForm;
		this.toDoList = toDoList;
		this.toDoInput = toDoInput;

		this.toDos = JSON.parse(localStorage.getItem("todos")) ?? [];
	}

	init() {
		this.toDoForm.addEventListener("submit", this.handleToDoSubmit.bind(this));
		this.loadToDo();
	}

	handleToDoSubmit(e) {
		e.preventDefault();

		const newTodo = this.toDoInput.value;
		const newTodoId = Date.now();
		this.emptyInput();
		this.saveToDos(newTodo, newTodoId);
		this.paintToDo(newTodo, newTodoId);
	}

	emptyInput() {
		this.toDoInput.value = '';
	}

	deleteToDo(e) {
		const li = e.target.parentElement;
		const liId = li.id;
		li.remove();
		this.deleteToDos(liId);
	}

	paintToDo(newTodo, newTodoId) {
		const li = document.createElement("li");
		li.id = newTodoId;
		const span = document.createElement("span");
		span.innerHTML = newTodo;
		li.appendChild(span);
		const button = document.createElement("button");
		button.addEventListener("click", () => this.deleteToDo(event));
		button.innerText = "❌";
		li.appendChild(button);

		this.toDoList.appendChild(li);
	}

	saveToDos(newTodo, newTodoId) {
		const newTodoObj = {
			id: newTodoId,
			text: newTodo
		};
		this.toDos.push(newTodoObj);
		localStorage.setItem("todos", JSON.stringify(this.toDos));
	}

	deleteToDos(liId) {
		const newTodoObj = this.toDos.filter(function(todo) {
			return todo.id !== Number(liId)
		})
		this.toDos = [...newTodoObj];
		localStorage.setItem("todos", JSON.stringify(newTodoObj));
	}
	
	loadToDo() {
		const savedToDos = localStorage.getItem("todos");
		if(savedToDos) {
			const parsedToDos = JSON.parse(savedToDos);
			parsedToDos.forEach((todo) => this.paintToDo(todo.text, todo.id));
		}
	}
}

export default class ToDoFactory {
  static create() {
    const toDoForm = document.getElementById("todo-form");
		const toDoList = document.getElementById("todo-list");
		const toDoInput = toDoForm.querySelector("input");
    return new ToDo(toDoForm, toDoList, toDoInput);
  }
}
