import React from 'react'

const useToggleTheme = () => {
    const [theme, setTheme] = React.useState(localStorage.getItem('theme'))

    const toggleTheme = (e) => {
        e.preventDefault()
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        } else {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        }
    }
    return {toggleTheme, theme}
}
export default useToggleTheme
