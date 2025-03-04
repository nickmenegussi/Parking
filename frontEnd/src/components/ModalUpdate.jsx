import React, { useEffect, useState } from "react"
import api from "../services/api"
import { View } from "lucide-react"

export default function ModalUpdateParking({
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  idCarro,
  userId,
}) {
  const [openModal, setOpenModal] = useState(false)
  const [carro, setCarro] = useState({
    CarLicensePlate: "",
    BrandAndModel: "",
    StatusCar: "",
    userId: userId,
  })


  async function ViewCars() {
    try {
      const response = await api.get(`/carros/carros?id=${userId}`);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  async function UpdateParkingSpot() {
    try {
      const { CarLicensePlate, BrandAndModel, StatusCar, userId } = carro

      const response = await api.put(
        `/carros/carros/update/${parseInt(idCarro)}`, {
            CarLicensePlate,
            BrandAndModel,
            StatusCar,
            userId
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      setCarro(response.data)
      alert(response.data.message)
      setOpenModal(false)
      ViewCars()
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data.message}`)
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(!openModal)}
        className="cursor-pointer"
        type="button"
      >
        {iconButton} {titleButton}
      </button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {titleModal}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700">Placa do Carro</label>
              <input
                type="text"
                value={carro.CarLicensePlate.toUpperCase().replace(/[^a-zA-Z0-9]/g, "")}
                maxLength={7}
                onChange={(e) => setCarro({...carro, CarLicensePlate: e.target.value})}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Digite a placa do carro"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Modelo</label>
              <input
                type="text"
                value={carro.BrandAndModel}
                maxLength={7}
                onChange={(e) => setCarro({...carro, BrandAndModel: e.target.value})}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Digite a placa do carro"
              />
            </div>
            <div className="mt-4 mb-5">
              <label className="block mb-2 text-sm font-medium text-black">
                Status do Carro
              </label>
              <select
                value={carro.StatusCar}
                className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) =>
                  setCarro({ ...carro, StatusCar: e.target.value })
                }
              >
                <option value="">Escolha uma opção</option>
                <option value="Estacionado">Estacionado</option>
                <option value="Saiu">Saiu</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={UpdateParkingSpot}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirmar alterações
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
