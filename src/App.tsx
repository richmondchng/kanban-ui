import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const stages: string[] = ['Backlog', 'To do', 'In progress', 'Done']

  const [newTask, setNewTask] = useState('')

  function handleCreateNewTask(e:FormEvent) {
    e.preventDefault()
    console.log("create task " + e.target)
    setNewTask('')
  }

  return (
    <>
      <div className="content">
        <h1 className="header">Controller</h1>
        <div className="formContent">
          <form onSubmit={handleCreateNewTask}>
            <label className="formLabel" htmlFor="newTask">New Task</label>
            <input className="formTextInput" 
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              type="text" id="newTask" placeholder="Create new task" />
            <button className="formBtn" type="submit" id="newTaskSubmit">Create Task</button>
          </form>
        </div>
      </div>

      <div className="content">
        <h1 className="header">Board</h1>
        <div className="stageBoard">
          <div className="stageCard">
            <h2 className="stageHeader">Backlog</h2>
            <div className="taskCard">Task 1</div>
            <div className="taskCard">Task 2</div>
          </div>
          <div className="stageCard">
            <h2 className="stageHeader">To do</h2>
            <div className="taskCard">Task 3</div>
            <div className="taskCard">Task 4</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
