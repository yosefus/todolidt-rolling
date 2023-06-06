
import { useState } from 'react'
import './App.css'

function App() {
  const [todolist, setTodolist] = useState([])
  const [text, setText] = useState('')

  const listOfNotDone = todolist.filter(task => !task.isDone)
  const listOfDone = todolist.filter(task => task.isDone)

  const handleSubmit = (e) => {
    e.preventDefault()
    const task = { text, isDone: false, id: `${Math.random()}` }
    setTodolist(prev => [task, ...prev])
  }
  //  1. בכל הוספת/הסרת משימה - לסכום מחדש את כמות האות e בכל ה-todos.

  //2.  בפעם הראשונה - טענו מהlocalStorage את הtodos

  //3. בכל שינוי בקומפוננטה הדפיסו "חותמת זמן" של הפעולה , בונוס : לתעד את סוג השינוי שנעשה

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
        <button type='submit'>create</button>
      </form>

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
