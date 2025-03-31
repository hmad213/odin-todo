import "./styles.css"
import Project from "./js/project"
import Todo from "./js/todo"
import DOM from "./js/UI"

const projectList = [];

projectList.push(new Project("None"));
projectList.push(new Project("hey"));
projectList.push(new Project("hello"));

projectList[0].addTodo(new Todo("Hello", "abc", 0, true, true))
projectList[0].addTodo(new Todo("how", "abc", 0, true, false))
projectList[1].addTodo(new Todo("you", "abc", 0, false, true))
projectList[1].addTodo(new Todo("doing", "abc", 0, false, false))
projectList[2].addTodo(new Todo("yeah", "abc", 0, false, true))
projectList[2].addTodo(new Todo("fine", "abc", 0, false, false))

let d = new DOM(projectList);

export default projectList;