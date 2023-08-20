import StageDTO from '../models/Stage';
import TaskDTO from '../models/Task';
import Stage from './Stage';

interface BoardProps {
    updateCurrentTask: (taskName: string) => void;
    stages:StageDTO[];
    tasks:TaskDTO[];
}

const Board = ({stages, tasks, updateCurrentTask}:BoardProps) => {
    return <>
        <ul className="stage-board">
            {stages.map((stage) => {
                return <Stage 
                    key={stage.name}
                    stage={stage} 
                    tasks={tasks} 
                    updateCurrentTask={updateCurrentTask} />
            })}
        </ul>
    </>
}

export default Board;