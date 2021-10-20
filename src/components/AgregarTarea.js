import React from 'react'
import { Container, Form, Col, Row, Button} from 'react-bootstrap';

import firebaseApp from '../credenciales';
import { getFirestore, updateDoc,doc } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';


const firestore = getFirestore(firebaseApp);

export const AgregarTarea = ({correoUsuario, setArrayTareas, arrayTareas}) => {

    const anadirTarea = (e) => {
        
        e.preventDefault();
        const description = e.target.formDescripcion.value;
        // Crear nuevo array de tareas 
        const nuevoArrayTareas = [...arrayTareas,{id: + new Date(),description , url:'https://picsum.photos/420'}]
        
        // Actualizar Base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef,{ tareas:[...nuevoArrayTareas]});
        
        // Actualizar estado 
        setArrayTareas(nuevoArrayTareas);
    }
    
    


    return (
      <Container>
        <Form onSubmit={anadirTarea}>
            <Row>
                <Col><Form.Control type="text" placeholder="Describe tu tarea" id="formDescripcion" /></Col>
                <Col><Form.Control type="file" placeholder="Añade Archivo"/></Col>
                <Col><Button type="submit">Agregar Tarea</Button></Col>
            </Row>
        </Form>
      </Container>
    );
}

export default AgregarTarea;