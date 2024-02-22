import React from "react";
import { saveArray } from "../../App";

const Taskform = (props) => {
    const { taskInput, setTaskInput, taskList, setTaskList } = props;

    const taskInputHandler = (e) => {
        e.preventDefault();
        setTaskInput(e.target.value);
    };

    const taskFormSubmitHandler = (e) => {
        e.preventDefault();
        if(!taskInput){
            alert("Please fill the input field!");
            return;
        }
        const taskListTemp = [...taskList];
        taskListTemp.push(taskInput);

        saveArray(taskListTemp);
        setTaskList(taskListTemp);
        setTaskInput("");
    };

    return(
        <form id="task-form" onSubmit={taskFormSubmitHandler}>
            <div className="row">
                <div className="input-field col s12">
                    <input type="text" name="task" id="task" onChange={taskInputHandler} value={taskInput}/>
                    <label>New Task</label>
                </div>
            </div>
            <input type="submit" value="Add Task" className="btn"/>
        </form>
    );
};

export default Taskform;