import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  async function Login() {
    try {
      const response = await api.post("/user/user/login", {
        email,
        password
      })
      alert(response.data.message)
      localStorage.setItem('dado', JSON.stringify(response.data.data))
      localStorage.setItem('login',"verificado")
      navigate('/cadastrarCarro')
    } catch (error) {
      if(error.response){
        alert(`Erro: ${error.response.data.message}`)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-b from-blue-900 to-blue-400 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Iniciar Login
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Faça seu login para explorar nosso app!
        </p>
        <div className="mt-6">
          <label className="text-sm font-medium text-black">Email</label>
          <input
            value={email}
            placeholder="Digite seu Email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="w-full outilne-none max-w-md p-2 mt-2 text-black bg-white border-1 rounded-md "
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-black">Senha</label>
          <input
            value={password}
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full outilne-none max-w-md p-2 mt-2 text-black bg-white border-1 rounded-md "
          />
        </div>

        <button onClick={Login} className="block cursor-pointer w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700">
          Entrar
        </button>
      </div>
    </div>
  );
}
