import React, { Dispatch, FC } from 'react';
import { PatientCard } from './PatientCard';
import { IPatient } from '../interfaces/PatientInterface';
import { SetStateAction } from 'react';

interface Props{
  patients: IPatient[];
  setPatient: Dispatch<SetStateAction<IPatient>>;
  handleDelete: (id: string) => void;
};

export const PatientList:FC<Props> = ({patients, setPatient, handleDelete}) => {
  
  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>

      {
        patients && patients.length ? (
          <>
            <h2 className='font-black text-3xl text-center'>Listado de pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'> Administra tus {''}
            <span className='text-indigo-600 font-bold'>pacientes y citas</span>
            </p>

            {
              patients.map( (patient:IPatient) => (
                <PatientCard 
                  key={patient.id} 
                  patient={{...patient}} 
                  setPatient={setPatient} 
                  handleDelete={handleDelete}
                />
              ))
            }
          </>
        )  : (
          <>
            <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'> Comienza agregando pacientes {''}
            <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span>
            </p>
          </>
        )
      }
   
</div>
  )
}
