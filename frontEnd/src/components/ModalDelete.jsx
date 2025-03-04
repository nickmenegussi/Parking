import React, { useEffect, useState } from "react";
import api from "../services/api";
import { View } from "lucide-react";

export default function ModalDeleteParking({
  
  titleModal,
  titleButton,
  iconButton,
  otherStyle,
  idCarro,
  userId,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [CarLicensePlate, setCarLicensePlate] = useState("");


  async function ViewCars() {
    try {
      const response = await api.get(`/carros/carros?id=${userId}`);
      ViewCars();
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  async function removeParkingSpot() {
    try {
      const response = await api.delete(
        `/carros/carros/delete/${idCarro}?userId=${userId}&CarLicensePlate=${CarLicensePlate}`
      );
      alert(response.data.message);
      setOpenModal(false);
      ViewCars()
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data.message}`);
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(!openModal)}
        className={"cursor-pointer"}
        type="button"
      >
        {iconButton} {titleButton}
      </button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tem certeza que deseja excluir esta vaga?
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700">Placa do Carro</label>
              <input
                type="text"
                value={CarLicensePlate.toUpperCase()}
                maxLength={7}
                onChange={(e) => setCarLicensePlate(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Digite a placa do carro"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={removeParkingSpot}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sim, excluir
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
  );
}
