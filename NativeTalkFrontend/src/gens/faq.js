import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Faq() {
    return (
        <Container className="faqs pe-5 ">
            <Row >
                <Col className='text-md-start ' md={6} >
                    <h1 className="fw-700 mb-5 lh-60px">Frequently Asked Questions</h1>
                </Col> 
                <Col md={6}>
                    <Accordion className="lh-30px" defaultActiveKey="0" style={{'textAlign': 'left'}} flush>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header>
                                What is a virtual phone system
                            </Accordion.Header>
                            <Accordion.Body >
                                A virtual phone system, also known as VOIP (voice over internet protocol),
                                is a cloud-based phone system that allows you to make and receive calls
                                on your phone, laptop and any VoIP device. It allows you to get the
                                benefits of your current phone number -make and receive calls - and
                                smart features you don’t get with traditional phone service providers like
                                call hunting, IVR, call queuing, Voicemail to text transcription and more
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header >How does NativeTalk work</Accordion.Header>
                            <Accordion.Body>
                                NativeTalk helps businesses set up a cloud-based private phone system, also known
                                as private branch exchange (PBX), for internal and external communications. It is
                                hosted and powered through the internet instead of the traditional PBX
                                that requires expensive hardware and technical specialists. NativeTalk’s CloudPBX is
                                affordable, easy to use and can scale with your business. 
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>How does NativeTalk help businesses</Accordion.Header>
                            <Accordion.Body>
                                NativeTalk makes it easy for businesses to experience more than the limited
                                features of traditional phone numbers.
                                <li>Separate your business and personal calls</li>
                                <li> Make missed calls and unreachable numbers old news.</li>
                                <li>Enhance your personal brand with customised numbers and business lines that are hard to forget.</li>
                                <li>Save labour costs with our virtual receptionists and provide self-service options
                                to your customers.</li>
                                <li>And access more exciting features </li>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Can I get international numbers on NativeTalk</Accordion.Header>
                            <Accordion.Body>
                                NativeTalk helps businesses set up a cloud-based private phone system, also known
                                as private branch exchange (PBX), for internal and external communications. It is
                                hosted and powered through the internet instead of the traditional PBX
                                that requires expensive hardware and technical specialists. NativeTalk’s CloudPBX is
                                affordable, easy to use and can scale with your business. 
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>How much does it cost to use NativeTalk</Accordion.Header>
                            <Accordion.Body>
                                NativeTalk has a free account option that is free forever for two users. All you have 
                                to do is top-up airtime for your calls (at cheaper rates 😍). Add more users and
                                phone extensions at NX. See our simple and transparent pricing here.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}
