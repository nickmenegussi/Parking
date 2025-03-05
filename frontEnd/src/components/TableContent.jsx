import { SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import ModalDeleteParking from "./ModalDelete";
import ModalUpdateParking from "./ModalUpdate";

export default function Table() {
  const idUser = JSON.parse(localStorage.getItem("dado"));
  const [data, setData] = useState([]);

  useEffect(() => {
    ViewCars();
  }, []);

  async function ViewCars() {
    try {
      const response = await api.get(`/carros/carros?id=${idUser[0].idUser}`);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex flex-col p-4 gap-5">
      <div className="mx-auto">
        <table className="w-full rounded-lg overflow-hidden border-white hidden sm:table-caption">
          <thead className="bg-white text-black uppercase text-sm">
            <tr className="text-left">
              <td className="px-4 py-2 text-left">CarId</td>
              <td className="px-4 py-2 text-left">UserId</td>
              <td className="px-4 py-2">Placa do Carro</td>
              <td className="px-4 py-2">Marca/Modelo</td>
              <td className="px-4 py-2">Status</td>
              <td className="px-4 py-2">Ações</td>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y">
            {data.length > 0 ? (
              data.map((car) => (
                <tr key={car.idCarro}>
                  <td className="text-left py-2 px-4">{car.idCarro}</td>
                  <td className="text-left py-2 px-4">{car.userId}</td>
                  <td className="text-left py-2 px-4">{car.CarLicensePlate}</td>
                  <td className="text-left py-2 px-4">{car.BrandAndModel}</td>
                  <td className="text-left py-2 px-4">{car.StatusCar}</td>
                  <td className="text-left py-2 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        <ModalUpdateParking  key={`update-${car.idCarro}`}  userId={car.userId} idCarro={car.idCarro} titleModal={"Update Parking"} iconButton={<SquarePen size={30} />} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 cursor-pointer">
                        <ModalDeleteParking  key={`delete-${car.idCarro}`} userId={car.userId} idCarro={car.idCarro} titleModal={'Delete Parking'} iconButton={<Trash size={30} />} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="sm:hidden flex flex-col gap-4">
          {data.length > 0 ? (
            data.map((car) => (
              <div key={car.idCarro} className="bg-white p-4 rounded-lg shadow-md">
                <p><strong>ID:</strong> {car.idCarro}</p>
                <p><strong>Placa:</strong> {car.CarLicensePlate}</p>
                <p><strong>Marca/Modelo:</strong> {car.BrandAndModel}</p>
                <p><strong>Status:</strong> {car.StatusCar}</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <ModalUpdateParking userId={car.userId} idCarro={car.idCarro} titleModal={"Update Parking"} iconButton={<SquarePen size={30} />} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 cursor-pointer">
                    <ModalDeleteParking userId={car.userId} idCarro={car.idCarro} titleModal={'Delete Parking'} iconButton={<Trash size={30} />} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">Nenhum registro encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
