import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    background-color: #343434;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`

export default GlobalStyles
