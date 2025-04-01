import trash from "../images/trash.svg"
import starFilled from "../images/star-filled.svg"
import star from "../images/star.svg"
import Project from "./project.js"
import Todo from "./todo.js"
import storage from "./storage.js"
import { format } from "date-fns";

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

        document.querySelector(".add-todo").addEventListener("click", () => {
            this.loadAddTodoDialog(projectList);
        })

        this.initialize(projectList);
    }

    initialize(projectList){
        this.reloadPage(projectList);
        this.loadProjects(projectList);
    }

    reloadPage(projectList){
        storage.storeData(projectList);
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
                todoContainer.appendChild(this.loadTodo(projectList, projectList[i], j));
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
                    todoContainer.appendChild(this.loadTodo(projectList, projectList[i], j));
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
                    if(event.target === projects[i] || event.target === projects[i].querySelector("span")){
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

    loadTodo(projectList, project, index){
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")

        let title = document.createElement("span");
        title.textContent = project.todoList[index].title;
        if(project.todoList[index].checked){
            title.style.textDecoration = "line-through";
        }else{
            title.style.textDecoration = "none";
        }

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = project.todoList[index].checked;

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(title);

        let starImg = document.createElement("img")
        starImg.classList.add("star-button");
        if(project.todoList[index].priority){
            starImg.src = starFilled;
        }else{
            starImg.src = star;
        }
        todoDiv.appendChild(starImg);
        
        let trashImg = document.createElement("img");
        trashImg.classList.add("trash-button");
        trashImg.src = trash;
        todoDiv.appendChild(trashImg);
        
        todoDiv.addEventListener("click", (event) => {
            if(event.target != starImg && event.target != trashImg && event.target != checkbox){
                this.loadTodoDetailsDialog(projectList, project, index)
            }
        })

        return todoDiv;
    }

    loadProjectPage(projectList, index){
        this.loadedPage = `${index}`
        let heading = document.querySelector("#content > h1");
        heading.textContent = projectList[index].title;

        this.clearTodoContainer();
        let todoContainer = document.querySelector(".todo-container");

        for(let i = 0; i < projectList[index].todoList.length; i++){
            todoContainer.appendChild(this.loadTodo(projectList, projectList[index], i));
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
        form.appendChild(this.loadInputDiv("Title", "text", true));

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttons");

        let createButton = document.createElement("button");
        createButton.classList.add("form-button");
        createButton.textContent = "Create";
        buttonDiv.appendChild(createButton);

        form.appendChild(buttonDiv);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let dialog = document.querySelector("dialog");
            dialog.close();
            dialog.classList.add("hidden");
            projectList.push(new Project(document.querySelector("dialog #title").value))
            this.initialize(projectList);
        })

        dialog.appendChild(form)

        let closeButton = document.createElement("button");
        closeButton.textContent = "x";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
            dialog.close();
            dialog.classList.add("hidden");
        })
        dialog.appendChild(closeButton);
    }

    loadAddTodoDialog(projectList){
        this.loadTodoDialog(projectList, "New Todo");
        let form = document.querySelector("dialog form");

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttons");

        let starImg = document.createElement("img");
        starImg.src = star;
        starImg.addEventListener("click", (event) => {
            if(event.target.src == star){
                event.target.src = starFilled;
            }
            else{
                event.target.src = star;
            }
        })

        let createButton = document.createElement("button");
        createButton.classList.add("form-button");
        createButton.textContent = "Create";

        buttonDiv.appendChild(starImg);
        buttonDiv.appendChild(createButton);
        form.appendChild(buttonDiv);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let dialog = document.querySelector("dialog");
            dialog.close();
            dialog.classList.add("hidden");
            let title = event.target.querySelector("#title").value;
            let description = event.target.querySelector("#description").value;
            let date = event.target.querySelector("#date").value;
            let priority;
            if(event.target.querySelector(".buttons img").src == star){
                priority = false;
            }else{
                priority = true;
            }

            let project = event.target.querySelector("#project-select").value;
            console.log(projectList[project])
            projectList[project].addTodo(new Todo(title, description, date, priority, false));
            this.reloadPage(projectList)
        })
    }

    loadTodoDetailsDialog(projectList, project, index){
        this.loadTodoDialog(projectList, "Todo Details");
        let form = document.querySelector("dialog form");

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttons");

        let starImg = document.createElement("img");
        if(project.todoList[index].priority){
            starImg.src = starFilled
        }else{
            starImg.src = star;
        }

        let button = document.createElement("button");
        button.classList.add("form-button");
        button.classList.add("edit-button");
        button.textContent = "Edit";

        buttonDiv.appendChild(starImg);
        buttonDiv.appendChild(button);
        form.appendChild(buttonDiv);

        let inputs = document.querySelectorAll("dialog form .input-div");
        inputs.forEach((e) => {
            e.lastChild.disabled = true;
        })
        inputs[0].lastChild.value = project.todoList[index].title;
        inputs[1].lastChild.value = project.todoList[index].description;
        inputs[2].lastChild.value = format(project.todoList[index].dueDate, "yyyy-MM-dd");
        console.log(project.title.replace(/\s+/g, "-"))
        inputs[3].lastChild.querySelector(`#${project.title.replace(/\s+/g, "-")}`).selected = true;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.enableTodoEdit(projectList, project, index);
        })
    }

    enableTodoEdit(projectList, project, index){
        let inputs = document.querySelectorAll("dialog form .input-div");
        inputs.forEach((e) => {
            e.lastChild.disabled = false;
        })

        document.querySelector("dialog form .buttons img").addEventListener("click", (event) => {
            if(event.target.src == star){
                event.target.src = starFilled;
            }
            else{
                event.target.src = star;
            }
        })

        let button = document.querySelector(".buttons button");
        button.textContent = "Save Changes";
        button.classList.remove("edit-button");

        document.querySelector("dialog form").removeEventListener("submit", (event) => {
            event.preventDefault();
            this.enableTodoEdit(projectList, project, index);
        })

        document.querySelector("dialog form").addEventListener("submit", (event) => {
            event.preventDefault();
            let dialog = document.querySelector("dialog");
            dialog.close();
            dialog.classList.add("hidden");
            let title = event.target.querySelector("#title").value;
            let description = event.target.querySelector("#description").value;
            let date = event.target.querySelector("#date").value;
            let priority;
            if(event.target.querySelector(".buttons img").src == star){
                priority = false;
            }else{
                priority = true;
            }

            let projectSelect = event.target.querySelector("#project-select").value;
            if(projectList[projectSelect] == project){
                project.editTodo(index, title, description, date, priority, project.todoList[index].checked);
            }
            else{
                projectList[projectSelect].addTodo(new Todo(title, description, date, priority, project.todoList[index].checked));
                project.removeTodo(index);
            }
            this.reloadPage(projectList);
        })
    }

    loadTodoDialog(projectList, title){
        let dialog = document.querySelector("dialog");
        this.clearDialog();
        dialog.showModal();
        dialog.classList.remove("hidden");

        dialog.appendChild(this.loadDialogTitle(title));
        let form = document.createElement("form");
        form.appendChild(this.loadInputDiv("Title", "text", true));
        form.appendChild(this.loadInputDiv("Description", "textarea", false));
        form.appendChild(this.loadInputDiv("Date", "date", true));
        
        let selectDiv = document.createElement("div");
        selectDiv.classList.add("input-div");

        let label = document.createElement("label");
        label.textContent = "Project";
        label.htmlFor = "project-select";

        let projectSelect = document.createElement("select");
        projectSelect.id = "project-select";
        for(let i = 0; i < projectList.length; i++){
            let option = document.createElement("option");
            option.value = `${i}`
            option.id = projectList[i].title.replace(/\s+/g, "-")
            option.textContent = projectList[i].title
            projectSelect.appendChild(option);
        }

        selectDiv.appendChild(label);
        selectDiv.appendChild(projectSelect);
        form.appendChild(selectDiv);

        dialog.appendChild(form);

        let closeButton = document.createElement("button");
        closeButton.textContent = "x";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
            dialog.close();
            dialog.classList.add("hidden");
        })
        dialog.appendChild(closeButton);
    }


    loadInputDiv(name, type, required){
        let inputDiv = document.createElement("div");
        inputDiv.classList.add("input-div");

        let label = document.createElement("label");
        label.textContent = name;
        label.htmlFor = name.toLowerCase();
        
        let input;
        if(type == "textarea"){
            input = document.createElement("textarea");
        }
        else{
            input = document.createElement("input");
            input.type = type;
        }
        input.id = name.toLowerCase();
        input.required = required;

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
        document.querySelectorAll(".project .trash-button").forEach((event) => event.addEventListener("click", (event) => {
            let projects = document.querySelectorAll(".project");
            for(let i = 0; i < projects.length; i++){
                if(event.target.parentNode == projects[i]){
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
        document.querySelectorAll("#content .star-button").forEach((e) => e.addEventListener("click", (event) => {
            let todos = document.querySelectorAll("#content .todo");
            if(this.loadedPage == "home"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if (event.target.parentNode == todos[index]){
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
                            if (event.target.parentNode == todos[index]){
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
                    if (event.target.parentNode == todos[i]){
                        projectList[index].todoList[i].togglePriority();
                    }
                }
            }
            this.initialize(projectList);
        }))
    }

    addTodoRemoveListener(projectList){
        document.querySelectorAll("#content .trash-button").forEach((e) => e.addEventListener("click", (event) => {
            let todos = document.querySelectorAll("#content .todo");
            if(this.loadedPage == "home"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if (event.target.parentNode == todos[index]){
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
                            if (event.target.parentNode == todos[index]){
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
                    if (event.target.parentNode == todos[i]){
                        projectList[index].removeTodo(i);
                    }
                }
            }
            this.initialize(projectList);
        }))
    }

    addTodoCheckedListener(projectList){
        document.querySelectorAll("#content .todo input").forEach((e) => e.addEventListener("click", (event) => {
            let todos = document.querySelectorAll("#content .todo");
            if(this.loadedPage == "home"){
                let index = 0;
                for(let i = 0; i < projectList.length; i++){
                    for(let j = 0; j < projectList[i].todoList.length; j++){
                        if (event.target.parentNode == todos[index]){
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
                            if (event.target.parentNode == todos[index]){
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
                    if (event.target.parentNode == todos[i]){
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
}

export default DOM;