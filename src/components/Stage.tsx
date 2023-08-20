import StageDTO from '../models/Stage';
import TaskDTO from '../models/Task';
import TaskList from './TaskList';

interface StageProps {
    updateCurrentTask: (taskName: string) => void;
    stage:StageDTO;
    tasks:TaskDTO[];
}

const Stage = ({stage, tasks, updateCurrentTask}:StageProps) => {
    return <li className="stage-card" key={stage.name}>
        <h2 className="stage-header">{stage.title}</h2>
        <TaskList stage={stage} tasks={tasks} updateCurrentTask={updateCurrentTask} />
    </li>
}

export default Stage;