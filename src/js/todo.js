class Todo{
    constructor(title, description, dueDate, priority, checked){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    editTodo(title, description, dueDate, priority, checked){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    togglePriority(){
        this.priority = !this.priority;
    }

    toggleChecked(){
        this.checked = !this.checked;
    }
}

export default Todo;