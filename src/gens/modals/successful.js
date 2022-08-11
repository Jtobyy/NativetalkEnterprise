import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import successIcon from '../../styles/images/success-icon.png';


export function SuccessfulPaymentModal() {
    return (
        <Modal.Dialog  className='bg-light w-25 position-absolute
        custom-modal z-5 br-15px l-35vw t-10vw text-center px-1 py-5 me-auto'>
            <Modal.Body>
                <img src={successIcon} width="100px" alt=''/>
                <Modal.Title><h2 className="fw-700">Successful</h2></Modal.Title>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mx-auto mt-5 text-white green-btn btn-success w-50">Go to dashboard</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

export function SuccessfulOtpVerificationModal() {
    const [username, setUsername] = useState('')
    useEffect(() => {
        let url = new URL(window.location.href);
        setUsername(url.searchParams.get('username') || sessionStorage.getItem('number'))
    }, [username])
    if (!window.sessionStorage.getItem('otp_token'))
        return <Navigate to='/' />
    return (
            <Modal.Dialog  className='bg-light 
            custom-modal custom-modal-sec z-5 br-15px text-center px-5 py-5 mx-auto'>
                <Modal.Header>
                    <img src={successIcon} width="100px" alt=''/>
                    <Modal.Title><h4 className="fw-700">Verification Successful</h4></Modal.Title>    
                </Modal.Header>    
                <Modal.Body className="pt-4">
                    <h5>Please take note.</h5>
                    <div className='fw-600'>Dashboard Username: <span className='text-muted'>{username}</span></div>
                    <div className='fw-600'>Dashboard Password: <span className='text-muted'>Your password</span></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="mx-auto mt-5 text-white green-btn btn-success"
                    onClick={() => {
                        window.sessionStorage.clear();
                        window.location.href="https://definitive271.dashboard.nativetalk.com.ng";
                    }}>Go to dashboard</Button>
                </Modal.Footer>
            </Modal.Dialog>
    )
}