import trash from "../images/trash.svg"
import starFilled from "../images/star-filled.svg"
import star from "../images/star.svg"

class DOM{
    constructor(){
        
    }

    initialize(projectList){
        this.loadHome(projectList);
        this.loadProjects(projectList);
    }

    loadHome(projectList){
        let home = document.createElement("div");
        home.classList.add("home");

        let heading = document.createElement("h1");
        heading.textContent = "Home";
        home.appendChild(heading)

        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        for(let i = 0; i < projectList.length; i++){
            for(let j = 0; j < projectList[i].todoList.length; j++){
                todoContainer.appendChild(this.loadTodo(projectList[i].todoList[j]));
            }
        }
        home.appendChild(todoContainer);

        document.querySelector("#content").appendChild(home);
    }

    loadProjects(projectList){
        let projectContainer = document.querySelector(".project-container");
        for(let i = 1; i < projectList.length; i++){
            let div = document.createElement("div");
            div.classList.add("project");

            let title = document.createElement("span");
            title.textContent = projectList[i].title;

            let img = document.createElement("img");
            img.src = trash;

            div.appendChild(title);
            div.appendChild(img);

            projectContainer.appendChild(div);
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
        console.log(todo);
        console.log(todo.checked);
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

    clearContent(){
        document.querySelector("#content").innerHTML = "";
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