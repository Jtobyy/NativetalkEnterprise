import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

class VerifyOtp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            number: '',
            // verify_success: false
        }
    }
    
    componentDidMount() {
        let url = new URL(window.location.href);
        this.setState({number: url.searchParams.get('didnumber') || window.sessionStorage.getItem('number')})
    }
        
    verifyOtp = () => {
        axios.post('https://nativetalk-api-proxy.herokuapp.com/api/signup/verify_otp/', {
            "number": this.state.number,
            "otp": this.state.otp,
            "last_id" : window.sessionStorage.getItem('last_id'),
            "apns_token" : "",
            "callkit_token":"",
            "mobile_type" : "",
            "deviceId": "",
        })
        .then(res => {
            alert('verification successful')
            axios.post('https://nativetalk-api-proxy.herokuapp.com/api/login/', {    
                "username": this.state.number,
                "password": window.sessionStorage.getItem('password'),
                "device_id": "e8941c8cb79f4d35",
                "mobile_type": "Android", 
                "callkit_token": "UVZUNW0rSFc2YjQ5U0FGZml6WGlBQT09"
            })
            .then(res => {
                sessionStorage.setItem('login_url', res.data.redirect_url)    
                axios.post('https://dashboard.nativetalk.com.ng/api/dids/', {
                    "accountid": res.data.id,
                    "action": "purchase",
                    "did_id": "26",
                    "did_number": "9087447785",
                    "id": res.data.id,
                    "token": res.data.token
                })
                .then( res => {
                    window.sessionStorage.removeItem('vtv');
                    window.location.href = sessionStorage.getItem('login_url');
                })
            })
            .catch(err => {
                console.log(err);
            })
            // window.location.href = `http://localhost:3000/otpverified?username=${this.state.number}`
            // window.location.href = `http://nativetalk.io/otpverified?username=${this.state.number}`
        })
        .catch(err => {
            alert('otp expired');
            console.log(err.response);
        })
    }

    resendOtp = () => {
        console.log(this.state.number)    
        axios.post('https://nativetalk-api-proxy.herokuapp.com/api/signup/resend_otp/', {    
            "number": this.state.number,
            "action": "resend_otp",
            "last_id": window.sessionStorage.getItem('last_id'),
        })
        .then(res => {
            console.log(this.state.number)    
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if (!window.sessionStorage.getItem('vtv'))
            return <Navigate to='/' />
        return (
            <div className='verify-otp-form-wrapper text-center' style={{'min-height': '80vh'}}>
                <Form className='mt-5 gen-bg-color mx-auto p-5 rounded border verify-otp-form'
                onSubmit={(e) => {e.preventDefault(); this.verifyOtp()}}>
                    <Form.Group>
                        <Form.Label className='lh-30px'>
                            An OTP has been sent to your email <br/>
                            Kindly check your email and input the otp number. {//<br/>If you}
                            // haven't received it yet, kindly wait for 5minutes.
                        }
                        </Form.Label>
                        <Form.Control type='text' className='w-50 mx-auto m-4' 
                        onChange={(e) => this.setState({otp: e.target.value})} required/>
                    </Form.Group>
                    <Button type='submit' className='green-btn btn-success'>Submit</Button>
                </Form>
                <Button onClick={this.resendOtp} className='mt-100px mx-5 green-btn btn-success'>Resend Otp</Button>
            </div>    
        )
    }
}


const mapStateToProps = state => {
    return {
        dids: state.dids.dids,
        selected: state.dids.selected,
        // processed: state.usersAmount.processed,
    };
  };

export default connect(mapStateToProps)(VerifyOtp); // , mapDispatchToProps