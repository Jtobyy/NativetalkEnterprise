import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import failIcon from '../../styles/images/failed.png';


export default function FailedModal() {
    return (
        <Modal.Dialog  className='bg-light br-15px text-center p-5 me-auto'>
            <Modal.Body>
                <img src={failIcon} width="100px" alt=''/>
                <Modal.Title><h2 className="fw-700">Failed</h2></Modal.Title>
            </Modal.Body>
        </Modal.Dialog>
    )
}