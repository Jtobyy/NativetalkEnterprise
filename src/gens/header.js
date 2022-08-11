import React from 'react';
import logo from '../styles/images/logo.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


export default function Header() {
    return(
        <>
            <Navbar bg='white' className='fixed-top px-5 py-3 gen-border-bottom fw-700'>
                <Container>
                    <Navbar.Brand href='/'>
                        <img src={logo}
                        height='30'
                        alt="NativeTalk logo"/>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>    
    )
}
