import styled from "styled-components";
import { green } from "../Styles/colors"


export const Primary = styled.button.attrs({
  className: "bg-green br2 bn ph5 pv2 white b f4 pointer"
})`
  ${props => (
    !props.block
      ? ""
      : "display: block; width: 100%;"
  )}
`

export const Secondary = styled(Primary)`
  background-color: transparent!important;
  border: 1px solid ${green}!important;
`

export default Primary
