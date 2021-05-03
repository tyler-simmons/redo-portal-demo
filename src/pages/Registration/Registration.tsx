import React,{useState, useContext} from 'react';
import styled from '@emotion/styled';
import {Form, Accordion, Card, Collapse, Row, Col} from 'react-bootstrap';
import {Switch, Route, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {Heading, SubHeading, Button} from 'app/components';
import {Theme} from 'app/contexts';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
    max-height: 100vh;
    overflow-x: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
    
`;

const HeaderContainer = styled.div`
	max-width: 100%;
	flex-basis: auto;
	flex-grow: 0;
`;
const MainContainer = styled.div`
	flex-basis: auto;
	flex-grow: 1;
	padding-top: 2.5rem;
    
    min-height: 100vh;
    
`;


const SubText = styled.p`
	margin-bottom: 0;
	color: grey;
	font-weight: 600;
	font-size: 1.3rem;
`;
const SmallSubText = styled(SubText)`
	font-size: 1rem;
`;

const RegisterContainer = styled(Form)`
    width: 55%;
    margin-left: auto;
    margin-right: auto;
`;



const FormCardHeader = styled.div`
    background-color: ${props => props.color ? props.color : props.theme.colors.secondary};
    display: flex;
    flex-direction: row;
`;
const HeaderNumberContainer = styled.div`
    background-color: ${props => props.color ? props.color : props.theme.colors.primary};
    flex-basis: auto;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    color: #fff;
`;
const HeaderTitleContainer = styled.div`
    flex-basis: auto;
    flex-grow: 2;
    padding: 0.5rem 1rem;
`;
const FormCardHeaderLabel = styled.h3`
    color: #fff;
    margin-bottom: 0;
`;

const CardForm = styled(Form)`
    padding-left: 1rem;
    padding-right: 1rem;
`;

const AccordionHeader = ({number, title, eventKey, ...rest}: {number: number, title: string, eventKey: string}) => {
    return (
        <Accordion.Toggle as={FormCardHeader} eventKey={eventKey} {...rest}>
            <HeaderNumberContainer>{number}</HeaderNumberContainer>
            <HeaderTitleContainer>
                <FormCardHeaderLabel>{title}</FormCardHeaderLabel>
            </HeaderTitleContainer>
        </Accordion.Toggle>
    )
}




export const Registration = () => {
    const theme = useContext(Theme.Context);
    const [activeKey, setActiveKey] = useState('validate');
    

    return (
        <Container>
            <HeaderContainer className="sticky-top">
				<img src="/header.png" alt="aws header" className="shadow"></img>
			</HeaderContainer>
            <MainContainer>
                
                {/* @ts-ignore */}
                <RegisterContainer>
                
                    <Accordion activeKey={activeKey} >
                        
                        
                            <Card>
                                <AccordionHeader number={1} title='Validate Account Information' eventKey='validate' />
                                <Accordion.Collapse eventKey="validate">
                                    <Card.Body>
                                        <RegisterForm updateEvent={setActiveKey}/>
                                    </Card.Body>
                                    
                                </Accordion.Collapse>
                            </Card>
                            
                            <Card>
                                <AccordionHeader number={2} title='Create a Profile' eventKey='profile' />
                                <Accordion.Collapse eventKey="profile">
                                    <Card.Body>
                                        <CreateProfile />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <AccordionHeader number={3} title='Complete Registration' eventKey='complete' />
                                <Accordion.Collapse eventKey="complete">
                                    <Card.Body>
                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                    
                    </Accordion>
                
                </RegisterContainer>
                
            </MainContainer>
        </Container>
    )
}

const RegisterForm = ({updateEvent}: any) => {
    
    const [open, setOpen] = useState(false);

    const next = (e: any) => {
        e.preventDefault();
        updateEvent('profile');
    }

    return (
        <CardForm>
            <SubHeading className="mb-3">Locate Your Account</SubHeading>
            
            <Form.Group>
                <Form.Label >Account Number</Form.Label>
                <Form.Control placeholder='Account Number'></Form.Control>
                <Form.Text>The account number of your loan or credit account</Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label >Zip Code</Form.Label>
                <Form.Control placeholder='Zip Code'></Form.Control>
                <Form.Text>Your 5 digit billing zip code</Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>
                        <span>By checking this box you agree to the Aqua Finance </span>
                        <button
				            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: '#007bff',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
				            aria-controls="terms-and-conditions"
				            aria-expanded={open}
                            onClick={(e) => {e.preventDefault(); setOpen(!open)}}
			>
				terms and conditions <FontAwesomeIcon icon={faCaretDown}/>
			</button>
			<Collapse in={open}>
				<div id="terms-and-conditions" className="text-dark">
					<Terms />
				</div>
			</Collapse>
                    </Form.Check.Label>
                </Form.Check>
            </Form.Group>
            
            <div className="d-flex flex-row justify-content-center">
                <Button shape="pill" colors={{ font: "#fff", background: "#6c757d" }} className="mr-2">Cancel</Button>
                <Button shape="pill" onClick={next}>Next</Button>
            </div>

            
        </CardForm>
                    
        
    )
}

const CreateProfile = () => {
    return (
        <CardForm>
            <SubHeading className="mb-3">Choose a Username and Password</SubHeading>

                <Form.Group>
                    <Form.Label >Username</Form.Label>
                    <Form.Control placeholder='Username'></Form.Control>
                </Form.Group>

                <Form.Row className="mb-3">
                    <Col >
                        <Form.Group>
                            <Form.Label >Password</Form.Label>
                            <Form.Control placeholder='Password'></Form.Control>
                        </Form.Group>
                    </Col>
                    {/* <Col sm={4}></Col> */}
                    <Col >
                        <Form.Group>
                            <Form.Label >Confirm Password</Form.Label>
                            <Form.Control placeholder='Confirm Password'></Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
            <SubHeading className="mb-3">Enter Your Contact Information</SubHeading>

            <Form.Row >
                    <Col >
                        <Form.Group>
                            <Form.Label >Email Address</Form.Label>
                            <Form.Control type='email' placeholder='user@mail.com'></Form.Control>
                        </Form.Group>
                    </Col>
                    {/* <Col sm={4}></Col> */}
                    <Col >
                        <Form.Group>
                            <Form.Label >Confirm Email Address</Form.Label>
                            <Form.Control type='email' placeholder='user@mail.com'></Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group className="mb-4">
                    <Form.Label >Phone Number (optional)</Form.Label>
                    <Form.Control type="tel" placeholder='123-456-3390'></Form.Control>
                </Form.Group>

            <div className="d-flex flex-row justify-content-center">
                {/* <Button shape="pill" colors={{ font: "#fff", background: "#6c757d" }} className="mr-2">Cancel</Button> */}
                <Button shape="pill" >Next</Button>
            </div>

            

        </CardForm>
    )
}

const Terms = () => {
	return (
		<React.Fragment>
			<p>You agree that by accessing this Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately. <a href='#' target="_blank" rel="noopener noreferrer">View Full Terms and Conditions</a></p>
		</React.Fragment>
		
	)
}

const ConfirmRegistration = () => {
    return (
        <div>
            <h1>Details</h1>
        </div>
    )
}