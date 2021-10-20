
import React, { useState } from 'react';
import { Stack, Container, Form, Button } from 'react-bootstrap';

import firebaseApp from '../credenciales';
import {getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithRedirect,
        GoogleAuthProvider,

    } from 'firebase/auth'

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const Logueo = () => {

    const [estaRegistrandose, setEstaRegistrandose ] = useState(false);

    const submitHandle = async(e) => {
    
        e.preventDefault();
        const correo = e.target.formGroupEmail.value;
        const contra = e.target.formGroupPassword.value;

        if(estaRegistrandose){
        
            const usuario = await createUserWithEmailAndPassword(auth, correo, contra);
            
        }else{
            
            signInWithEmailAndPassword(auth, correo, contra)
        }
        
        
    }
    
    


    return (
        <>
            <Container>
                <Stack gap={3}>
                    <h1>{setEstaRegistrandose ? 'Registrate' : 'Inicia Sesion'}</h1>
                <Form onSubmit={ submitHandle }>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Button variant="primary" type="submit">
                            {estaRegistrandose ? 'Registrate' : "inicia Sesion"}
                        </Button>
                    </Form.Group>
                    </Form>
                        <Button variant="primary" type="submit" onClick={ ()=>signInWithRedirect(auth,googleProvider)}>
                            Acceder con Google
                        </Button>
                        <Button variant="primary" type="submit" onClick={()=> setEstaRegistrandose(!estaRegistrandose)}>

                        {estaRegistrandose ? '¿Ya tienes cuenta? Inicia Sesion' : '¿No tienes cuenta? Registrate'}
                        </Button>
                    </Stack>
            </Container>
        </>
    )
}
