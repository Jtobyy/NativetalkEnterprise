//
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// importing custom components
import { decrement, increment, setWantedTrue, 
    selectAmount, selectPrice, selectWanted } from '../../features/usersAmountSlice';

// other components
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Navigate } from 'react-router-dom';

// importing image files
import fadedBlueCircle from '../../styles/images/faded-blue-circle.png';
import fadedBluePolygon from '../../styles/images/faded-blue-polygon.png';
import addbtn from '../../styles/images/add.png';
import subtractbtn from '../../styles/images/subtract.png';


export default function StandardModal() {
    const usersAmount = useSelector(selectAmount);
    const price = useSelector(selectPrice);
    const wanted = useSelector(selectWanted);

    const dispatch = useDispatch();
    //const [incrementAmount, setIncrementAmount] = useState('2');
    if (wanted)
        return <Navigate to='/ReserveNumber'/>

    return (
        <Card className="mx-auto standard-card">
            <Card.Header as='h4' className='p-3 fw-700 blue-bg-color text-white position-relative'>
                <img src={fadedBlueCircle} className="position-absolute top-0" 
                width='30px' style={{'left': '30px'}} alt=""/>
                    Choose no of users <span className='position-absolute end-0'
                    style={{'margin-right': '20px', 'cursor': 'pointer', 'color': 'rgba(255, 255, 255, .5)'}} id='close-standard'
                    onClick={() => {window.location.reload()}}>X</span>
                <img src={fadedBluePolygon} className="position-absolute bottom-0 
                mb--2px start-0"
                width='25px' alt=""/>
            </Card.Header>
            <Card.Body className='pl-50px pt-4 mt-2 text-center' style={{'textAlign':'left'}}>
                <Card.Title className='fw-1000 display-4 pb-4' style={{'borderBottom': '1px solid #D6D6D6'}}><sup className='h5 fw-1000' style={{'top': '-30px', 'right': '3px'}}>
                    ₦</sup>
                    <NumberFormat value={price}
                        displayType={'text'} thousandSeparator={true} />
                    <span className='h5 fw-1000'>/mo/ext</span>
                </Card.Title>
                <Card.Text className='mt-4 ml--30px pt-2 '>
                    <p className>Add more users</p>
                </Card.Text>
            </Card.Body>
            <Card.Footer className='bt-0 bg-transparent pb-5'>
                <div className='d-flex align-items-center justify-content-center bt-0 mt--10px p-0'>
                    <img className='control-btn' src={subtractbtn} width='45px'
                    onClick={() => dispatch(decrement())} alt="" />
                    <div className='fw-800 mx-3 w-25 p-1 br-10px' style={{'width': '150px', 'backgroundColor': 'rgb(247,247,247)'}}> 
                        {usersAmount}
                    </div>
                    <img className='control-btn' src={addbtn} width='45px'
                    onClick={() => dispatch(increment())}alt="" />
                </div>
                <Button className="mx-auto mt-5 text-white green-btn btn-success w-50" 
                onClick={() => {window.sessionStorage.setItem('_processed', 'true');
                dispatch(setWantedTrue())}}>Buy Now</Button>
            </Card.Footer>
        </Card>
    )
}