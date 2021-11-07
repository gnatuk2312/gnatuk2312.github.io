//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//Filter
filterOption.addEventListener('click', filterTodo);
//LocalStarage
document.addEventListener('DOMContentLoaded', getTodos);

//Functions
//ADD TODO
function addTodo(event) {
	//Без цьої команди при натисканні на кнопку буде перезагружатись сайт
	event.preventDefault();
	//.Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//Check BUTTON
	const completeButton = document.createElement('button');
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add('complete-btn');
	todoDiv.appendChild(completeButton);
	//Trash BUTTON
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	//Append to LIST
	todoList.appendChild(todoDiv);
	//Add Todo To LOCALSTORAGE
	saveLocalTodos(todoInput.value);
	//Clear Todo Input VALUE
	todoInput.value = "";
}
// DELETE and CHECK Todo
function deleteCheck(e) {
	const item = e.target;
	//DELETE todo
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		//Animation
		todo.classList.add('fall');
		//Delete LOCAL STORAGE
		removeLocalTodos(todo);
		//Запускає функцію коли закінчується дія Transition на цей об'єкт в CSS
		todo.addEventListener('transitionend', function () {
			todo.remove();
		})
	};
	//CHECK MARK
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
};
// FILTER my Todo
function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}







//                 L O C A L   S T O R A G E
// LOCALSTORAGE
function saveLocalTodos(todo) {
	//CHECK Do I already have anything there?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));

}
// LOCALSTORAGE
function getTodos() {
	//CHECK Do I already have anything there?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		//.Todo DIV
		const todoDiv = document.createElement('div');
		todoDiv.classList.add("todo");
		//Create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//Check BUTTON
		const completeButton = document.createElement('button');
		completeButton.innerHTML = '<i class="fas fa-check"></i>';
		completeButton.classList.add('complete-btn');
		todoDiv.appendChild(completeButton);
		//Trash BUTTON
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add('trash-btn');
		todoDiv.appendChild(trashButton);
		//Append to LIST
		todoList.appendChild(todoDiv);
	});
}
//LOCAL STORAGE
function removeLocalTodos(todo) {
	//CHECK Do I already have anything there?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));

}