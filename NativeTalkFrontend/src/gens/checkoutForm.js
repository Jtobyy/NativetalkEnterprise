import NumberFormat from 'react-number-format';
import Form from 'react-bootstrap/Form';

// importing custom components
import { selectAmount, selectPrice, selectWanted } from '../features/usersAmountSlice';

// importing other components
import { useSelector } from 'react-redux';

// Display Checkout form details that is usually shown on almost every page except from the homepage
export default function CheckoutForm(props) {
    const amount = useSelector(selectAmount)
    const price = useSelector(selectPrice)
    const wanted = useSelector(selectWanted)

    return(
        <Form className='position-absolute end-0 checkout-form'>
            <div className='pt-3 pb-4 card fs-sm'>
                <div className='card-header bg-white bb-0 pb-0'>
                    <h5 className=' fw-700 text-start'>{props.header}</h5>        
                </div>    
                <div className='card-body px-3 pb-4  mx-1' style={{'borderBottom': 'solid 1px #D6D6D6'}}>
                    <div className='d-flex'>
                        <div className='me-auto'>Selected Plan</div>
                        <div>
                            { wanted ? `Standard Plan` : 'Starter Plan' }    
                        </div>
                    </div>
                    <div className='d-flex my-2'>
                        <div className='me-auto'>No Extensions</div>
                        {/* <div> { wanted ? `2 (Free) + ${amount}` : '2 (Free)' } </div> */}
                        <div> { wanted ? `${amount}` : '2 (Free)' } </div>
                    </div>
                </div>
                <div className='card-footer gen-bg-color px-2 mx-4 mt-3 bt-0'>
                    <div className='d-flex'>
                        <div className='me-auto fw-600 fs-1p3em'>Total</div>
                        <div className='fw-700 fs-1p3em'><NumberFormat value={ wanted ? price : 'free'}
                displayType={'text'} thousandSeparator={true} prefix={'₦'} /></div>
                    </div>
                </div>
            </div> 
        </Form>
    )    
}
