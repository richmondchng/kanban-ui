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
  const [tasks, setTasks] = useState(new Array<Task>())

  const [newTask, setNewTask] = useState<string>('')
  function handleCreateNewTask(e:FormEvent) {
    e.preventDefault()
    console.log("create task " + newTask)

    // update tasks
    setTasks(currentTasks => {
      return [...currentTasks,
        new Task(newTask, 0)
      ]
    })
    console.log(tasks)

    // reset task input
    setNewTask('')
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
      </div>

      <div className="content stage-content">
        <h1 className="header">Board</h1>
        <ul className="stage-board">
          {stages.map((stage) => {
            return <li className="stage-card" key={stage.name}>
            <h2 className="stage-header">{stage.title}</h2>
            <ul className="task-list">
              <li className="task-card">Task 1</li>
              <li className="task-card">Task 2</li>
              <li className="task-card">Task 2</li>
              <li className="task-card">Task 2</li>
              <li className="task-card">Task 2</li>
              <li className="task-card">Task 2</li>
              <li className="task-card">Task 2</li>
              <li className="task-card">Task 2</li>
            </ul>
          </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default App
