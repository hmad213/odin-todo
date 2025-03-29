import "./styles.css"
import Project from "./js/project"
import Todo from "./js/todo"
import DOM from "./js/UI"


const projectList = [];
projectList.push(new Project("None"));
projectList.push(new Project("hey"));

projectList[0].addTodo(new Todo("Hello", "abc", 0, true, true))

DOM.initialize(projectList);

export default projectList;