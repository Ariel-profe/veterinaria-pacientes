import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState, useEffect } from 'react'
import { IPatient } from '../interfaces/PatientInterface';
import { Error } from './Error';

interface Props {
  patients: IPatient[];
  patient: IPatient;
  setPatients: Dispatch<SetStateAction<IPatient[]>>;
  setPatient: Dispatch<SetStateAction<IPatient>>;
};

export const Form:FC<Props> = ({setPatients, patients, patient, setPatient}) => {

  const [pet, setPet] = useState<IPatient>({
    name: "",
    owner: "",
    email: "",
    register: "",
    symptom: "",
    id:""
  });

  const [error, setError] = useState(false);
  
  useEffect( () => {
    if(Object.keys(patient).length > 0){
      setPet({
        ...pet,
        name: patient.name,
        owner: patient.owner,
        email: patient.email,
        register: patient.register,
        symptom: patient.symptom,
      })
    }
  }, [patient]);

  const {name, owner, email, register, symptom, id} = pet;


  const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {

    const targetName = event?.target.name;
    const value = event?.target.value;
    setPet({
        ...pet,
        [targetName!]: value
    })
  };

  const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement> | undefined) => {
    e!.preventDefault();

    //Validar form
    if([name, owner, email, register, symptom].includes('')) {
      setError(true);
      return;
    };

    const capitalize = (word: string) => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    };

    const newPatient:IPatient = {
      name: capitalize(name), 
      owner: capitalize(owner), 
      email, 
      register, 
      symptom: capitalize(symptom),
      id
    };

    if(patient.id){
      //Editar registro
      newPatient.id = patient.id
   
      const updatedPatients = patients.map( (pat:IPatient) => pat.id === patient.id ? newPatient : pat );

      setPatients(updatedPatients);
      setPatient({} as IPatient)
    }else{
      //Add new patient to array
      newPatient.id = generateId();
      setPatients([...patients, newPatient]);
      
    }

    //Reset form
    setPet({
      ...pet,
      name: "",
      owner: "",
      email: "",
      register: "",
      symptom: "",
      id: ""
    });
    
  };

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento de pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Anade pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form 
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        onSubmit={handleSubmit}
      >
        {error && <Error msg='Todos los campos son obligatorios' />}
        <div className='mb-5'>
          <label htmlFor="pet" className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input
            type="text"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='pet'
            name="name"
            placeholder='Nombre de la mascota'
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="owner" className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input
            type="text"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='owner'
            name="owner"
            placeholder='Nombre del propietario'
            value={owner}
            onChange={handleChange}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>email</label>
          <input
            type="email"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='email'
            name="email"
            placeholder='Direccion de email'
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Alta</label>
          <input
            type="date"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            id='alta'
            name="register"
            value={register}
            onChange={handleChange}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>Sintomas</label>
          <textarea 
            id='sintomas'
            name="symptom"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los sintomas'
            value={symptom}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={ patient.id ? 'guardar cambios' : 'agregar paciente' }
        />
      </form>
    </div>
  )
}

