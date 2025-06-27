import { createContext, useState } from "react";

const ThemeContext = createContext(null)

const ThemeProvider = ({ children }) => {
    const initialTheme = localStorage.getItem('prefTheme') || 'light'

    const [theme, setTheme] = useState(initialTheme)

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('prefTheme', newTheme)
    }

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider }
export default ThemeContext
