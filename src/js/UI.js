import trash from "../images/trash.svg"
import starFilled from "../images/star-filled.svg"
import star from "../images/star.svg"

class DOM{
    initialize(projectList){
        this.loadHome(projectList);
        this.loadProjects(projectList);
    }

    loadHome(projectList){
        let heading = document.querySelector("#content > h1");
        heading.textContent = "Home";

        this.clearTodoContainer();
        let todoContainer = document.querySelector(".todo-container");

        for(let i = 0; i < projectList.length; i++){
            for(let j = 0; j < projectList[i].todoList.length; j++){
                todoContainer.appendChild(this.loadTodo(projectList[i].todoList[j]));
            }
        }
    }

    loadImportant(projectList){
        let heading = document.querySelector("#content > h1");
        heading.textContent = "Important";

        this.clearTodoContainer();
        let todoContainer = document.querySelector(".todo-container");

        for(let i = 0; i < projectList.length; i++){
            for(let j = 0; j < projectList[i].todoList.length; j++){
                if(projectList[i].todoList[j].priority){
                    todoContainer.appendChild(this.loadTodo(projectList[i].todoList[j]));
                }
            }
        }
    }

    loadProjects(projectList){
        this.clearProjects();
        let projectContainer = document.querySelector(".project-container");
        for(let i = 1; i < projectList.length; i++){
            let div = document.createElement("div");
            div.classList.add("project");

            let title = document.createElement("span");
            title.textContent = projectList[i].title;

            let img = document.createElement("img");
            img.src = trash;
            img.classList.add("trash-button");

            div.appendChild(title);
            div.appendChild(img);

            div.addEventListener("click", (event) => {
                let projects = document.querySelectorAll(".project");
                for(let i = 0; i < projects.length; i++){
                    if(event.target === projects[i]){
                        this.loadProjectPage(projectList[i+1]);
                    }
                }
            })
            projectContainer.appendChild(div);
        }
        if(projectList.length !== 0){
            this.addProjectRemoveListener(projectList);
        }
    }

    loadTodo(todo){
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")

        let title = document.createElement("span");
        title.textContent = todo.title;
        if(todo.checked){
            title.style.textDecoration = "line-through";
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.checked;

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(title);

        let starImg = document.createElement("img")
        if(todo.priority){
            starImg.src = starFilled;
        }else{
            starImg.src = star;
        }
        todoDiv.appendChild(starImg);
        
        let trashImg = document.createElement("img");
        trashImg.src = trash;
        todoDiv.appendChild(trashImg)
        
        return todoDiv;
    }

    loadProjectPage(project){
        let heading = document.querySelector("#content > h1");
        heading.textContent = project.title;

        this.clearTodoContainer();
        let todoContainer = document.querySelector(".todo-container");

        for(let i = 0; i < project.todoList.length; i++){
            todoContainer.appendChild(this.loadTodo(project.todoList[i]));
        }
    }

    addProjectRemoveListener(projectList){
        document.querySelectorAll(".project .trash-button").forEach((event) => event.addEventListener("click", (target) => {
            let projects = document.querySelectorAll(".project");
            for(let i = 0; i < projects.length; i++){
                if(target.target.parentNode == projects[i]){
                    projectList.splice(i+1, 1);
                }
            }
            this.initialize(projectList);
        }))
    }

    clearTodoContainer(){
        document.querySelector(".todo-container").innerHTML = ""
    }

    clearProjects(){
        document.querySelector(".project-container").innerHTML = "";
    }

    addProject(){
        return;
    }
}

let d = new DOM;

export default d;