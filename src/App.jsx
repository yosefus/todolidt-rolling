
import { useEffect, useState } from 'react'
import './App.css'


// function father() {
//   let a = {}
//   let f = {}

//   function son() {
//     co
//     let b = {}
//     console.log();

//   }

//   son()
//   son()
//   son()
//   son()
// }

function App() {
  const [todolist, setTodolist] = useState(localStorage.listOfTasks ? JSON.parse(localStorage.listOfTasks) : [])
  const [text, setText] = useState('')
  const [countE, setCountE] = useState(0)

  const listOfNotDone = todolist.filter(task => !task.isDone)
  const listOfDone = todolist.filter(task => task.isDone)

  const handleSubmit = (e) => {
    e.preventDefault()
    const task = { text, isDone: false, id: `${Math.random()}` }
    setTodolist(prev => [task, ...prev])
  }

  useEffect(() => {
    // what to do
    let eInList = 0
    for (const task of todolist) {
      for (const letter of task.text) {
        if (letter === 'e') eInList++
      }
    }
    setCountE(eInList);

    // listen to
  }, [todolist.length])

  useEffect(() => {
    console.log('on change of list');
    localStorage.listOfTasks = JSON.stringify(todolist)
  }, [todolist])

  useEffect(() => {
    console.log('on change of text\n', new Date);
  }, [text])


  const handleDone = (id) =>
    setTodolist(prev =>
      prev.map(task => task.id !== id ?
        task :
        { ...task, isDone: true }))

  const handleNotDone = (id) =>
    setTodolist(prev =>
      prev.map(task => task.id !== id ?
        task :
        { ...task, isDone: false }))

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="date" name="" id="" />
        <button type='submit'>create</button>
      </form>
      <p>e in tasks is : {countE}</p>

      <ul className='not-done list'>
        {listOfNotDone.map((task, i) =>
          // TODO - create component
          // TODO - delete one
          <li key={`${task.text}${i}`}>
            {task.text}
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleDone(task.id)}
            />
          </li>
        )}
      </ul>

      <ul className='done list'>
        {listOfDone.map((task, i) =>
          // TODO - create component
          <li key={`${task.text}${i}`}>
            {task.text}
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleNotDone(task.id)}
            />
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
