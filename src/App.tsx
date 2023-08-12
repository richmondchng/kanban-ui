import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const stages: string[] = ['Backlog', 'To do', 'In progress', 'Done']

  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState({
    backlog: new Array<string>(),
    todo: [],
    inprogress: [],
    done: []
  })

  function handleCreateNewTask(e:FormEvent) {
    e.preventDefault()
    console.log("create task " + newTask)

    // new tasks are always created in backlog
    const backlog: string[] = [...tasks.backlog, newTask]
    // update state
    setTasks({...tasks, backlog: backlog})

    // reset task input
    setNewTask('')

    //console.log(JSON.stringify(tasks))
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
            return <li className="stage-card" key={stage.replace(' ', '-')}>
            <h2 className="stage-header">{stage}</h2>
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
