import logo from '../styles/images/logo.png';
import Facebook from '../styles/images/facebook.png';
import Twitter from '../styles/images/twitter.png';
import Instagram from '../styles/images/instagram.png';


export default function footer() {
    return (
        <footer className='d-flex flex-column align-items-center faded-green-bg py-5'>
            <div className="d-flex mt-4 pt-2 w-100 justify-content-center align-items-center">
                <hr className="footer-line mx-5" />
                <img src={logo} 
                height='30'
                alt="" />
                <hr className="footer-line mx-5"/>
            </div>
            <div className=" d-flex mt-3 justify-content-between"
            style={{'width': '100px'}}>
                <img src={Facebook} alt="" className="media-icon"/>
                <img src={Twitter} alt="" className="media-icon"/>
                <img src={Instagram} alt="" className="media-icon"/>
            </div>
            <p className="text-muted mt-5" style={{'fontSize': 'small'}}>&copy;2022 Tech4mation Ltd.</p>
        </footer>
    )
}