import React, { useEffect, useState } from "react"
import api from "../services/api"
import Table from "../components/TableContent"
import { useNavigate } from "react-router"
import { LogOut } from "lucide-react"
export default function Carro() {
  const idUser = JSON.parse(localStorage.getItem('dado')|| [] )
  const login =  localStorage.getItem('login')
  const navigate = useNavigate()
  const [carro, setCarro] = useState({
    CarLicensePlate: "",
    BrandAndModel: "",
    StatusCar: "",
    userId: idUser[0].idUser

  })

  useEffect(() => {
    if(login !== 'verificado'){
      navigate('/login')
    }  
  }, [login])

  

  async function CadastrarCarro() {
    try {
      const { CarLicensePlate, BrandAndModel, StatusCar, userId } = carro

      const response = await api.post('/carros/carros/create', {
        CarLicensePlate,
        BrandAndModel,
        StatusCar,
        userId
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      alert(response.data.message)
      ViewCars()
    } catch (error) {
      console.error(error)

      if (error.response) {
        alert(error.response.data.message)
      }
    }
  }

  async function ViewCars() {
    try {
      const response = await api.get(`/carros/carros?id=${idUser[0].idUser}`)
    } catch (error) {
      console.error(error)
      if (error.response) {
        alert(error.response.data.message)
      }
    }
  }

  function logOut(){
    localStorage.setItem('login', 'não verificado')
    navigate('/login')
  }

  return (
    <div className="flex flex-col p-4 gap-5 bg-gradient-to-b from-blue-900 to-blue-400 min-h-screen w-full">
       <div>
        <button onClick={logOut} className="text-white cursor-pointer">

        <LogOut size={20} color="white"/>
        </button>
      </div>
      <div className="mx-auto mt-4">
        <h1 className="text-2xl text-white">Cadastrar Carros</h1>
      </div>

      <div className="mx-auto w-full  max-w-md">
        <div className="flex gap-4 mx-auto mt-4">
          <div>
            <label className="text-sm font-medium text-white">
              Placa do Carro
            </label>
            <input
              type="text"
              value={carro.CarLicensePlate.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}
              maxLength={7}
              onChange={(e) => setCarro({ ...carro, CarLicensePlate: e.target.value })}

              className="w-full outline-none p-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100"
              placeholder="Digite o nome do carro"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white">
              Marca/Modelo
            </label>
            <input
              type="text"
              onChange={(e) => setCarro({ ...carro, BrandAndModel: e.target.value })}
              value={carro.BrandAndModel}
              className="w-full outline-none p-2 mt-2 text-black bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100"
              placeholder="Digite o nome do carro"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">Status do Carro</label>
          <select value={carro.StatusCar} name="" id="" className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5" onChange={(e) => setCarro({ ...carro, StatusCar: e.target.value })} >
            <option value="">Escolha uma opção</option>
            <option value="Estacionado">Estacionado</option>
            <option value="Saiu">Saiu</option>
          </select>
        </div>
        <button onClick={CadastrarCarro} className="block cursor-pointer w-full mt-6 bg-white text-black py-2 rounded-lg font-semibold text-center hover:bg-blue-100">
          Entrar
        </button>
      </div>
      <Table/>
    </div>
  )
}
