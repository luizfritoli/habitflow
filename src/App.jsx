import { useMemo, useContext } from 'react'

import './App.css'

import { createTaskStore } from './store/taskStore'
import ThemeContext from './context/ThemeContext'

import Habits from './components/Habits'
import Graphic from './components/Graphic'
import PastTasks from './components/PastTasks'
import Footer from './components/Footer'

// CAPTURA TODOS OS DIAS SALVOS NO LOCALSTORAGE
const dateKeys = Object.keys(localStorage).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort()

// DELETA 8 DIAS ATRÁS DO LOCALSTORAGE
if (dateKeys.length > 7) {
  const keysToDelete = dateKeys.slice(0, dateKeys.length - 7)
  keysToDelete.forEach((key) => localStorage.removeItem(key))
}

// RETORNO DO CONTEÚDO APÓS DELETAR O OITAVO DIA
const updatedKeys = Object.keys(localStorage)
  .filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key))
  .map((key) => {
    let parsed
    try {
      parsed = JSON.parse(localStorage.getItem(key))
    } catch (e) {
      parsed = {}
    }

    return {
      date: key,
      tasks: Array.isArray(parsed?.state?.tasks) ? parsed.state.tasks : []
    }
  })

const App = () => {

  // CONTROLE DO TEMA
  const { theme, toggleTheme } = useContext(ThemeContext)

  // CAPTURAR A DATA DE HOJE
  const todayDate = useMemo(() => new Date(), [])

  // CAPTURAR O DIA DA SEMANA DE HOJE
  const weekday = todayDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
  })

  // FORMATAR A DATA NO FORMATO PT-BR
  const formatedDate = todayDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  // CRIANDO A CHAVE DO DIA DE HOJE
  const todayKey = todayDate.toISOString().split('T')[0]

  const useTaskStore = createTaskStore(todayKey) // CRIANDO STORE DAS TASKS A CADA DIA

  return (
    <div className='App'>
      {/* PROVIDER DO THEMECONTEXT */}
      <section className={theme === 'light' ?
        // TEMA CLARO
        `bg-[#E9E9E4] h-auto w-full overflow-hidden
   transition-all duration-1000 ease-in-out`
        : `bg-[#050301] h-auto w-full text-white overflow-hidden
      transition-all duration-300 ease-in-out`
      }
      >
        {/* ÁREA DO TÍTULO */}
        <div className='flex justify-center items-center flex-col'>
          {/* BOTÃO DE ALTERNAR O TEMA */}
          <button
            type='button'
            onClick={toggleTheme}
            className={theme === 'light' ?
              // TEMA CLARO
              `cursor-pointer absolute top-20 lg:top-8 right-8 z-50 self-end bg-gradient-to-b from-[#464d55]
              to-[#454647]
              shadow-[0_10px_20px_rgba(160, 158, 158, 0.1),0_3px_6px_rgba(0,0,0,0.05)]
              text-white h-14 w-14 rounded-xl` :
              // TEMA ESCURO
              `cursor-pointer absolute top-20 lg:top-8 right-8 z-50 self-end bg-gradient-to-b from-[#bbbbbb]
              to-[#919191]
              shadow-[0_10px_20px_rgba(219, 219, 219, 0.1),0_3px_6px_rgba(146, 141, 141, 0.425)]
              text-black h-14 w-14 rounded-xl`
            }
          >
            {theme === 'light' ?
              <>☀<br />Claro</>
              : <>🌙<br />Escuro</>}
          </button>
          {/* TÍTULO PRINCIPAL DA PÁGINA INDICANDO O DIA */}
          <h1 className='mt-8 text-4xl font-medium'
          >{formatedDate}</h1>
          {/* DIA DA SEMANA */}
          <span className='weekday'>{weekday}</span>
        </div>
        <div className='flex flex-col md:justify-center md:items-center lg:items-start lg:flex-row'>
          {/* COMPONENTE DAS TAREFAS DIÁRIAS */}
          <Habits useTaskStore={useTaskStore} />
          {/* COMPONENTE DO GRÁFICO DE GASTOS */}
          <Graphic />
        </div>
        {/* COMPONENTE DE TAREFAS PASSADAS */}
        <PastTasks />
        <Footer />
      </section>
    </div>
  )
}

export { updatedKeys }

export default App
