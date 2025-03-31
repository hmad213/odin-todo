import trash from "../images/trash.svg"
import starFilled from "../images/star-filled.svg"
import star from "../images/star.svg"
import Project from "../js/project.js"

class DOM{
    constructor(projectList){
        this.loadedPage = "home";
        document.querySelector(".home-button").addEventListener("click", () => {
            this.loadHome(projectList);
        })
        
        document.querySelector(".important-button").addEventListener("click", () => {
            this.loadImportant(projectList);
        })
        
        document.querySelector(".add-project").addEventListener("click", () => {
            this.loadAddProjectDialog(projectList);
        })

        this.initialize(projectList);
    }

    initialize(projectList){
        this.reloadPage(projectList);
        this.loadProjects(projectList);
    }

    reloadPage(projectList){
        if(this.loadedPage == "home"){
            this.loadHome(projectList);
        }
        else if(this.loadedPage == "important"){
            this.loadImportant(projectList);
        }
        else{
            this.loadProjectPage(projectList, this.loadedPage);
        }
    }

    loadHome(projectList){
        this.loadedPage = "home";
        let heading = document.querySelector("#content > h1");
        heading.textContent = "Home";

        this.clearTodoContainer();
        let todoContainer = document.querySelector(".todo-container");

        for(let i = 0; i < projectList.length; i++){
            for(let j = 0; j < projectList[i].todoList.length; j++){
                todoContainer.appendChild(this.loadTodo(projectList[i].todoList[j]));
            }
        }
        this.addListeners(projectList);
    }

    loadImportant(projectList){
        this.loadedPage = "important"
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
        this.addListeners(projectList);
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
                        this.loadProjectPage(projectList, i+1);
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
        }else{
            title.style.textDecoration = "none";
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.checked;

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(title);

        let starImg = document.createElement("img")
        starImg.classList.add("star-button");
        if(todo.priority){
            starImg.src = starFilled;
        }else{
            starImg.src = star;
        }
        todoDiv.appendChild(starImg);
        
        let trashImg = document.createElement("img");
        trashImg.classList.add("trash-button");
        trashImg.src = trash;
        todoDiv.appendChild(trashImg)
        
        return todoDiv;
    }

    loadProjectPage(projectList, index){
        this.loadedPage = `${index}`
        let heading = document.querySelector("#content > h1");
        heading.textContent = projectList[index].title;

        this.clearTodoContainer();
        let todoContainer = document.querySelector(".todo-container");

        for(let i = 0; i < projectList[index].todoList.length; i++){
            todoContainer.appendChild(this.loadTodo(projectList[index].todoList[i]));
        }
        this.addListeners(projectList);
    }

    loadAddProjectDialog(projectList){
        let dialog = document.querySelector("dialog");
        this.clearDialog();
        dialog.showModal();
        dialog.classList.remove("hidden");

        dialog.appendChild(this.loadDialogTitle("New Project"));

        let form = document.createElement("form");
        form.appendChild(this.loadInputDiv("Title"));

        let button = document.createElement("button");
        button.classList.add("create-button");
        button.textContent = "Create";
        form.appendChild(button);

        form.addEventListener("submit", (target) => {
            target.preventDefault();
            let dialog = document.querySelector("dialog");
            dialog.close();
            dialog.classList.add("hidden");
            projectList.push(new Project(document.querySelector("dialog #title").value))
            this.loadProjects(projectList);
        })

        dialog.appendChild(form)
    }

    loadInputDiv(t){
        let inputDiv = document.createElement("div");

        let label = document.createElement("label");
        label.textContent = t;
        label.htmlFor = t.toLowerCase();
        
        let input = document.createElement("input");
        input.id = t.toLowerCase();
        input.type = "text";
        input.required = true;

        inputDiv.appendChild(label);
        inputDiv.appendChild(input);

        return inputDiv;
    }

