import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class VerifyOtp extends React.Component {
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
        this.setState({number: url.searchParams.get('didnumber') || sessionStorage.getItem('number')})
    }
        
    verifyOtp = () => {
        axios.post('https://nativetalk-api-proxy.herokuapp.com/api/signup/verify_otp/', {
            "number": this.state.number,
            "otp": this.state.otp,
            "last_id" : sessionStorage.getItem('last_id'),
            "apns_token" : "",
            "callkit_token":"",
            "mobile_type" : "",
            "deviceId": "",
        })
        .then(res => {
            console.log(res)
            window.sessionStorage.removeItem('vtv')
            window.sessionStorage.setItem('otp_token', res.data.token)
            // window.location.href = `http://localhost:3000/otpverified?username=${this.state.number}`
            window.location.href = `http://nativetalk.io/otpverified?username=${this.state.number}`
        })
        .catch(err => {
            alert('otp expired')    
            console.log(err.response)
        })
    }

    resendOtp = () => {
        axios.post('https://nativetalk-api-proxy.herokuapp.com/api/signup/resend_otp/', {    
            "number": this.state.number,
            "action": "resend_otp",
            "last_id": sessionStorage.getItem('last_id'),
        })
    }

    render() {
        if (!window.sessionStorage.getItem('vtv'))
            return <Navigate to='/' />
        return (
            <div className='mt-5 pt-5 text-center' style={{'min-height': '80vh'}}>
                <Form className='mt-5 gen-bg-color w-50 mx-auto p-5 rounded border'
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
