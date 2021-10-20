import React from 'react'
import { Container, Form, Col, Row, Button} from 'react-bootstrap';

import firebaseApp from '../credenciales';
import { getFirestore, updateDoc,doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const storage = getStorage(firebaseApp);

const firestore = getFirestore(firebaseApp);

export const AgregarTarea = ({correoUsuario, setArrayTareas, arrayTareas}) => {

    
    let urlDescarga;


    const anadirTarea = (e) => {
        
        e.preventDefault();
        const description = e.target.formDescripcion.value;
        // Crear nuevo array de tareas 
        const nuevoArrayTareas = [...arrayTareas,{id: + new Date(),description , url:urlDescarga}]
        
        // Actualizar Base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef,{ tareas:[...nuevoArrayTareas]});
        
        // Actualizar estado 
        setArrayTareas(nuevoArrayTareas);
    }
    
    
    const fileHandle = async(e) => {

        // Detectar archivi
        const archivoLocal = e.target.files[0];
        // cargarlo a firebase
        const archivoRef = ref(storage, `documentos/${archivoLocal.name}`)
        
        await uploadBytes(archivoRef, archivoLocal);

        urlDescarga = await  getDownloadURL(archivoRef);

    }


    return (
      <Container>
        <Form onSubmit={anadirTarea}>
            <Row>
                <Col><Form.Control type="text" placeholder="Describe tu tarea" id="formDescripcion" /></Col>
                <Col><Form.Control type="file" placeholder="Añade Archivo" onChange={fileHandle}/></Col>
                <Col><Button type="submit">Agregar Tarea</Button></Col>
            </Row>
        </Form>
      </Container>
    );
}

export default AgregarTarea;