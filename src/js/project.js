class Project{
    constructor(title){
        this.title = title;
        this.todoList = [];
    }

    addTodo(todo){
        this.todoList.push(todo);
    }

    editTodo(index, todo){
        this.todoList[index] = todo;
    }

    removeTodo(index){
        if(index != -1){
            this.todoList.splice(index, 1);
        }
    }
}

export default Project;