import "./styles.css"
import Project from "./js/project"
import Todo from "./js/todo"
import DOM from "./js/UI"

const projectList = [];

projectList.push(new Project("None"));
projectList.push(new Project("Personal Tasks"));
projectList.push(new Project("Work"));
projectList.push(new Project("Home Improvement"));

projectList[0].addTodo(new Todo("Call the bank", "Inquire about credit card offers and eligibility", new Date("2025-04-04"), true, true))
projectList[0].addTodo(new Todo("Plan weekend trip", "Research destinations and book accommodation", new Date("2025-04-05"), false, false))
projectList[1].addTodo(new Todo("Buy Groceries", "Get vegetables, milk, and snacks", new Date("2025-04-02"), true, false))
projectList[1].addTodo(new Todo("Morning workout", "30-minute jog in the park", new Date("2025-04-02"), false, false))
projectList[2].addTodo(new Todo("Finish project report", "Complete the final draft of the quarterly report", new Date("2025-04-05"), true, false))
projectList[2].addTodo(new Todo("Team meeting", "Discuss upcoming features and deadlines", new Date("2025-04-03"), true, false))
projectList[3].addTodo(new Todo("Fix leaking faucet", "Replace the kitchen sink washer", new Date("2025-04-06"), false, true))
projectList[3].addTodo(new Todo("Repaint bedroom", "Choose a new color and repaint the walls", new Date("2025-04-10"), false, false))

let d = new DOM(projectList);

export default projectList;