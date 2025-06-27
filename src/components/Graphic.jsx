import React, { useEffect, useReducer, useState, useContext } from 'react'

import ThemeContext from '../context/ThemeContext'

import Chart from 'react-google-charts'

// REDUCER PARA CONTROLE DO GRÁFICO
const reducer = (state, action) => {
  switch (action.type) {
    case 'fastfood':
      return { ...state, fastfood: state.fastfood + action.payload }
    case 'jogosDeAzar':
      return { ...state, jogosDeAzar: state.jogosDeAzar + action.payload }
    case 'comprasImpulsivas':
      return { ...state, comprasImpulsivas: state.comprasImpulsivas + action.payload }
    case 'assinaturasEsquecidas':
      return { ...state, assinaturasEsquecidas: state.assinaturasEsquecidas + action.payload }
    case 'roupasDaModa':
      return { ...state, roupasDaModa: state.roupasDaModa + action.payload }
    case 'eraseAll':
      return {
        ...state, fastfood: 0, jogosDeAzar: 0, comprasImpulsivas: 0, assinaturasEsquecidas: 0,
        roupasDaModa: 0
      }
    default:
      return state
  }
}

const Graphic = () => {

  // CONTEXT DO TEMA
  const { theme } = useContext(ThemeContext)
  const isLight = theme === 'light'

  // STATE INICIAL, PARA PEGAR DO LOCALSTORAGE OU INICIAR DO 0
  const getInitialState = () => {
    const saved = localStorage.getItem('graphic')
    return saved
      ? JSON.parse(saved)
      : {
        fastfood: 0,
        jogosDeAzar: 0,
        comprasImpulsivas: 0,
        assinaturasEsquecidas: 0,
        roupasDaModa: 0,
      }
  }

  // DECLARADO USEREDUCER PARA LIDAR COM STATES DO GRÁFICO
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)

  // EFFECT PARA SALVAR A CADA VEZ QUE UM STATE DO GRÁFICO FOR ALTERADO
  useEffect(() => {
    localStorage.setItem('graphic', JSON.stringify(state))
  }, [state])

  // CAPTURANDO O GASTO INFORMADO
  const [spend, setSpend] = useState('')
  // CAPTURANDO A Category INFORMADA
  const [category, setCategory] = useState('')

  // DATA DAS ESTATÍSTICAS DO GRÁFICO
  const data = [
    ['Desperdício', 'Quantidade'],
    ['Fastfood', state.fastfood],
    ['Jogos de azar', state.jogosDeAzar],
    ['Compras impulsivas', state.comprasImpulsivas],
    ['Assinaturas esquecidas', state.assinaturasEsquecidas],
    ['Roupas da moda', state.roupasDaModa],
  ]

  // ESTILOS DO GRÁFICO
  const options = {
    title: 'Com o que eu mais gasto?',
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 16,
      color: isLight ? 'black' : 'white'
    },
    legend: {
      textStyle: {
        color: isLight ? '#111' : '#eee'
      }
    }
  }

  // FUNCTION PARA ALTERAR VALOR DO GRÁFICO
  const handleAddSpend = () => {
    let value = Number(spend)
    if (!category || !value || value < 0 || isNaN(value)) return

    dispatch({ type: category, payload: value })
    setSpend('')
    setCategory('')
  }

  return (
    <div className='mt-25 md:mt-26 lg:mt-8 min-h-10 px-4 flex flex-col
    md:ml-10 h-auto md:w-1/2 transition-all duration-1000 ease-in-out'>
      <h2 className='text-2xl mb-4 font-medium self-center lg:self-auto'>
        Gráfico de gastos
      </h2>

      {/* CAMPO PARA INSERIR O GASTO IMPRUDENTE */}
      <input
        className={theme === 'light'
          // TEMA CLARO
          ? `mb-4 h-10 md:ml-0 placeholder:text-neutral-950 self-start
      md:self-auto focus:outline-none focus:ring-0 border-black border-b-1 w-80 transition-all duration-1000 ease-in-out`
          // TEMA ESCURO
          : `mb-4 h-10 md:ml-0 placeholder:text-neutral-50 self-start
      md:self-auto focus:outline-none focus:ring-0 border-white border-b-1 w-80 transition-all duration-1000 ease-in-out`
        }
        type='number'
        value={spend}
        onChange={(e) => setSpend(e.target.value)}
        placeholder='Dinheiro gasto de forma imprudente'
      />

      <span className='mb-5 ml-3 md:ml-0 self-center md:self-auto'>Com o que gastei?</span>

      {/* CAMPO DE OPÇÕES DE GASTOS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 place-items-center
      text-sm md:ml-0">

        {/* OPÇÃO FASTFOOD */}
        <label className="flex flex-col items-center text-center">
          <input type="radio"
            value="fastfood"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === 'fastfood'}
            name="desperdicio" />
          Fastfood
        </label>

        {/* OPÇÃO JOGOS DE AZAR */}
        <label className="flex flex-col items-center text-center">
          <input type="radio"
            value="jogosDeAzar"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === 'jogosDeAzar'}
            name="desperdicio" />
          Jogos de azar
        </label>

        {/* OPÇÃO COMPRAS IMPULSIVAS */}
        <label className="flex flex-col items-center text-center">
          <input type="radio"
            value="comprasImpulsivas"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === 'comprasImpulsivas'}
            name="desperdicio" />
          Compras impulsivas
        </label>

        {/* OPÇÃO ASSINATURAS ESQUECIDAS */}
        <label className="flex flex-col items-center text-center">
          <input type="radio"
            value="assinaturasEsquecidas"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === 'assinaturasEsquecidas'}
            name="desperdicio" />
          Assinaturas esquecidas
        </label>

        {/* OPÇÃO ROUPAS DA MODA */}
        <label className="flex flex-col items-center text-center">
          <input type="radio"
            value="roupasDaModa"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === 'roupasDaModa'}
            name="desperdicio" />
          Roupas da moda
        </label>
      </div>

      {/* BOTÕES DE ADICIONAR GASTO E LIMPAR GRÁFICO, RESPECTIVAMENTE */}
      <div className="flex justify-evenly items-center flex-col w-full mt-4 px-4">
        <button
          type="button"
          onClick={handleAddSpend}
          className={theme === 'light'
            // TEMA CLARO
            ? `inline-flex items-center justify-center px-6 h-9 text-white
            text-sm rounded-md w-40 cursor-pointer bg-gradient-to-b from-[#464d55]
            to-[#454647] shadow-[0_10px_20px_rgba(160,158,158,0.1),0_3px_6px_rgba(0,0,0,0.05)]
            transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-black/50
            hover:opacity-85 hover:shadow-[0_2px_8px_rgba(0,1,0,0.2)]
            active:outline-none select-none transform-gpu`
            // TEMA ESCURO
            : `inline-flex items-center justify-center px-6 h-9 text-black
            text-sm rounded-md w-40 cursor-pointer bg-gradient-to-b from-[#cccccc]
            to-[#919191] shadow-[0_10px_20px_rgba(160,158,158,0.1),0_3px_6px_rgba(0,0,0,0.05)]
            transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-black/50
            hover:opacity-85 hover:shadow-[0_2px_8px_rgba(0,1,0,0.2)]
            active:outline-none select-none transform-gpu`}
        >
          Adicionar gasto
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: 'eraseAll' })}
          className={Object.values(state).some(v => v > 0)
            // MOSTRA COM GRÁFICO EXIBIDO
            ? `text-red-500 underline text-sm mt-4 cursor-pointer`
            // SE ESCONDE COM GRÁFICO ESCONDIDO
            : `hidden`}
        >
          Limpar gráfico
        </button>
      </div>
      <div className='flex flex-col items-center'>
        {/* GRÁFICO PRINCIPAL */}
        <Chart
          width={'400px'}
          height={'280px'}
          chartType='PieChart'
          loader={<div>Carregando... </div>}
          data={data}
          options={options}
        />
      </div>
    </div>

  )
}

export default Graphic
