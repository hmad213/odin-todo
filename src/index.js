import "./styles.css"
import Project from "./js/project"
import Todo from "./js/todo"
import DOM from "./js/UI"


const projectList = [];
projectList.push(new Project("None"));
projectList.push(new Project("hey"));

projectList[0].addTodo(new Todo("Hello", "abc", 0, true, true))
projectList[0].addTodo(new Todo("how", "abc", 0, true, false))
projectList[0].addTodo(new Todo("you", "abc", 0, false, true))
projectList[0].addTodo(new Todo("doing", "abc", 0, false, false))

DOM.initialize(projectList);

document.querySelector(".home-button").addEventListener("click", () => {
    DOM.loadHome(projectList);
})

document.querySelector(".important-button").addEventListener("click", () => {
    DOM.loadImportant(projectList);
})

export default projectList;