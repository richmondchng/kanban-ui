import { FormEvent, useState } from 'react'
import './App.css'
import Stage from './models/Stage'
import Task from './models/Task'

function App() {
  const stages : Stage[] = [
    new Stage("backlog", "Backlog", 0), 
    new Stage("todo", "To do", 1), 
    new Stage("inprogress", "In progress", 2), 
    new Stage("done", "Done", 3)
  ]
  const stageNumbers: number[] = stages.map((stage) => stage.stageNumber)

  const [tasks, setTasks] = useState<Task[]>(new Array<Task>())
  const [newTask, setNewTask] = useState<string>('')
  const [currentTask, setCurrentTask] = useState<string>('')

  function handleCreateNewTask(e:FormEvent) {
    e.preventDefault()

    const isDuplicate:boolean = tasks.some((task) => task.title === newTask)

    if(!isDuplicate) {
      // update tasks
      setTasks(currentTasks => {
        return [...currentTasks,
          new Task(newTask, 0)
        ]
      })
      console.log(tasks)

      // reset task input
      setNewTask('')
    } else {
      handlePrintError(`Duplicate task with title ${newTask}`)
    }
  }

  function handleClickTask(title:string) {
    setCurrentTask(title)
  }

  function getNextStage(currentStage:number) {
    return findNextStage(currentStage, true)
  }

  function getPreviousStage(currentStage:number) {
    return findNextStage(currentStage, false)
  }

  function findNextStage(currentStage:number, forward:boolean) {
    const stages:number[] = forward 
      ? stageNumbers.filter((n) => n > currentStage) 
      : stageNumbers.filter((n) => n < currentStage)

    if(stages.length == 0) {
      return -1
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
        handlePrintError(`Unable to find task with title "${currentTask}"`)
        return null
      } else {
        return selectedTask
      }
    } else {
      handlePrintError("Please select a task!")
      return null
    }
  }

  function handleMoveTaskForward(e:FormEvent) {
    e.preventDefault()

    const selectedTask:Task|null = findTask(currentTask);

    if(selectedTask !== null) {
      const nextStage = getNextStage(selectedTask.stageNumber)
      if(nextStage === -1) {
        handlePrintError("Task is at the end of workflow")
      } else {
        // update tasks
        setTasks(currentTasks => {
          const filteredTasks:Task[] = currentTasks.filter((task) => {
            return task.title !== currentTask
          })
          return [...filteredTasks,
            new Task(selectedTask.title, nextStage)
          ]
        })
      }
    }
  }

  function handleMoveTaskBackward(e:FormEvent) {
    e.preventDefault()

    const selectedTask:Task|null = findTask(currentTask);

    if(selectedTask !== null) {
      const previousStage = getPreviousStage(selectedTask.stageNumber)
      if(previousStage === -1) {
        handlePrintError("Task is at the start of workflow")
      } else {
        // update tasks
        setTasks(currentTasks => {
          const filteredTasks:Task[] = currentTasks.filter((task) => {
            return task.title !== currentTask
          })
          return [...filteredTasks,
            new Task(selectedTask.title, previousStage)
          ]
        })
      }
    }
  }

  function handleDeleteTask(e:FormEvent) {
    e.preventDefault()

    if(currentTask !== '') {
      // filter tasks for current task
      setTasks(currentTasks => {
        const filteredTasks:Task[] = currentTasks.filter((task) => {
          return task.title !== currentTask
        })
        return [...filteredTasks]
      })
      // reset current task
      setCurrentTask('')
    } else {
      handlePrintError("Please select a task!")
    }
  }

  function handlePrintError(message:string) {
    console.error(message);
  }

  return (
    <>
      <div className="content">
        <h1 className="header">Controller</h1>
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
              // onChange={e => setNewTask(e.target.value)}
              type="text" id="currentTask" placeholder="Current task" disabled={true} />
            <button className="form-btn" id="moveTaskForward"
              onClick={(e) => handleMoveTaskForward(e)}>Next Stage</button>
            <button className="form-btn" id="moveTaskBackward"
              onClick={(e) => handleMoveTaskBackward(e)}>Previous Stage</button>
            <button className="form-btn" id="deleteTask"
              onClick={(e) => handleDeleteTask(e)}>Delete</button>
          </form>
        </div>
      </div>

      <div className="content">
        <h1 className="header">Board</h1>
        <div className="stage-content">
          <ul className="stage-board">
            {stages.map((stage) => {
              return <li className="stage-card" key={stage.name}>
              <h2 className="stage-header">{stage.title}</h2>
              <ul className="task-list">
                {tasks.filter((task) => {
                  return task.stageNumber == stage.stageNumber
                }).map((task) => {
                  return <li 
                    className="task-card" 
                    key={task.title}
                    onClick={() => handleClickTask(task.title)}
                    >{task.title}</li>
                })}
              </ul>
            </li>
            })}
          </ul>
        </div>        
      </div>
    </>
  )
}

export default App
