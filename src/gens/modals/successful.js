import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import successIcon from '../../styles/images/success-icon.png';
import $ from 'jquery';


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
                        $('body').removeClass('no-scroll');
                        window.location.href="https://nativetalk.io";
                    }}>Go back to Homepage</Button>
                </Modal.Footer>
            </Modal.Dialog>
    )
}

export function SuccessfulRegistrationModal() {
    return (
        <Modal.Dialog  className='bg-light mx-auto custom-modal br-15px text-center py-5 position-relative' id="successregmodal">
            <Modal.Header>
            <span onClick={() => { 
                        $('#successregmodal').addClass('hidden');
                        $('body').removeClass('no-scroll');
                        window.location.href = '/'
                        // window.location.href = 'http://127.0.0.1:3000'
                    }} className="position-absolute  end-0 me-4">
            <button  type="button" className="btn-close btn-close " aria-label="Close"></button></span>    
            </Modal.Header>
            <Modal.Body>
                <img src={successIcon} width="100px" alt=''/>
                <Modal.Title><h3 className="fw-700 mt-30px">Registration Successful</h3></Modal.Title>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button className="mx-auto mt-5 text-white green-btn btn-success w-50">Homepage</Button>
            </Modal.Footer> */}
        </Modal.Dialog>
    )
}