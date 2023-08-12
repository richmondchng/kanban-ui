import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const stages: string[] = ['Backlog', 'To do', 'In progress', 'Done']

  const [newTask, setNewTask] = useState('')

  function handleCreateNewTask(e:FormEvent) {
    e.preventDefault()
    console.log("create task " + newTask)
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

      <div className="content">
        <h1 className="header">Board</h1>
        <div className="stage-board">
          <div className="stage-card">
            <h2 className="stage-header">Backlog</h2>
            <div className="task-card">Task 1</div>
            <div className="task-card">Task 2</div>
          </div>
          <div className="stage-card">
            <h2 className="stage-header">To do</h2>
            <div className="task-card">Task 3</div>
            <div className="task-card">Task 4</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
