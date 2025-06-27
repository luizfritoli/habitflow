import React, { useContext } from 'react'

import ThemeContext from '../context/ThemeContext'

import logo_luiz from '../assets/logo_luiz.png'
import logo_luiz_white from '../assets/logo_luiz_white.png'

const Footer = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <div className={theme === 'light' ?
            // TEMA CLARO
            `bg-[#cfcfc3] w-[100%] min-h-30 h-auto m-0 p-0 text-xs
        lg:text-sm lg:grid lg:grid-cols-2 p-4`
            /// TEMA ESCURO
            : `bg-[#13100d] w-[100%] min-h-30 h-auto m-0 p-0 text-xs
        lg:text-sm lg:grid lg:grid-cols-2 p-4 text-white`
    }>
            <div className='flex justify-center items-center gap-x-2'>
                <p>© Pensado e feito por <strong>Luiz Fritoli</strong> com muito capuccino! ☕︎</p><br />
                <p><strong>Tailwind CSS</strong>,
                    <strong> JavaScript </strong>
                    e <strong> React JS </strong>
                    foram utilizados para a montagem da estrutura da página. Escrito com
                    <strong> Visual Studio Code</strong>.</p>
            </div>
            <div className='flex justify-end items-center md:justify-center'>
            <p>
            <strong className='underline'>Conheça meu portfólio</strong>
             </p>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                  className="ml-1 size-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0
                0-7.5 7.5M21 12H3" />
                </svg>
                <a href="https://luizfritoli.github.io/portfolio-luizfritoli/"
                target='_blank'>
                <img src={theme === 'light' ? logo_luiz : logo_luiz_white}
                    alt="Logo LGBF"
                    className='w-18 h-14 mr-12 '/>
                </a>
            </div>
        </div>
    )
}

export default Footer
