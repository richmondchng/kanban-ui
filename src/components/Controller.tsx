import { FormEvent, useState } from 'react';

interface ControllerProps {
    addNewTask: (newTask: string) => boolean;
    moveTaskForward: (taskName:string) => void;
    moveTaskBackward: (taskName:string) => void;
    deleteTask: (taskName:string) => void;
    currentTask: string;
}

const Controller = ({addNewTask, currentTask, moveTaskForward, moveTaskBackward, deleteTask}:ControllerProps) => {
    const [newTask, setNewTask] = useState<string>('')
    // const [currentTask, setCurrentTask] = useState<string>('')
    
    function handleCreateNewTask(e:FormEvent) {
        e.preventDefault();
        if(addNewTask(newTask)) {
          // reset task input
          setNewTask('');
        }
    }
    
    function handleMoveTaskForward(e:FormEvent) {
        e.preventDefault();
        // console.log("handleMoveTaskForward " + currentTask)
        moveTaskForward(currentTask);
    }

    function handleMoveTaskBackward(e:FormEvent) {
        e.preventDefault();
        // console.log("handleMoveTaskBackward " + currentTask)
        moveTaskBackward(currentTask);
    }

    function handleDeleteTask(e:FormEvent) {
        e.preventDefault();
        // console.log("handleDeleteTask " + currentTask)
        deleteTask(currentTask);
    }

    return <>
        <div className="form-content">
            <form onSubmit={handleCreateNewTask}>
                <label className="form-label" htmlFor="newTask">New Task</label>
                <input className="form-text-input" 
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    type="text" id="newTask" placeholder="Create new task" />
                <button className="form-btn" type="submit" id="newTaskSubmit">Create Task</button>
            </form>
        </div>

        <div className="form-content">
            <form>
                <label className="form-label" htmlFor="currentTask">Current Task</label>
                <input className="form-text-input" 
                    value={currentTask}
                    type="text" id="currentTask" placeholder="Current task" disabled={true} />
                <button type="button" className="form-btn" id="moveTaskForward"
                    onClick={(e) => handleMoveTaskForward(e)}>Next Stage</button>
                <button type="button" className="form-btn" id="moveTaskBackward"
                    onClick={(e) => handleMoveTaskBackward(e)}>Previous Stage</button>
                <button type="button" className="form-btn" id="deleteTask"
                    onClick={(e) => handleDeleteTask(e)}>Delete</button>
            </form>
        </div>
    </>
}

export default Controller;