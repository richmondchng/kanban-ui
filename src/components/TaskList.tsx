import StageDTO from '../models/Stage';
import TaskDTO from '../models/Task';
import Task from './Task';

interface TaskListProps {
    updateCurrentTask: (taskName: string) => void;
    stage:StageDTO;
    tasks:TaskDTO[];
}

const TaskList = ({stage, tasks, updateCurrentTask}:TaskListProps) => {
    return <ul className="task-list">
            {tasks.filter((task) => {
                return task.stageNumber == stage.stageNumber
            }).map((task) => {
                return <Task 
                    task={task} 
                    key={task.title} 
                    updateCurrentTask={updateCurrentTask} />
            })}
        </ul>
}

export default TaskList;