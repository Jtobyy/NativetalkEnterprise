// importing bootstrap components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from 'react-bootstrap/Nav';
import Row from "react-bootstrap/Row";

// importing custom components
import Faq from "./gens/faq";
import ScrollToTopOnMount from "./gens/scrollToTop";

// importing other components
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { didSelected, fetchDids, selectAllDids } from "./features/didsSlice";

// importing images
import call_icon from './styles/images/call_icon.png';
import smartphone_floating from "./styles/images/smartphone_floating.png";
import Virtual from './styles/images/Virtual.png';
import Connected from './styles/images/Connected.png';
import Bills from './styles/images/Bills.png';
import Experts from './styles/images/Experts.png';
import Sales from './styles/images/Sales.png';
import OpenQuote from './styles/images/OpenQuote.png';
import CloseQuote from './styles/images/CloseQuote.png';
import rings from './styles/images/rings.png';


export default function Landing() {
    const dispatch = useDispatch()
    const dids = useSelector(selectAllDids)
    const didsStatus = useSelector(state => state.dids.status)
    const errorMessage = useSelector(state => state.dids.error)
    const selectedDid = useSelector(state => state.dids.selected)

    useEffect(() => {
        if (didsStatus === 'idle') {
            dispatch(fetchDids())
        }
        // else if (didsStatus === 'succeeded') {
        //     
        // }
        else if (didsStatus === 'failed') {
            console.log('unable to fetch dids')
            console.log(errorMessage)
            // console.log(errorMessage)
            // if (errorMessage === 'Network Error') alert(errorMessage)
        }
        else if (didSelected === 'success') console.log('got here')
    }, [didsStatus, dispatch, dids, errorMessage])

    return (
        <div className="text-center pt-5">
            <ScrollToTopOnMount />
            <Link className="fixed-top mt-3" style={{'left':'75vw'}} to="/SelectPlan"><Button className='green-btn btn-success'>Create free account</Button></Link>
            <section className="pt-40px d-flex flex-column landing-section-1 gen-bg-color align-items-center
            pb-330px">
                <h1 className="pt-5 w-50 lh-60px text-center fw-700" style={{'lineHeight': '55px'}}>Generate a virtual phone number for your business on NativeTalk</h1>
                <p className="lh-30px" style={{'width': '45vw'}}>
                    Connect with customers in over 60 countries with your NativeTalk virtual phone number. 
                    Get extra tools to grow your business.
                </p>
                <p className="mt-4 text-muted">Pick a number from the dropdown below</p>
                <Form style={{'width': '40vw'}} className="mb-2">
                    <Row>
                        <Col sm={8}>
                            <InputGroup className="mb-1">    
                                <InputGroup.Text className="bg-white" ><img src={call_icon} alt=""/></InputGroup.Text>
                                <Form.Select className="bg-white" style={{'borderLeft': '0px'}} 
                                onClick={(e) => {
                                     dispatch(didSelected(e.target.options.selectedIndex))}} >
                                    {dids.map((did, index) => {
                                        if (index === selectedDid) {
                                            return (<option key={index} id={index} selected>{did.number}</option>)
                                        }
                                        else {
                                            return (<option key={index} id={index}>{did.number}</option>)
                                        }
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Nav.Link as={Col}>
                            <Link className="link" to="/SelectPlan"><Button className='green-btn btn-success w-100'
                            style={{'height': 'fit-content'}} type="submit">Request number</Button></Link>
                        </Nav.Link>  
                    </Row>
                </Form>
            </section>
            <section className="d-flex flex-column bg-white align-items-center pb-5">
                <img className="mt--280px mb-5" src={smartphone_floating} alt=""/>
                <h1 className="pt-5 mt-4 mb-4 w-50 text-center fw-700 lh-60px">Your business communications just got easier</h1>
                <p className="mt-3 lh-30px" style={{'width': '45vw'}}>
                    Getting a new SIM is often the first step when starting a business. 
                    Due to the hassle, some entrepreneurs rely on their personal phone numbers. 
                    What if you could get a phone number specially designed for businesses like yours? 
                    That’s why we built NativeTalk.
                </p>
            </section>
            <section className="gen-bg-sec-color pt-5 mt-5 pb-200px">
                <Container className="pe-5 ps-0">
                    <Row>
                        <Col className="position-relative" style={{'right': '110px'}}>
                            <h1 className="fw-700">Features</h1>    
                        </Col>
                        <Col>
                            <div className='feature-card'>
                                <img src={Virtual} className="pb-2" alt="" />
                                <h4 className="pb-2" >Completely virtual</h4>
                                <p className="pb-2">No need for a new SIM or mobile phone.<br /> 
                                Generate a phone number online, make and<br />
                                receive calls on NativeTalk.</p>
                            </div>
                            <div className='feature-card mt-4'>
                                <img className="pb-2" src={Bills} alt="" />
                                <h4 className="pb-2">Track your phone bills</h4>
                                <p className="pb-2">Make cheaper calls and track your business<br /> 
                                call expenses at a glance.</p>
                            </div>
                            <div className='feature-card mt-4'>
                                <img src={Sales} alt="" />
                                <h4>Manage your sales calls in one place</h4>
                                <p>Add team members to your NativeTalk<br /> 
                                account and receive multiple calls on the<br /> same line at the same time.</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='feature-card'>
                                <img className="pb-2" src={Connected} alt="" />
                                <h4 className="pb-2" >Stay connected always</h4>
                                <p className="pb-2">Collect orders and feedback with NativeTalk’s
                                    <br/> autoresponder even when you are offline.</p>
                            </div>
                            <div className='feature-card mt-4'>
                                <img className="pb-2" src={Experts} alt="" />
                                <h4 className="pb-2">Get call insights</h4>
                                <p className="pb-2">Collect and store real-time information with<br /> 
                                the call pop feature during calls.</p>
                            </div>
                        </Col>
                    </Row>  
                    <Nav.Link className='mt-5 pt-5'>
                        <Link className="link" to="/SelectPlan"><Button className='green-btn btn-success w-25'>Create free account</Button></Link>
                    </Nav.Link>  
                </Container>
            </section>
            <section className="pb-5">
                    <Carousel className="shadow carousel bg-white testimonial position-relative mt--100px mb-5 py-4 lh-30px" variant="success" >
                        <Carousel.Item>
                            <img src={OpenQuote} width='100' alt="" className="open-quote position-absolute"
                            style={{'left': '30px'}}/>
                            <h1 className="fw-700 mt-4 pt-3">Testimonials</h1>
                            <p className="mt-5">Getting a new SIM is often the first step when starting a business. Due to the hassle,<br />
                            some entrepreneurs rely on their personal phone numbers. What if you could get a phone<br /> 
                            number specially designed for businesses like yours? That’s why we built NativeTalk.</p>
                            <p className="fw-600 mt-4 pt-3 mb-0">Lydia Tech4mation</p>
                            <p className="faded-text">Tech4mation LTD</p>
                            <img src={CloseQuote} width='100' alt="" className="close-quote position-absolute"
                            style={{'right': '30px', bottom: '0px'}}/>
                        </Carousel.Item>    
                        <Carousel.Item >
                            <img src={OpenQuote} width='100' alt="" className="open-quote position-absolute"
                            style={{'left': '30px'}}/>
                            <h1 className="fw-700 mt-4 pt-3">Testimonials</h1>
                            <p className="mt-5">Getting a new SIM is often the first step when starting a business. Due to the hassle,<br />
                            some entrepreneurs rely on their personal phone numbers. What if you could get a phone<br /> 
                            number specially designed for businesses like yours? That’s why we built NativeTalk.</p>
                            <p className="fw-600 mt-4 pt-3 mb-0">Lydia Tech4mation</p>
                            <p className="faded-text">Tech4mation LTD</p>
                            <img src={CloseQuote} width='100' alt="" className="close-quote position-absolute"
                            style={{'right': '30px', bottom: '0px'}}/>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img src={OpenQuote} width='100' alt="" className="open-quote position-absolute"
                            style={{'left': '30px'}}/>
                            <h1 className="fw-700 mt-4 pt-3">Testimonials</h1>
                            <p className="mt-5">Getting a new SIM is often the first step when starting a business. Due to the hassle,<br />
                            some entrepreneurs rely on their personal phone numbers. What if you could get a phone<br /> 
                            number specially designed for businesses like yours? That’s why we built NativeTalk.</p>
                            <p className="fw-600 mt-4 pt-3 mb-0">Lydia Tech4mation</p>
                            <p className="faded-text">Tech4mation LTD</p>
                            <img src={CloseQuote} width='100' alt="" className="close-quote position-absolute"
                            style={{'right': '30px', bottom: '0px'}}/>
                        </Carousel.Item>    
                    </Carousel>
                    <Container style={{'height': '680px'}}>
                        <Row className="align-items-center h-100">
                            <Col className="lh-30px"
                            style={{'textAlign': 'left'}}>
                                <div className="position-relative">
                                <h1 className="fw-700 lh-60px">With NativeTalk,</h1>
                                <p className="w-75">you can set up an enterprise-level phone system for your small business in minutes. </p>
                                <Nav.Link className='mt-4 w-50 '>
                                    <Link className="link" to="/SelectPlan"><Button className='green-btn btn-success w-100'>Create free account</Button></Link>
                                </Nav.Link>  
                                </div>
                            </Col>
                            <Col>
                                <div className="position-relative" style={{'width': 'fit-content',
                                'marginLeft': '-65px', 'marginTop': '-280px'}}>
                                    <img src={rings}
                                    width='650vw' className="position-absolute" alt=""/>
                                    <img src={smartphone_floating} 
                                    width='550vw' className="position-absolute"
                                    style={{'top': '65px', 'marginLeft': '50px'}} alt=""/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className="mt-180px mb-5">
                        <Faq />
                        {/*<Link to="/"><Button className='green-btn btn-success mt-5'>See all FAQs</Button></Link>*/}
                    </div>
            </section>
        </div>
    )
}