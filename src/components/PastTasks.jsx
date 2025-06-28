import React, { useContext } from 'react'
import { updatedKeys } from '../App'
import ThemeContext from '../context/ThemeContext'

const PastTasks = () => {

  const { theme } = useContext(ThemeContext)
  return (
    <div className='min-h-60 h-auto flex flex-col pb-8 items-center'>
      <h2 className='text-2xl mb-4 md:ml-2 font-medium self-center md:self-auto'>Tarefas passadas</h2>
      {updatedKeys.map(({ date, tasks }) => (
        <div key={date} className={theme === 'light' ? `flex flex-col justify-center items-center
           bg-neutral-50 w-[90%] md:w-[60%] min-h-10 h-auto
            shadow-2xl shadow-black px-4 gap-y-1`
          : `flex flex-col justify-center items-center bg-neutral-50 w-[90%] md:w-[60%]
             min-h-10 h-auto shadow-md shadow-white px-4 gap-y-1 text-black`
      }>
          <h2 className='font-bold'>{date}</h2>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((taskObj) => (
                <li key={taskObj.id} className='gap-y-1'>
                  {taskObj.task} {taskObj.completed ? '✅' : '❌'}
                </li>
              ))
            ) : (
              <li>Nenhuma tarefa salva</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PastTasks
