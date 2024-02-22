import { useState } from 'react';
import './App.css';
import TaskForm from './Components/Task Form/TaskForm';
import TaskList from './Components/Task list/Tasklist';

const localStorageKey = "tasks";

export const saveArray = (array) => {
  localStorage.setItem(localStorageKey,JSON.stringify(array));
}

export const getArray = () => {
  return JSON.parse(localStorage.getItem(localStorageKey));
}
function App() {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  const clearTaskBtnHandler = (e) => {
    e.preventDefault();
     
    if (window.confirm("Are you sure?")){
      setTaskInput([]);
      parentElement.parentElement.parentElement.remove();
    }
  }

  const deleteTaskBtnHandler = (index) =>{
    
    if(window.confirm("Are you sure?")){
      const tempTaskList = [...taskList];
      tempTaskList.splice(index,1);
      setTaskList(tempTaskList);
    }
  }
  return (
   <div className="container">
    <div className="row">
      <div className="col s12">
        <div id="main" className="card">
          <div className="card-content">
            <span className="card-title">Task List</span>
            <TaskForm 
              taskInput={taskInput} 
              setTaskInput={setTaskInput} 
              taskList={taskList} 
              setTaskList={setTaskList} 
            />
          </div>
          <div className="card-action">
            <h5 id="task-title">Tasks</h5>
            <div className="input-field col s12">
              <input type="text" name="filter" id="filter" />
              <label >Filter Task</label>
            </div>
            <TaskList taskList={taskList} deleteTaskBtnHandler={deleteTaskBtnHandler}/>
            <a className="clear-tasks btn black" onClick={clearTaskBtnHandler}>Clear Tasks</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
