import { useState } from "react"

export const Tasks = () => {

    const [taskText, setTaskText] = useState('');
    const [tasks, setTask] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);


    function updateTaskText(event) {
        setTaskText(event.target.value);
    }

    function addTask() {
        setTask([...tasks, taskText]);
        setTaskText('');
    }

    function completeTask(event) {
        console.log(event.target.value);
        setTask(tasks.filter(task => task !== event.target.value));
        setCompletedTask[[...completedTask, event.target.value]];
    }

    return(
        <div>
            <div>Tasks</div>
            <input onChange={updateTaskText}></input>
            <button onClick={addTask}>Add Task</button> 
            <div>
                {
                    tasks.map(task => {
                        return <p key={task} onClick={completeTask}>{task}</p>
                    })
                }
                {
                    completedTask.map(task => {
                        return <p key={task}>{task}</p>
                    })
                }
            </div>
        </div>
    )

}