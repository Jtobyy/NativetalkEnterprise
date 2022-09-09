// importing bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// importing custom components
import Steps from "./gens/steps";
import Faq from "./gens/faq";
import ScrollToTopOnMount from "./gens/scrollToTop";

// importing other components
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { didSelected, fetchDids, selectAllDids } from "./features/didsSlice";

// importing images
import call_icon from './styles/images/call_icon.png';


export default function ReserveNumber() {
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
    }, [didsStatus, dispatch, dids, errorMessage])
        
    return (
        <div className="text-center pt-5 position-relative">
            <ScrollToTopOnMount />
            <div className="position-absolute mt-60px mr-7vw end-0">
                <Steps num="2" den='3' />    
            </div>
            <section className="d-flex flex-column gen-bg-color align-items-center pb-200px">
                <h1 className="fw-700 pt-1 pb-5 position-relative" style={{'top': '70px'}}>Reserve a number</h1>    
                <p className="mt-4 text-muted">Pick a number from the dropdown below</p>
                <Form style={{'width': '40vw'}} className="mb-2 reserve-num-form-wrapper">
                    <Form.Group className="reserve-num-form mt-5 mx-auto">
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
                    </Form.Group>    
                    <Link to='/ConfirmOrder'>
                        <Button onClick={() => {
                                sessionStorage.setItem('number', (dids[selectedDid]).number);
                                sessionStorage.setItem('_processing', 'true');
                            }}  className="green-btn btn-success mt-5" type="submit">Continue</Button>
                    </Link>
                </Form>
            </section>
            <div className="mt-300px mb-5">
                <Faq />
                <Link to="/"><Button className='green-btn btn-success my-5'>See all FAQs</Button></Link>
            </div>
        </div>
    )
}