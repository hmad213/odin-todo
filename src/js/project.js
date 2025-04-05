class Project {
  constructor(title) {
    this.title = title;
    this.todoList = [];
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  editTodo(index, title, description, dueDate, priority, checked) {
    this.todoList[index].editTodo(
      title,
      description,
      dueDate,
      priority,
      checked,
    );
  }

  removeTodo(index) {
    if (index != -1) {
      this.todoList.splice(index, 1);
    }
  }
}

export default Project;
