import React from 'react';
import logo from '../styles/images/logo.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <>
            <Navbar bg='white' className='fixed-top px-5 py-3 gen-border-bottom fw-700'>
                <Container>
                    <Link to='/'>
                        <Navbar.Brand>
                            <img src={logo} className='header-logo'
                            alt="NativeTalk logo"/>
                        </Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>
        </>    
    )
}
