import styled from "styled-components"
import { Fixed } from "./Containers"


const Background = styled(Fixed).attrs({
  className: "bg-black white",
  fullscreen: true
})`
  z-index: 0;
`

export default Background
