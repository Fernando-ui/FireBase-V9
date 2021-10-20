
import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'

import firebaseApp from '../credenciales';
import { getFirestore, updateDoc,doc } from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

// Leer Base de datos
export const ListadoTareas = ({arrayTareas, correoUsuario, setArrayTareas}) => {


    const eliminarTarea = (idTareaAEliminar) => {
        // crear nuevo array de tareas
        const nuevoArrayTareas = arrayTareas.filter((objetoTarea) => objetoTarea.id !== idTareaAEliminar);

        // Actualizar base de datos
        const docRef = doc(firestore,`usuarios/${correoUsuario}`)
        updateDoc(docRef,{tareas:[...nuevoArrayTareas]});

        // Actualizar state
        setArrayTareas(nuevoArrayTareas);

        
    
    }
    
    


    return (
    
        <Container>
            <Stack>
                { 
                    arrayTareas.map((objetoTarea,i) => {

                        return (
                            <>
                          <Row>
                            <Col>{objetoTarea.description}</Col>
                            <a href={objetoTarea.url}>
                                <Col className="btn btn-primary btn-sm m-3">Ver Archivo</Col>
                            </a>
                            <Col className="btn btn-primary btn-sm m-3" onClick={()=> eliminarTarea(objetoTarea.id)}>Eliminar Tarea</Col>
                          </Row>
                          <hr />
                          </>
                        );
                    })
                
                }
            </Stack>
        </Container>
    
    )
}
