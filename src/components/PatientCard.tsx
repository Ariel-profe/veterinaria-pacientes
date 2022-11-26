import { Dispatch, FC, SetStateAction } from "react"
import { IPatient } from "../interfaces/PatientInterface"

interface Props {
    patient: IPatient;
    setPatient: Dispatch<SetStateAction<IPatient>>;
    handleDelete: (id: string) => void
}

export const PatientCard:FC<Props> = ({patient ,setPatient, handleDelete}) => {

    const {email, name, owner, register, symptom, id} = patient;


  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold mb-3 text-gray-700 uppercase'>Nombre: {''}
                <span className='font-normal normal-case'>{name}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>Propietario: {''}
                <span className='font-normal normal-case'>{owner}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>Email: {''}
                <span className='font-normal normal-case'>{email}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>Fecha alta: {''}
                <span className='font-normal normal-case'>{register}</span>
            </p>
            <p className='font-bold mb-3 text-gray-700 uppercase'>Sintomas: {''}
                <span className='font-normal normal-case'>{symptom}</span>
            </p>

            <div className="flex justify-between mt-10 ">
                <button
                    className="py-2 px-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold uppercase rounded-lg"
                    onClick={ () => setPatient(patient)}
                >Editar</button>

                <button
                 className="py-2 px-8 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                 onClick={() => handleDelete(id)}
                >Eliminar</button>
            </div>
        </div>
  )
}
