import "./styles.css";
import DOM from "./js/UI.js";
import storage from "./js/storage.js";

const projectList = [];
storage.getData(projectList);
console.log(projectList);

let d = new DOM(projectList);

export default projectList;
