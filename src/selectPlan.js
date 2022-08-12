import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Steps from './gens/steps';

// importing custom components
import Faq from "./gens/faq";
import ScrollToTopOnMount from './gens/scrollToTop';
import StandardModal from './gens/modals/standard';
import { setWantedFalse } from './features/usersAmountSlice'; // , setProcessedTrue

// importing image files
import basePrice from './styles/images/3000.png';
import free from './styles/images/Free.png';
import fadedBlueCircle from './styles/images/faded-blue-circle.png';
import fadedGreenCircle from './styles/images/faded-green-circle.png';
import fadedBluePolygon from './styles/images/faded-blue-polygon.png';
import fadedGreenPolygon from './styles/images/faded-green-polygon.png';
import greenStar from './styles/images/green-star.png';

// importing other components
import { useState } from 'react';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';


export default function SelectPlan() {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const [selectfree, setSelectFree] = useState(false)

    if (selectfree) {
            dispatch(setWantedFalse())  
            // dispatch(setProcessedTrue())
            window.sessionStorage.setItem('_processed', 'true')
            return <Navigate to='/ReserveNumber' />
        }
    return (
        <div className="text-center pt-5 position-relative">
            <ScrollToTopOnMount />    
            <div className="position-absolute mt-75px mr-100px end-0">
                <Steps num="1" den='3' />    
            </div>
            <section className="d-flex flex-column gen-bg-color align-items-center">
                <h1 className="fw-700 pt-1 pb-5 position-relative" style={{'top': '70px'}}>Select A Plan</h1>    
                <div className="d-flex position-relative" style={{'top': '60px'}}>
                    <Card className="mx-4 lh-30px shadow br-15px h-100 pb-3 free-plan"
                    style={{width: '28vw'}}>
                        <Card.Header as='h4' className='p-3 fw-700 green-bg-color text-white position-relative'>
                            <img src={fadedGreenCircle} className="position-absolute top-0" 
                            width='30px' style={{'left': '30px'}} alt=""/>
                            Nativetalk Starter Plan
                            <img src={fadedGreenPolygon} className="position-absolute bottom-0 
                            mb--2px start-0" 
                            width='25px' alt=""/>
                        </Card.Header>    
                        <img src={fadedGreenPolygon} className="position-absolute bottom-0 
                            start-0" alt=""
                            width='30px' />
                        <Card.Body className='pl-50px' style={{'textAlign':'left'}}>
                            <img src={free} className='mt-4 position-relative t--4px'
                                width='37%' alt=""/>
                            <img src={greenStar} alt="" width='30px' className='mx-3 position-relative t-12px'/>
                            <p className='text-muted mt-3 pb-3 w-75 lh-normal' style={{'fontSize': 'small', 'border-bottom': '1px solid #D6D6D6'}}>Get 2 Extensions for Free</p>
                            <Card.Text className="mb-4">
                                <ul className='fs-sm px-3'>
                                    <li className='lh-normal'><span>Auto Receptionist</span></li>
                                    <li className='lh-normal'><span>Call Forwarding</span></li>
                                    <li className='lh-normal'><span>Call Analytics</span></li>
                                </ul>
                            </Card.Text>
                            <Button className='green-btn w-75 mt-4' 
                            onClick={setSelectFree}>Select</Button>
                            <p className='text-muted mt-3' style={{'fontSize': 'small'}}>Free service valid for 1 year</p>
                        </Card.Body>
                    </Card>
                    <Card className="mx-4 lh-30px shadow br-15px standard-plan"
                    style={{width: '28vw'}}>
                        <Card.Header as='h4' className='p-3 fw-700 blue-bg-color text-white position-relative'>
                            <img src={fadedBlueCircle} className="position-absolute top-0" 
                            width='30px' style={{'left': '30px'}} alt=""/>
                            Nativetalk Standard
                            <img src={fadedBluePolygon} className="position-absolute bottom-0 
                            mb--2px start-0"
                            width='25px' alt=""/>
                        </Card.Header>
                        <img src={fadedBluePolygon} className="position-absolute bottom-0 
                            start-0" 
                            width='30px' alt=""/>
                        <Card.Body className='pl-50px' style={{'textAlign':'left'}}>
                            <Card.Title as='h1' className='fw-800 fs-3em'>
                                <img src={basePrice} 
                                width='80%' alt=""/>
                            </Card.Title>
                            <Card.Text>
                                <ul className='fs-sm px-3 mt-4 lh-normal'>
                                    <li><span>Everything in the starter plan plus</span></li>
                                    <li><span>Call recording</span></li>
                                    <li><span>CRM Integration</span></li>
                                    <li><span>International numbers</span></li>
                                    <li><span>Special numbers</span></li>
                                </ul>
                            </Card.Text>
                            <Button className='green-btn w-75 mt-1' onClick={setShow}>Select</Button>
                        </Card.Body>
                    </Card>
                </div>
            </section>
            {(() => {
                if (show) {
                    window.scrollTo(0, 0);
                    dispatch(setWantedFalse())
                    $('body').addClass('no-scroll');
                    return <div className="position-absolute z-5 mx-auto b-0 br-15px z-6 custom-modal custom-modal-sec
                    mx-3" style={{'top': '20vh', 'left': '33vw'}} >
                        <StandardModal /></div>
                }
            })()}
            <div className="mt-300px mb-5">
                <Faq />
                {/*<Link to="/"><Button className='green-btn btn-success my-5'>See all FAQs</Button></Link>*/}
            </div>
            </div>
    )
    
}