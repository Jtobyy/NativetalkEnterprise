// importing bootstrap components
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

// importing custom components
import Steps from "./gens/steps";
import CheckoutForm from "./gens/checkoutForm";
import ScrollToTopOnMount from "./gens/scrollToTop";

// importing other components
import React from "react";
// import SuccessfulModal from "./gens/modals/successful";
// import FailedModal from "./gens/modals/failed";
import { Navigate } from "react-router-dom";
import $ from 'jquery';
import { connect } from "react-redux";
import uuid from 'react-uuid';
// import axios from "axios";
import { SuccessfulRegistrationModal } from "./gens/modals/successful";
import { fetchDids } from "./features/didsSlice";
import emailjs from "@emailjs/browser";


class ConfirmOrder extends React.Component {
    constructor(props) {
        super(props)    
        this.state = {
            customer_first_name: '',
            customer_last_name: '',
            business_name: '',
            email: '',
            work_address: '',
            NIN: '',
            password: '',
            // modal: '',
            // validated: false,
        }
    }

    componentDidMount() {
        $('body').removeClass('no-scroll');
        let dids = this.props.dids
        if (!dids) {
            this.props.fetchDids()
        }
    }    
    
    handleSubmit = () => {    
        // Get selected number/did
        let selected_number
        let did = this.props.dids[this.props.selected]
        if (did)
            selected_number = did.number 
        else
            selected_number = window.sessionStorage.getItem('number')

        window.sessionStorage.setItem('number', selected_number)
        window.sessionStorage.setItem('reseller_id', uuid())
        window.sessionStorage.setItem('telephone', selected_number)
        window.sessionStorage.setItem('password', this.state.password)
        window.sessionStorage.setItem('email', this.state.email)
        window.sessionStorage.setItem('first_name', this.state.customer_first_name)
        window.sessionStorage.setItem('last_name', this.state.customer_last_name)
        window.sessionStorage.setItem('country_id', '141')
        window.sessionStorage.setItem('company_name', this.state.business_name)
        window.sessionStorage.setItem('nin_number', this.state.NIN)
        window.sessionStorage.setItem('work_address', this.state.work_address)
        window.sessionStorage.setItem('currency_id', '96')

        // Check if extra extensions were ordered. if so, ask for payment.
        if (this.props.wanted) {
            // Get paystackPop function which was stored in the windows object (check index.html)    
            const PaystackPop = window.customLib['PaystackPop']
            let handler = PaystackPop.setup({
                // key: 'pk_test_e7c9e314a1fedde2334df88d284253b5dd17e059',
                key: 'pk_live_c15fc0bb4c1a79798e557c2d6fef094d51747766',
                email: this.state.email,
                amount: this.props.price * 100, // Multiply price by 100 (Paystack's spec)
                ref: ''+this.state.customer_first_name+uuid(), // Randomly generate transaction reference
                onClose: function(){
                    alert('Payment cancelled')
                },
                callback: function(response){
                    $('#custom-spinner').removeClass('hidden');    
                    emailjs.send('service_2vz2hia', 'template_kqbi5sk', {
                        'first_name': window.sessionStorage.getItem('first_name'),
                        'last_name': window.sessionStorage.getItem('last_name'),
                        'to_email': window.sessionStorage.getItem('email'),
                        'business_name': window.sessionStorage.getItem('company_name'),
                        'customer_email': window.sessionStorage.getItem('email'),
                        'work_address': window.sessionStorage.getItem('work_address'),
                        'nin_number': window.sessionStorage.getItem('nin_number'),
                        'did_number': window.sessionStorage.getItem('number'),
                    }, 'WML2gPuBmqlxtpTrd')
                    .then(res => {
                        // Set an Item to Keep track of the process. If VerifyOtp
                        // component doesn't find this item(vtv) in windows.sessionStorage, it redirects the user to the
                        // landing page
                        window.sessionStorage.setItem('vtv', 'true')   

                        emailjs.send('service_2vz2hia', 'template_7gbvt1q', {
                                'to_name': window.sessionStorage.getItem('first_name'),
                                'to_email': window.sessionStorage.getItem('email'),
                                'reply_to': window.sessionStorage.getItem('email'),
                            }, 'WML2gPuBmqlxtpTrd')
                        .then(res => {
                            // console.log(res)
                            // Keep track of process, if confirmOrder component(current component) doesn't find this
                            // item(_processing), it redirects users to pick a number
                            // alert('Email sent')
                            window.sessionStorage.removeItem('_processing')

                            // Redirect the user to the otp verification page with their selected number passed as
                            // a query string
                            // window.location.href = `http://localhost/VerifyOtp?didnumber=${selected_number}`
                            // window.location.href = `http://nativetalk.io/VerifyOtp?didnumber=${selected_number}`
                            $('#custom-spinner').addClass('hidden');    
                            window.sessionStorage.removeItem('_processing')
                            $('#successregwrapper').removeClass('hidden');
                            window.scrollTo(0, 0)
                            $('body').addClass('no-scroll');
                        })
                        .catch(err => {
                            console.log(err.response)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }});
            handler.openIframe();
        }
        else {
            // Set an Item to Keep track of the process. If VerifyOtp
            // component doesn't find this item(vtv) in windows.sessionStorage, it redirects the user to the
            // landing page
            $('#custom-spinner').removeClass('hidden');
            window.sessionStorage.setItem('vtv', 'true')

            emailjs.send('service_2vz2hia', 'template_kqbi5sk', {
                'first_name': window.sessionStorage.getItem('first_name'),
                'last_name':  window.sessionStorage.getItem('last_name'),
                'to_email': window.sessionStorage.getItem('email'),
                'business_name': window.sessionStorage.getItem('company_name'),
                'customer_email': window.sessionStorage.getItem('email'),
                'work_address': window.sessionStorage.getItem('work_address'),
                'nin_number': window.sessionStorage.getItem('nin_number'),
                'did_number': window.sessionStorage.getItem('number'),
                // 'did_number': '248249128',
            }, 'WML2gPuBmqlxtpTrd')
            .then(res => {
                emailjs.send('service_2vz2hia', 'template_7gbvt1q', {
                    'to_name': window.sessionStorage.getItem('first_name'),
                    'to_email': window.sessionStorage.getItem('email'),
                    'reply_to': window.sessionStorage.getItem('email'),
                }, 'WML2gPuBmqlxtpTrd')
                .then((res) => {
                    $('#custom-spinner').addClass('hidden');    
                    window.sessionStorage.removeItem('_processing')
                    $('#successregwrapper').removeClass('hidden');
                    window.scrollTo(0, 0)
                    $('body').addClass('no-scroll');
                })
                .catch(err => {
                    console.log(err)
                })
                // alert('Email sent')
                // Redirect the user to the otp verification page with their selected number passed as
                // a query string (not necessary since the number is currently in sessionStorage, but
                // just incase)
                // window.location.href = `http://localhost:3000/VerifyOtp?didnumber=${selected_number}`
                // window.location.href = `http://nativetalk.io/VerifyOtp?didnumber=${selected_number}`
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        // if (this.state.modal === 'success')
        //     return <Navigate to='/PaymentSuccess'/>
        if (!window.sessionStorage.getItem('_processing'))
            return <Navigate to='/ReserveNumber'/>
        
        return (
                <div className="text-center pt-5 position-relative">
                    <ScrollToTopOnMount />
                    <div className="position-absolute mt-60px mr-7vw end-0">
                        <Steps num="3" den='3' />    
                    </div>
                    <section className="d-flex flex-column gen-bg-color align-items-center pb-200px">
                        <h1 className="fw-700 pt-1 pb-5 position-relative" style={{'top': '70px'}}>Confirm your order</h1>    
                        <Container className="px-5 py-1">
                            <Row>
                                <Col lg={6}>
                                    <form className="mt-5 text-start fs-sm" 
                                    onSubmit={(e) => {e.preventDefault(); this.handleSubmit(e)}}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>First name</Form.Label>
                                            <input type="text" className='form-control fs-sm py-2' placeholder="whoami" 
                                            onChange={(e) => this.setState({customer_first_name: e.target.value})} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Last name</Form.Label>
                                            <input type="text" className='form-control fs-sm py-2' placeholder="iamwho" 
                                            onChange={(e) => this.setState({customer_last_name: e.target.value})} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Business name</Form.Label>
                                            <Form.Control type="text" placeholder="whoamiltd" className="fs-sm py-2"
                                            onChange={(e) => this.setState({business_name: e.target.value})} required/>    
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="whoami123@gmail.com"
                                            className="fs-sm py-2" onChange={(e) => this.setState({email: e.target.value})} required/>    
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Work Address</Form.Label>
                                            <Form.Control type="text" placeholder="42 Tech Street, Lekki" 
                                            className="fs-sm py-2" onChange={(e) => this.setState({work_address: e.target.value})} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>NIN Number</Form.Label>
                                            <Form.Control type="number" placeholder="234568798987654" className="fs-sm py-2" 
                                            onChange={(e) => this.setState({NIN: e.target.value})} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>    
                                            <InputGroup >
                                                <Form.Control className="bg-white fs-sm py-2" type="password" 
                                                onChange={(e) => this.setState({password: e.target.value})} placeholder='****************' style={{'borderRight': '0px'}}/>
                                                <InputGroup.Text className="bg-white text-primary pointer-cursor" onClick={(e) => {
                                                    if (e.target.previousSibling.getAttribute('type') === 'password') {
                                                        e.target.previousSibling.setAttribute('type', 'text')
                                                        e.target.innerHTML = 'hide'
                                                    }
                                                    else {
                                                        e.target.previousSibling.setAttribute('type', 'password')
                                                        (e.target.innerHTML = 'show')
                                                    }
                                                }}>show</InputGroup.Text>
                                            </InputGroup>
                                        </Form.Group>
                                        {(() => {    
                                                let did = (this.props.dids[this.props.selected])
                                                let did_number = ''
                                                if (did) did_number = did.number   
                                                else did_number = window.sessionStorage.getItem('number')
                                                return (
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Selected DID Number</Form.Label>
                                                        <Form.Control value={did_number}  className="fs-sm py-2" 
                                                            disabled/>
                                                    </Form.Group>
                                                )
                                            })()}
                                        <Button type='submit' className='green-btn btn-success mt-5 w-100'>Continue</Button>
                                    </form>
                                </Col>
                                <Col className="z-5 position-relative p-5 mt-3" lg={6}>
                                    <CheckoutForm header="ORDER SUMMARY"/>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <div className="position-absolute w-100 t-7vh hidden" id="successregwrapper">
                        <SuccessfulRegistrationModal />
                    </div>
                    <div class="spinner-border position-fixed custom-spinner hidden text-success" role="status"
                    id='custom-spinner'>
                        <span class="sr-only"></span>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        price: state.usersAmount.price,
        amount: state.usersAmount.value,
        wanted: state.usersAmount.wanted,
        dids: state.dids.dids,
        selected: state.dids.selected,
        // processed: state.usersAmount.processed,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        fetchDids: () => dispatch(fetchDids()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder); // , mapDispatchToProps