    loadDialogTitle(t){
        let titleDiv = document.createElement("div");
        titleDiv.classList.add(".title");

        let title = document.createElement("h2");
        title.textContent = t;

        titleDiv.appendChild(title);
        titleDiv.appendChild(document.createElement("hr"));
        return titleDiv;
    }

    addProjectRemoveListener(projectList){
        document.querySelectorAll(".project .trash-button").forEach((event) => event.addEventListener("click", (target) => {
            let projects = document.querySelectorAll(".project");
            for(let i = 0; i < projects.length; i++){
                if(target.target.parentNode == projects[i]){
                    if(this.loadedPage == i+1){
                        this.loadedPage = "home";
                    }
                    else if(this.loadedPage > i+1){
                        this.loadedPage--;
                    }
                    projectList.splice(i+1, 1);
                }
            }
            this.initialize(projectList);
        }))
    }

    addTodoStarListener(projectList){
        document.querySelectorAll("#content .star-button").forEach((e) => e.addEventListener("click", (target) => {
            let todos = document.querySelectorAll("#content .todo");
            if(this.loadedPage == "home"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if (target.target.parentNode == todos[index]){
                            projectList[i].todoList[j].togglePriority();
                        }
                        index++;
                    }
                }
            }
            else if(this.loadedPage == "important"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if(projectList[i].todoList[j].priority){
                            if (target.target.parentNode == todos[index]){
                                projectList[i].todoList[j].togglePriority();
                            }
                            index++;
                        }
                    }
                }
            }
            else{
                let index = this.loadedPage;
                for(let i = 0; i < projectList[index].todoList.length; i++){
                    if (target.target.parentNode == todos[i]){
                        projectList[index].todoList[i].togglePriority();
                    }
                }
            }
            this.initialize(projectList);
        }))
    }

    addTodoRemoveListener(projectList){
        document.querySelectorAll("#content .trash-button").forEach((e) => e.addEventListener("click", (target) => {
            let todos = document.querySelectorAll("#content .todo");
            if(this.loadedPage == "home"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if (target.target.parentNode == todos[index]){
                            projectList[i].removeTodo(j);
                        }
                        index++;
                    }
                }
            }
            else if(this.loadedPage == "important"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if(projectList[i].todoList[j].priority){
                            if (target.target.parentNode == todos[index]){
                                projectList[i].removeTodo(j);
                            }
                            index++;
                        }
                    }
                }
            }
            else{
                let index = this.loadedPage;
                for(let i = 0; i < projectList[index].todoList.length; i++){
                    if (target.target.parentNode == todos[i]){
                        projectList[index].removeTodo(i);
                    }
                }
            }
            this.initialize(projectList);
        }))
    }

    addTodoCheckedListener(projectList){
        document.querySelectorAll("#content .todo input").forEach((e) => e.addEventListener("click", (target) => {
            let todos = document.querySelectorAll("#content .todo");
            if(this.loadedPage == "home"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if (target.target.parentNode == todos[index]){
                            projectList[i].todoList[j].toggleChecked();
                        }
                        index++;
                    }
                }
            }
            else if(this.loadedPage == "important"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if(projectList[i].todoList[j].priority){
                            if (target.target.parentNode == todos[index]){
                                projectList[i].todoList[j].toggleChecked();
                            }
                            index++;
                        }
                    }
                }
            }
            else{
                let index = this.loadedPage;
                for(let i = 0; i < projectList[index].todoList.length; i++){
                    if (target.target.parentNode == todos[i]){
                        projectList[index].todoList[i].toggleChecked();
                    }
                }
            }
            this.initialize(projectList);
        }))
    }

    addListeners(projectList){
        this.addTodoStarListener(projectList);
        this.addTodoRemoveListener(projectList);
        this.addTodoCheckedListener(projectList);
    }

    clearDialog(){
        document.querySelector("dialog").innerHTML = "";
    }

    clearTodoContainer(){
        document.querySelector(".todo-container").innerHTML = "";
    }

    clearProjects(){
        document.querySelector(".project-container").innerHTML = "";
    }

    addProject(){
        return;
    }
}

export default DOM;