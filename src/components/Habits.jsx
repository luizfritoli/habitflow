import React, { useContext, useState } from 'react'
import ThemeContext from '../context/ThemeContext'

const Habits = ({ useTaskStore }) => {

    const { theme } = useContext(ThemeContext)

    // CAPTURAR O VALOR TOTAL POUPADO
    let totalSaved = Number(localStorage.getItem('savedMoney'))

    // STATE PARA DEFINIR TASKS NO INPUT
    const [task, setTask] = useState('')
    const [money, setMoney] = useState('')

    // PEGANDO AS TASKS E FUNCTIONS DA TASKSTORE
    const { tasks, defineTask, removeTask, toggleCompleted } = useTaskStore()

    // MATEMÁTICA PARA FILTRAR A PORCENTAGEM DE TAREFAS COMPLETAS
    const completed = tasks.filter((t) => t.completed).length
    const percent = tasks.length === 0 ? 0 : (completed / tasks.length) * 100

    // APAGAR AS TAREFAS
    const erase = () => {
        setTask('')
    }

    // DEFININDO TASK NO OBJETO
    const handleDefineTask = () => {
        if (!task || tasks.length >= 15) return
        defineTask(task)
        erase()
    }

    // EVENTO DE VALIDAR COM O ENTER
    const ENTER_KEY = 13
    const enterDown = (e) => {
        if (e.which === ENTER_KEY) {
            handleDefineTask()
        }
    }

    // FUNCTION PARA DEFINIR O TOTAL POUPADO
    const handleSetMoney = () => {
        const numericValue = Number(money)
        if (!money || isNaN(numericValue)) return
        totalSaved = totalSaved + numericValue
        localStorage.setItem('savedMoney', totalSaved)
        setMoney('')
    }

    const handleResetMoney = () => {
        const numericValue = Number(0)
        totalSaved = 0
        localStorage.setItem('savedMoney', 0)
        setMoney(0)
    }

    return (
        <div className={theme === 'light' ?
            // TEMA CLARO
            `mt-8 min-h-10 lg:ml-10 md:mr-16 px-4 lg:ml-10 flex flex-col h-auto lg:w-1/2
            transition-all duration-1000 ease-in-out` :
            // TEMA ESCURO
            `mt-8 min-h-10 lg:ml-10 md:mr-16 px-4 lg:ml-0 flex flex-col h-auto lg:w-1/2
            text-white transition-all duration-1000 ease-in-out`
        }>
            <h2 className='text-2xl mb-4 md:ml-2 font-medium self-center lg:self-auto'>
                Afazeres de hoje
            </h2>
            <input
                className={theme === 'light' ?
                    // TEMA CLARO
                    `ml-2 h-10 placeholder:text-neutral-950 focus:outline-none focus:ring-0
                    border-black border-b-1 w-80 transition-all duration-1000 ease-in-out` :
                    // TEMA ESCURO
                    `ml-2 h-10 placeholder:text-neutral-50 focus:outline-none focus:ring-0
                    border-white border-b-1 w-80 transition-all duration-1000 ease-in-out`
                }
                type='text'
                value={task}
                onKeyDown={enterDown}
                onChange={(e) => setTask(e.target.value)}
                maxLength={20}
                placeholder='O que preciso fazer hoje?' />
            <button
                type='button'
                onClick={handleDefineTask}
                className={theme === 'light' ?
                    // TEMA CLARO
                    `inline-flex items-center justify-center
                        px-8 h-9 ml-2 mt-2 text-white text-md
                        rounded-md w-25 cursor-pointer
                        bg-gradient-to-b from-[#464d55] to-[#454647]
                         shadow-[0_10px_20px_rgba(160, 158, 158, 0.1),0_3px_6px_rgba(0,0,0,0.05)]
                         transition-all duration-150
                        whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-black/50
                        hover:opacity-85 hover:shadow-[0_2px_8px_rgba(0,1,0,0.2)]
                        active:outline-none select-none transform-gpu sm:h-10` :
                    // TEMA ESCURO
                    `inline-flex items-center justify-center
                        px-8 h-9 ml-2 mt-2 text-black text-md
                        rounded-md w-25 cursor-pointer
                        bg-gradient-to-b from-[#cccccc] to-[#919191]
                        shadow-[0_10px_20px_rgba(160, 158, 158, 0.1),0_3px_6px_rgba(0,0,0,0.05)]
                        transition-all duration-150
                        whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-black/50
                        hover:opacity-85 hover:shadow-[0_2px_8px_rgba(0,1,0,0.2)]
                        active:outline-none select-none transform-gpu sm:h-10`
                }
            >
                Validar
            </button>
            <ul className='mt-4 space-y-2'>
                {tasks.map((t) => (
                    <li
                        className={`${t.completed ? 'line-through' : ''}
                        ml-2 flex flex-row items-center gap-2 text-xl`}
                        onClick={() => toggleCompleted(t.id)}
                        key={t.id}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                        <span>{t.task}</span>
                        <button type='button' onClick={() => removeTask(t.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor"
                                className="size-6 text-red-500 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107
            1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244
            2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456
            0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114
            1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5
            0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0
            0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5
            0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

            <div
                className={tasks.length > 0 ? `bg-neutral-600 w-56 h-7 mt-6 ml-2 text-center
            rounded-md overflow-hidden` :
                    'hidden'}>
                <div
                    className="bg-green-400 text-center h-7 transition-all text-neutral-950
                    duration-600 rounded-md ease-in-out"
                    style={{ width: `${percent}%` }}
                >
                    {percent.toFixed(0)}%
                </div>
            </div>

            <input
                type='number'
                placeholder='Quanto poupei hoje?'
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                className={theme === 'light'
                    // TEMA CLARO
                    ? `ml-2 mt-6 h-10 placeholder:text-neutral-950 focus:outline-none
                    focus:ring-0 border-b-1 w-80 max-w-[340px]`
                    // TEMA ESCURO
                    : `ml-2 mt-6 h-10 placeholder:text-neutral-50 focus:outline-none focus:ring-0
                    border-white border-b-1 w-80`
                }
            />

            <div className='ml-2 mt-2 text-base'>Dinheiro poupado ao todo: R${totalSaved}</div>

            <button
                type='button'
                onClick={handleSetMoney}
                className={theme === 'light' ?
                    // TEMA CLARO
                    `inline-flex items-center justify-center
                            px-8 h-9 ml-2 mt-2 text-white text-md
                            rounded-md w-25 cursor-pointer
                            bg-gradient-to-b from-[#464d55] to-[#454647]
                            shadow-[0_10px_20px_rgba(160, 158, 158, 0.1),0_3px_6px_rgba(0,0,0,0.05)]
                            transition-all duration-150
                            whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-black/50
                            hover:opacity-85 hover:shadow-[0_2px_8px_rgba(0,1,0,0.2)]
                            active:outline-none select-none transform-gpu sm:h-10` :
                    // TEMA ESCURO
                    `inline-flex items-center justify-center
                            px-8 h-9 ml-2 mt-2 text-black text-md
                            rounded-md w-25 cursor-pointer
                            bg-gradient-to-b from-[#cccccc] to-[#919191]
                            shadow-[0_10px_20px_rgba(160, 158, 158, 0.1),0_3px_6px_rgba(0,0,0,0.05)]
                            transition-all duration-150
                            whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-black/50
                            hover:opacity-85 hover:shadow-[0_2px_8px_rgba(0,1,0,0.2)]
                            active:outline-none select-none transform-gpu sm:h-10`
                }
            >
                Poupar
            </button>
            <button type='button'
            onClick={handleResetMoney}
            className={totalSaved ? `ml-2 text-red-500 underline text-sm mt-4
            cursor-pointer self-start`
            : `hidden`
        }
            >
                Resetar poupança
            </button>
        </div>
    )
}

export default Habits
