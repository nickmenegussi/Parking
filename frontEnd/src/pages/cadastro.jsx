import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate()

  async function Cadastro() {
    try {
      const response = await api.post("/user/user/register", {
        email,
        password,
        cpf
      })

      alert(response.data.message)
      navigate('/login')
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
          Cadastro
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Crie a sua conta ou faça seu login para explorar nosso app!
        </p>
        <div className="mt-6">
          <label className="text-sm font-medium text-black">Email</label>
          <input
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="w-full outilne-none max-w-md p-2 mt-2 text-black bg-white border-1 rounded-md "
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-black">Senha</label>
          <input
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full outilne-none max-w-md p-2 mt-2 text-black bg-white border-1 rounded-md "
          />
        </div>
        <div className="mt-4 ">
          <label className="text-sm font-medium text-black">Cpf</label>
          <input
            placeholder="Digite seu CPF"
            type="text"
            value={cpf.replace(/\D/g, "")}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={11}
            className="w-full outilne-none max-w-md p-2 mt-2 text-black bg-white border-1 rounded-md "
          />
        </div>
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 hover:text-blue-700 cursor-pointer">
            Já tem uma conta? Faça seu Login
            </Link>
        </div>
        <button onClick={Cadastro} className="block cursor-pointer w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-blue-700">
          Entrar
        </button>
      </div>
    </div>
  );
}
