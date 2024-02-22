import React from "react";
import TaskListItem from "./TaskListItrm";

const TaskList = (props) => {
    const { taskList, deleteTaskBtnHandler} = props;
    return(
        <ul className="collection">
            {taskList.map((singleTask, index) => {
                return(
                    <TaskListItem
                    key={index}
                    name={singleTask}
                    deleteTaskBtnHandler={deleteTaskBtnHandler}
                    index={index}
                    />
                );
            })}
        </ul>
    );
};

export default TaskList;