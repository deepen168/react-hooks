import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const Tasks = () => {

    const [taskText, setTaskText] = useState('');
    const [tasks, setTask] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const [removedTask, setremovedTask] = useState([]);
    

    function updateTaskText(event) {
        setTaskText(event.target.value);
    }

    function addTask() {
        setTask([...tasks, {task: taskText, id: uuid()}]);
        setTaskText('');
    }

    function completeTask(t) {
        return () =>{

            setCompletedTask([...completedTask, t]);
            setTask(tasks.filter((task) => {
                return task.id !== t.id;
            }));
            
        }
    }

    function removeTask(t) {
        return () => {
            setCompletedTask(completedTask.filter(task => task.id !== t.id));
            setremovedTask([...removedTask, t]);
        }
    }

    return(
        <div>
            <div>Tasks</div>
            <input onChange={updateTaskText}></input>
            <button onClick={addTask}>Add Task</button> 
            <div>
                {
                    tasks.map((taskMap) => {
                        const {task, id} = taskMap;
                        return <div key={id} onClick={completeTask(taskMap)}>{task}</div>
                    })
                }
                {
                    completedTask.map(taskMap => {
                        const {task, id} = taskMap;
                        return (
                            <div key={id}>
                                <div>
                                    {task}
                                    <span onClick={removeTask(taskMap)}> X</span>
                                </div>
                            </div>    
                        )
                    })
                }
            </div>
        </div>
    )

}