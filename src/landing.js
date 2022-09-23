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
import smartphone_floating_with_rings from "./styles/images/smartphone-floating-with-rings.png";
import Virtual from './styles/images/Virtual.png';
import Connected from './styles/images/Connected.png';
import Bills from './styles/images/Bills.png';
import Experts from './styles/images/Experts.png';
import Sales from './styles/images/Sales.png';
import OpenQuote from './styles/images/OpenQuote.png';
import CloseQuote from './styles/images/CloseQuote.png';
// import rings from './styles/images/rings.png';


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
        <div className="text-center pt-5 landing">
            <ScrollToTopOnMount />
            <Link className="fixed-top mt-3 ms-auto mr-6vw"  to="/SelectPlan" style={{'width': 'fit-content'}}>
                <Button className='green-btn btn-success'>Create free account</Button>
            </Link>
            <section className="pt-40px d-flex flex-column landing-section1 gen-bg-color align-items-center
            pb-290px">
                <h1 className="pt-5 landing-section1-header1 text-center fw-700 header1" >Generate a virtual phone number for your business on NativeTalk</h1>
                <p className="lh-30px para1" >
                    Connect with customers in over 60 countries with your NativeTalk virtual phone number. 
                    Get extra tools to grow your business.
                </p>
                <p className="mt-4 text-muted para2">Pick a number from the dropdown below</p>
                <Form className="mb-2 landing-section1-form1">
                    <Row>
                        <Col sm={8}>
                            <InputGroup className="mb-1 ">  
                                <InputGroup.Text className="bg-white" ><img src={call_icon} alt=""/></InputGroup.Text>
                                <Form.Select className="bg-white fs-1p2rem did-select" style={{'borderLeft': '0px'}} 
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
                            <Link className="link" to="/SelectPlan"><Button className='green-btn btn-success p-2
                            landing-section1-btn2'type="submit">Request number</Button></Link>
                        </Nav.Link>  
                    </Row>
                </Form>
            </section>
            <section className="d-flex flex-column bg-white align-items-center section2">
                <img className="mt--240px mb-5 smartphone_floating" src={smartphone_floating} alt=""/>
                <h1 className="pt-5 mt-4 mb-4 w-50 text-center fw-700 lh-60px header1">Your business communications just got easier</h1>
                <p className="mt-3 lh-30px para1">
                    Getting a new SIM is often the first step when starting a business. 
                    Due to the hassle, some entrepreneurs rely on their personal phone numbers. 
                    What if you could get a phone number specially designed for businesses like yours? 
                    That’s why we built NativeTalk.
                </p>
            </section>
            <section className="gen-bg-sec-color pt-5 mt-5 pb-200px section3">
                <div className="pr-6vw pl-4vw container-fluid ">
                    <Row>
                        <Col className="position-relative text-md-start text-center
                          mb-4 " lg={4} md={3}>
                            <h1 className="fw-700 features-header">Features</h1>    
                        </Col>
                        <Col className="features-section1">
                            <div className='feature-card'>
                                <img src={Virtual} className="pb-2" alt="" />
                                <h4 className="pb-2" >Completely virtual</h4>
                                <p className="pb-2 pe-3">No need for a new SIM or mobile phone.
                                Generate a phone number online, make and
                                receive calls on NativeTalk.</p>
                            </div>
                            <div className='feature-card mt-4'>
                                <img className="pb-2" src={Bills} alt="" />
                                <h4 className="pb-2">Track your phone bills</h4>
                                <p className="pb-2 pe-3">Make cheaper calls and track your business
                                call expenses at a glance.</p>
                            </div>
                            <div className='feature-card mt-4'>
                                <img className="pb-1" src={Sales} alt="" />
                                <h4 className="">Manage your sales calls in one place</h4>
                                <p className="pb-2 pe-3">Add team members to your NativeTalk
                                account and receive multiple calls on the same line at the same time.</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='feature-card'>
                                <img className="pb-2" src={Connected} alt="" />
                                <h4 className="pb-2" >Stay connected always</h4>
                                <p className="pb-2 pe-3">Collect orders and feedback with NativeTalk’s
                                    autoresponder even when you are offline.</p>
                            </div>
                            <div className='feature-card mt-4'>
                                <img className="pb-2" src={Experts} alt="" />
                                <h4 className="pb-2">Get call insights</h4>
                                <p className="pb-2 pe-3">Collect and store real-time information with
                                the call pop feature during calls.</p>
                            </div>
                        </Col>
                    </Row>  
                    <Nav.Link className='mt-5 pt-5 landing-section3-btn1-wrapper'>
                        <Link className="link" to="/SelectPlan"><Button className='green-btn landing-section3-btn1 btn-success '>Create free account</Button></Link>
                    </Nav.Link>  
                </div>
            </section>
            <section className="pb-5 section4">
                    <Carousel className="shadow carousel bg-white testimonial position-relative mt--100px mb-5 py-4 lh-30px" variant="success" >
                        <Carousel.Item className='testimonial-item '>
                            <img src={OpenQuote} alt="" className="open-quote position-absolute"
                            style={{'left': '30px'}}/>
                            <h1 className="fw-700 mt-4 pt-3 testimonial-header">Testimonials</h1>
                            <p className="mt-5">Getting a new SIM is often the first step when starting a business. Due to the hassle,
                            some entrepreneurs rely on their personal phone numbers. What if you could get a phone
                            number specially designed for businesses like yours? That’s why we built NativeTalk.</p>
                            <p className="fw-600 mt-4 pt-3 mb-0">Lydia Tech4mation</p>
                            <p className="faded-text">Tech4mation LTD</p>
                            <img src={CloseQuote} alt="" className="close-quote position-absolute"
                            style={{'right': '30px', bottom: '0px'}}/>
                        </Carousel.Item>    
                        <Carousel.Item className='testimonial-item'>
                            <img src={OpenQuote} alt="" className="open-quote position-absolute"
                            style={{'left': '30px'}}/>
                            <h1 className="fw-700 mt-4 pt-3 testimonial-header">Testimonials</h1>
                            <p className="mt-5">Getting a new SIM is often the first step when starting a business. Due to the hassle,
                            some entrepreneurs rely on their personal phone numbers. What if you could get a phone
                            number specially designed for businesses like yours? That’s why we built NativeTalk.</p>
                            <p className="fw-600 mt-4 pt-3 mb-0">Lydia Tech4mation</p>
                            <p className="faded-text">Tech4mation LTD</p>
                            <img src={CloseQuote} alt="" className="close-quote position-absolute"
                            style={{'right': '30px', bottom: '0px'}}/>
                        </Carousel.Item>
                        <Carousel.Item className='testimonial-item'>
                            <img src={OpenQuote} alt="" className="open-quote position-absolute"
                            style={{'left': '30px'}}/>
                            <h1 className="fw-700 mt-4 pt-3 testimonial-header">Testimonials</h1>
                            <p className="mt-5">Getting a new SIM is often the first step when starting a business. Due to the hassle,
                            some entrepreneurs rely on their personal phone numbers. What if you could get a phone
                            number specially designed for businesses like yours? That’s why we built NativeTalk.</p>
                            <p className="fw-600 mt-4 pt-3 mb-0">Lydia Tech4mation</p>
                            <p className="faded-text">Tech4mation LTD</p>
                            <img src={CloseQuote} alt="" className="close-quote position-absolute"
                            style={{'right': '30px', bottom: '0px'}}/>
                        </Carousel.Item>    
                    </Carousel>
                    <Container className='pt-5 container' >
                        <Row className="align-items-md-center py-0 h-100 ">
                            <Col className="lh-30px text-md-start" md={6}>
                                <div className="position-relative ">
                                    <h1 className="fw-700 lh-60px mx-auto mx-md-0">With NativeTalk,</h1>
                                    <p className=" mx-auto mx-md-0 para1">you can set up an enterprise-level phone system for your small business in minutes. </p>
                                    <Nav.Link className='mt-4 w-50 mx-auto mx-md-0'>
                                        <Link className="link" to="/SelectPlan"><Button className='green-btn btn-success w-100'>Create free account</Button></Link>
                                    </Nav.Link>  
                                </div>
                            </Col>
                            <Col className="" md={6}>
                                <div className="position-relative t-40px" >
                                    {/* <img src={rings} className="position-absolute rings" alt=""/> */}
                                    <img src={smartphone_floating_with_rings} loading="lazy" className="smartphone_floating_with_rings" alt=""/>
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