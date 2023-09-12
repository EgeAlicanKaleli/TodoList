// Tüm elementleri seçme
// const form = document.getElementById("todo-form");
// const todoInput = document.getElementById("todo");
// const todoList = document.getElementsByClassName("list-group");
// const cardBody1 = document.querySelectorAll(".card-body")[0];
// const cardBody2 = document.querySelectorAll(".card-body")[1];
// const filterInput = document.getElementById("filter");
// const clearTodos = document.getElementById("clear-todos");
const form = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo");

const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];

const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");

const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  // Tüm Event Listenerler
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function getTodosFromStorage() {
  // Storage'den Todoları Alma
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  let todos = getTodosFromStorage();
  const text = todos.map((element) => {
    return element.toLowerCase();
  });
  const controllerTodo = newTodo.toLowerCase();

  if (newTodo === "") {
    showAlert1("danger", "Lütfen bir todo giriniz.");
  } else if (text.indexOf(controllerTodo) === -1) {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert1("success", "Todo eklendi.");
  } else {
    showAlert1("danger", "Girdiğiniz todo mevcut. Başka bir todo giriniz.");
  }

  e.preventDefault();
}

function addTodoToUI(newTodo) {
  // String değerini list item olarak UI'ya ekleyecek.
  // List Item Oluşturma
  const listItem = document.createElement("li");
  // Link Oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";
  //Text Node Ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todoList.appendChild(listItem);
  todoInput.value = "";
}

function showAlert1(type, message) {
  // Div Oluşturma
  const alertItem = document.createElement("div");
  alertItem.className = `alert alert-${type}`;
  alertItem.textContent = message;
  alertItem.role = "alert";
  firstCardBody.appendChild(alertItem);
  // setTimeout
  setTimeout(function () {
    alertItem.remove();
  }, 3000);
}

function showAlert2(type, message) {
  // Div Oluşturma
  const alertItem = document.createElement("div");
  alertItem.className = `alert alert-${type}`;
  alertItem.textContent = message;
  alertItem.role = "alert";
  secondCardBody.appendChild(alertItem);
  // setTimeout
  setTimeout(function () {
    alertItem.remove();
  }, 3000);
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert2("success", "Todo Başarıyla Silindi");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Array'dan değeri silme
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      // Bulamadı
      listItem.setAttribute("style", "display :  none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}

function clearAllTodos() {
  // Arayüzden todoları temizleme
  if (confirm("Tümünü silmek istediğinizine emin misiniz?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
