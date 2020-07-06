import styled from "styled-components";


export const Fixed = styled.div.attrs({
  className: "fixed top-0 left-0"
})`
  ${props => (
    props.fullscreen
      ? "width: 100%; height: 100%;"
      : ""
  )}
`

export const Absolute = styled.div.attrs({
  className: "absolute top-0 left-0"
})``

export const Content = styled(Absolute).attrs({
  className: "white ph4 pv3"
})`
  max-width: ${props => props.width}px;
  width: 100%;
  z-index: 100;

  ${props => (`
    @media (min-width: ${props.width}px) {
      left: 50%;
      margin-left: ${(props.width / 2) * -1}px;
    }
  `)}

  ${props => (
    !props.height
      ? ""
      : `top: 50%; margin-top: ${(props.height / 2) * -1}px;`
  )}
`
