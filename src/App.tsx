import { useState } from 'react'
import './App.css'
import Stage from './models/Stage'
import Task from './models/Task'
import Controller from './components/Controller'
import Board from './components/Board'

function App() {
  const stages : Stage[] = [
    new Stage("backlog", "Backlog", 0), 
    new Stage("todo", "To do", 1), 
    new Stage("inprogress", "In progress", 2), 
    new Stage("done", "Done", 3)
  ];
  const stageNumbers: number[] = stages.map((stage) => stage.stageNumber);

  const [currentTask, setCurrentTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(new Array<Task>());

  function addNewTask(newTask:string) {
    const isDuplicate:boolean = tasks.some((task) => task.title === newTask);
    if(!isDuplicate) {
      setTasks(currentTasks => {
        return [...currentTasks, new Task(newTask, 0)]
      });
      return true;
    } else {
      handlePrintError(`Duplicate task with title ${newTask}`);
      return false;
    }
  }

  function updateCurrentTask(title:string) {
    setCurrentTask(title);
  }

  function getNextStage(currentStage:number) {
    return findNextStage(currentStage, true);
  }

  function getPreviousStage(currentStage:number) {
    return findNextStage(currentStage, false);
  }

  function findNextStage(currentStage:number, forward:boolean) {
    const stages:number[] = forward 
      ? stageNumbers.filter((n) => n > currentStage) 
      : stageNumbers.filter((n) => n < currentStage);

    if(stages.length == 0) {
      return -1;
    } else {
      return forward ? Math.min(...stages) : Math.max(...stages);
    }
  }

  function findTask(title:string) {
    if(title !== '') {
      // find task in tasks and increment stage
      const selectedTask:Task|undefined = tasks.find((task) => {
        return task.title === currentTask
      }) ?? undefined;
      if(selectedTask === null || selectedTask === undefined) {
        handlePrintError(`Unable to find task with title "${currentTask}"`);
        return null;
      } else {
        return selectedTask;
      }
    } else {
      handlePrintError("Please select a task!");
      return null;
    }
  }

  function moveTaskForward(taskName:string) {
    const selectedTask:Task|null = findTask(taskName);

    if(selectedTask !== null) {
      const nextStage = getNextStage(selectedTask.stageNumber);
      if(nextStage === -1) {
        handlePrintError("Task is at the end of workflow");
      } else {
        // update tasks
        setTasks(currentTasks => {
          const filteredTasks:Task[] = currentTasks.filter((task) => {
            return task.title !== taskName;
          });
          return [...filteredTasks,
            new Task(selectedTask.title, nextStage)
          ];
        })
      }
    }
  }

  function moveTaskBackward(taskName:string) {

    const selectedTask:Task|null = findTask(taskName);

    if(selectedTask !== null) {
      const previousStage = getPreviousStage(selectedTask.stageNumber);
      if(previousStage === -1) {
        handlePrintError("Task is at the start of workflow");
      } else {
        // update tasks
        setTasks(currentTasks => {
          const filteredTasks:Task[] = currentTasks.filter((task) => {
            return task.title !== taskName;
          })
          return [...filteredTasks,
            new Task(selectedTask.title, previousStage)
          ];
        })
      }
    }
  }

  function deleteTask(taskName:string) {

    if(taskName !== '') {
      // filter tasks for current task
      setTasks(currentTasks => {
        const filteredTasks:Task[] = currentTasks.filter((task) => {
          return task.title !== taskName
        });
        return [...filteredTasks];
      })
      // reset current task
      setCurrentTask('');
    } else {
      handlePrintError("Please select a task!");
    }
  }

  function handlePrintError(message:string) {
    console.error(message);
  }

  return (
    <>
      <div className="content">
        <h1 className="header">Controller</h1>
        <div className="controller-content">
          <Controller 
            addNewTask={addNewTask} 
            currentTask={currentTask}
            moveTaskForward={moveTaskForward}
            moveTaskBackward={moveTaskBackward}
            deleteTask={deleteTask} />
        </div>
      </div>

      <div className="content">
        <h1 className="header">Board</h1>
        <div className="stage-content">
          <Board 
            stages={stages} 
            tasks={tasks} 
            updateCurrentTask={updateCurrentTask} />
        </div>
      </div>
    </>
  )
}

export default App;
