import React from "react"
import Logo from "../../components/Logo"
import Message from "../../components/Message"
import Button, { Secondary } from "../../components/Button/"
import Text, { FormControl } from "../../components/Inputs/"
import { Content } from "../../components/Containers"
import { Just } from "data.maybe"
import { connect } from "react-redux"
import { K, pluck } from "../../helpers"
import { login, register, updateUserInfo } from "../../actions/user"
import { getUserError, getUserData, isLoading } from "../../reducers/user/selectors"
import { useHistory } from "react-router-dom"


const Login = ({ username, password, updateUserInfo }) => (
  <Content height={409.89} width={600}>
    <Logo />
    <FormControl>
      <Text value={username} onChange={value => updateUserInfo("username", value)} label={Just("Username")} />
      <Text value={password} onChange={value => updateUserInfo("password", value)} label={Just("Password")} type="password" />
      <Error />
      <Buttons username={username} password={password} />
    </FormControl>
  </Content>
)

export default  connect(
  state => ({
    username: pluck("username")(getUserData(state)).getOrElse(""),
    password: pluck("password")(getUserData(state)).getOrElse(""),
  }),
  { updateUserInfo }
)(Login)


const Buttons = connect(
  K({}),
  { login, register }
)(({ username, password, login, register }) => {
  let history = useHistory()

  return (
    <div className="mt4 tc">
      <Button onClick={() => login({ username, password }).then(() => history.push("/home"))} block>Login</Button>
      <div className="mv2">or</div>
      <Secondary onClick={() => register({ username, password })} block>Register</Secondary>
    </div>
  )
})

const Error = connect(
  state => ({
    error: getUserError(state),
    isLoading: isLoading(state)
  })
)(({ error, isLoading }) => (
  error
    .chain(pluck("error"))
    .cata({
      Nothing: () => !isLoading ? null : <Message>Loading...</Message>,
      Just: message => <Message>{ message.toString() }</Message>
    })
))

