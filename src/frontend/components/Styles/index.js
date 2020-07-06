import { createGlobalStyle } from "styled-components"
import { createColorClasses, black, white } from "./colors"


const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 14px;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  .logo-font {
    font-family: 'Lobster', cursive;
  }

  .no-outline {
    outline: none;
  }

  .pointer {
    cursor: pointer;
  }

  .f1 {
    font-size: 5rem;
  }

  ${createColorClasses()}
`

export default GlobalStyles

export const primary = black

export const secondary = white

export const text = white
