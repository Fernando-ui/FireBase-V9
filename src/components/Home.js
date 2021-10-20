import React, {useState, useEffect} from 'react'
import firebaseApp from '../credenciales';
import {getAuth, signOut} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

import { Container, Button} from 'react-bootstrap';
import { AgregarTarea } from './AgregarTarea';
import { ListadoTareas } from './ListadoTareas';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const Home = ({correoUsuario}) => {

    const [arrayTareas, setArrayTareas ] = useState(null);
    console.log(correoUsuario);


    const buscarDocumentoOCrearDocumento = async(idDocumento) => {
    
        // Crea referencia de documento para
        const docuRef = doc (firestore,`usuarios/${idDocumento}`);
        // Buscar Documento
        const consulta = await getDoc(docuRef);
        // Revisa siexiste
        if(consulta.exists()){
            const infoDocu = consulta.data();
            return infoDocu.tareas;

        }else{
            // Si no exist 
            await setDoc(docuRef,{tareas:[...fakeData]});
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.tareas;
            
        }

        
    }
    
    useEffect(() => {
        const fetchTareas = async() => {
        
            const tareasFetchadas = await buscarDocumentoOCrearDocumento(correoUsuario);
            setArrayTareas(tareasFetchadas)    
        }
        fetchTareas();
    }, [])
    


    
    const fakeData = [
      {
        id: 1,
        description: "Tarea falsa 1 ",
        url: "https://picsum.photos/420",
      },
      {
        id: 2,
        description: "Tarea falsa 2 ",
        url: "https://picsum.photos/420",
      },
      {
        id: 3,
        description: "Tarea falsa 3 ",
        url: "https://picsum.photos/420",
      },
    ];

    return (
        <Container>
            <h4>
            hola, Sesion iniciada
            </h4>
            <Button onClick={()=> signOut(auth) }>
                Cerrar Sesion
            </Button>
            <hr />
            <AgregarTarea/>

            {
                arrayTareas &&
                <ListadoTareas 
                arrayTareas={arrayTareas}
                setArrayTareas={ setArrayTareas } 
                correoUsuario={ correoUsuario }
                
                />

                
            }
                </Container>
    )
}
