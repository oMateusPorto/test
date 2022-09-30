import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../../contexts/userContext";
import { v4 as uuidv4 } from 'uuid';
import "./login.css"

export const Login = () => {

  const { updateUser } = useContext(UserContext) as UserContextType

  const [input, setInput] = useState({
    id: uuidv4(),
    login: '',
    password: '',
    CreatedAt: Date()
  })


  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (input.login === '') {
      alert('Digite um nome para realizar o login')
    } else {
      navigate('/UserMaintenance')
      updateUser(input)
    }
  }

  return (
    <>
      <div className="containerLogin">
        <div className="login">
          <h1 className="text-center">Manutenção de Aeronaves</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" >Login</label>
              <input className="form-control" type="login" id="login" name="login" value={input.login} onChange={(e) => setInput({ ...input, login: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" >Password</label>
              <input className="form-control" type="password" id="password" name="password" />
            </div>
            <input className="btn btn-primary w-100" type="submit" value="Entrar" />
          </form>
        </div>
      </div>
    </>
  )
};

export default Login;
