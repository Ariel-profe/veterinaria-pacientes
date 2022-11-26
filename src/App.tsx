import { useEffect, useState } from "react"
import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { PatientList } from "./components/PatientList"
import { IPatient } from './interfaces/PatientInterface';

function App() {
  
    const [patients, setPatients] = useState<IPatient[]>(JSON.parse(localStorage.getItem('pacientes')!) ?? []);
    const [patient, setPatient] = useState<IPatient>({} as IPatient);

    useEffect(() => {
      localStorage.setItem('pacientes', JSON.stringify(patients));
    }, [patients]);
    

    const handleDelete = (id: string) => {

      const resp = confirm('Deseas eliminar este paciente?');
      if(resp){
        const deletedPatient = patients.filter( (patient:IPatient) => patient.id !== id);
        setPatients(deletedPatient);
      }
    };

  return (
   <div className="container mx-auto mt-20">
    <Header />
    <div className="mt-12 md:flex">
      <Form setPatients={setPatients} patients={patients} patient={patient} setPatient={setPatient} />
      <PatientList patients={patients} setPatient={setPatient} handleDelete={handleDelete} />
    </div>
   </div>
  )
}

export default App
