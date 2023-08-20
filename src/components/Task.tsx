import TaskDTO from '../models/Task';

interface TaskProps {
    updateCurrentTask: (taskName: string) => void;
    task:TaskDTO;
}

const Task = ({task, updateCurrentTask}:TaskProps) => {
    return <li 
        className="task-card" 
        onClick={() => updateCurrentTask(task.title)}>{task.title}</li>
}

export default Task;