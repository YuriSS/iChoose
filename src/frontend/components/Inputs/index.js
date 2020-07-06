import React from "react"
import styled from "styled-components";
import { red } from "../Styles/colors"
import { Nothing } from "data.maybe"


export const Text = ({
  label=Nothing(),
  onChange=(() => null),
  type="text",
  value
}) => (
  <div>
    { label.map(l => <Label>{l}</Label>).getOrElse() }
    <InputText value={value} type={type} onChange={evt => onChange(evt.target.value)} />
  </div>
)

export const Select = ({
  children=[],
  label=Nothing(),
  onChange=(() => null),
  type="text",
}) => (
  <div>
    { label.map(l => <Label>{l}</Label>).getOrElse() }
    <InputSelect onChange={evt => onChange(evt.target.value)}>
      { children }
    </InputSelect>
  </div>
)

export const FormControl = styled.div`
  & div[data-label] {
    margin-top: 2rem;
    &::first-child {
      margin-top: 0;
    }
  }
`

export default Text


const Label = styled.div.attrs({
  className: "mb1",
  "data-label": true
})``

const InputText = styled.input.attrs({
  className: "bg-white br2 bn ph3 pv2 w-100"
})`
  outline-color: ${red};
`

const InputSelect = styled.select.attrs({
  className: "bg-white br2 bn ph3 pv2 w-100"
})`
  outline-color: ${red};
`