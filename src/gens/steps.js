import step1Border from '../styles/images/step-1-border.png';
import step2Border from '../styles/images/step-2-border.png';
import step3Border from '../styles/images/step-3-border.png';

export default function Steps(props) {    
    return (
        <div className='steps-container p-2 fw-800 faded-text position-relative'>
            <span className="green-text">{props.num}</span>
            {(() => {
                if (props.num === '3') return <span className='green-text'>/{props.den}</span> 
                else return <span>/{props.den}</span>
            })()}
            {(() => {
                if (props.num === '1') return <img className='step-border position-absolute' src={step1Border} 
                width='30px' alt='' />
                else if (props.num === '2') return <img className='step-border position-absolute' src={step2Border}
                width='28px' alt='' />
                else if (props.num === '3') return <img className='step-border position-absolute' src={step3Border}
                width='50px' alt='' />
            })()}
        </div>
    )
}