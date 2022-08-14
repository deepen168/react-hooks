import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const Tasks = () => {

    const [taskText, setTaskText] = useState('');
    const [tasks, setTask] = useState(getLocalStorageItemByKey('task'));
    const [completedTask, setCompletedTask] = useState(getLocalStorageItemByKey('completedTask'));
    const [removedTask, setremovedTask] = useState(getLocalStorageItemByKey('removedTask'));
    
    function getLocalStorageItemByKey (key) {
        const retrievedJSON = JSON.parse(localStorage.getItem(key));
        console.log('retrievedJSON', retrievedJSON);
        return [];
        // return retrievedJSON ? [] : retrievedJSON;
     }

    function updateTaskText(event) {
        setTaskText(event.target.value);
    }

    function addTask() {
        setTask([...tasks, {task: taskText, id: uuid()}]);
        setTaskText('');
        localStorage.setItem('task', JSON.stringify(task));
    }
    
    function completeTask(t) {
        return () =>{
            setCompletedTask([...completedTask, t]);
            setTask(tasks.filter((task) => {
                return task.id !== t.id;
            }));
            localStorage.setItem('completedTask', JSON.stringify(completedTask));
        }
    }
    
    function removeTask(t) {
        return () => {
            setCompletedTask(completedTask.filter(task => task.id !== t.id));
            setremovedTask([...removedTask, t]);
            localStorage.setItem('removedTask', JSON.stringify(removedTask));
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