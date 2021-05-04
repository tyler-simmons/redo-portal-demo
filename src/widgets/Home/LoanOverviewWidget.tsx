/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import {Row, Col, Spinner, Modal, Form, Collapse, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCheckCircle, faTimesCircle, faBuilding, faCar, faUser, faPlus, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {useForm} from 'react-hook-form';

import {ModuleCard, Button} from 'app/components';
import {Theme} from 'app/contexts';
import { db, auth, getAccounts, getPayments, searchAccount, linkAccount } from "app/data";

const OverviewText = styled.p`
	font-size: 1.2rem;
	text-align: left;
`;

const BigOverviewText = styled.p`
	font-size: 1.4rem;
	text-align: left;
`;

const SmallOverviewText = styled.p`
	font-size: 1rem;
	text-align: left;
`;

const LargeInlineText = styled.span`
	font-size: 2.5rem;
	text-align: left;

`;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    margin-right: 0.5rem;
    color: ${(props) => props.color};
    text-align: center;
`;


const StyledSpinner = styled(Spinner)`
	width: 4rem;
	height: 4rem;
	margin: auto;
	color: ${(props) => props.color};
`;

const AccountArea = styled.div`
	text-align: center;
`;

const StyledSelect = styled.select`
	font-size: 1.1rem;

	font-weight: 600;
	&:hover {
		cursor: pointer;
	}
	&:after {
		font-weight: bold;
	}
`;

const Expand = styled.div`
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const CModalHeader = styled(Modal.Header)`
    background-color: ${props => props.color ? props.color : props.theme.colors.secondary};
    color: #fff;
`;

const FormCardHeader = styled.div`
    background-color: ${props => props.color ? props.color : props.theme.colors.secondary};
    display: flex;
    flex-direction: row;
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
export const LoanOverviewWidget = ({
	updateAccount,
}: {
	updateAccount: any;
}) => {
	const [accounts, setAccounts] = useState<any[]>([]);
	const [dispAcc, setDispAcc] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentAccount, setCurrentAccount] = useState<any>({});
    const theme = useContext(Theme.Context);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    
    const [load, setLoad] = useState(false);
    const [msg, setMsg] = useState({
        show: false,
        variant: 'danger',
        msg: 'Unable to locate account'
    });
    const [stageAcc, setStageAcc] = useState<any>();

    const {register, handleSubmit} = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	const loadAccounts = async () => {
		setLoading(true);
        let tempAccounts = await getAccounts(auth.currentUser?.email ?? '');
        
        console.log('tempacc', tempAccounts);

        setAccounts(tempAccounts);
        setLoading(false);
    };

	useEffect(() => {
        console.log(auth.currentUser);
		loadAccounts();
	}, []);

	useEffect(() => {
		setCurrentAccount(accounts[dispAcc]);
		updateAccount && updateAccount(accounts[dispAcc]);
	}, [dispAcc, accounts]);

    const onSubmit = async (data: any) => {
        setLoad(true);
        let ac = await searchAccount(data.accountNumber, data.zipCode);

        setLoad(false);
        
        if (!ac) {
            setMsg({
                show: true,
                variant: 'danger',
                msg: 'Unable to locate account'
            })
        } else {
            setMsg({
                show: true,
                variant: 'success',
                msg: 'Account located successfully'
            });

            setStageAcc(ac);
        }

        console.log('search query', ac);
    }

    const processLink = async () => {
        let num = stageAcc.AccountNumber;
        await linkAccount(auth.currentUser?.email ?? '', num);
        await loadAccounts();
        setDispAcc(stageAcc);
        handleClose();
    }
	

	return (
        <Row>

            <Modal show={show} onHide={handleClose} size='lg'>
                <CModalHeader>
                    <Modal.Title>Add a Loan</Modal.Title>
                </CModalHeader>
                <Modal.Body>

                    {stageAcc 
                    ? (
                        <div>
                            <h3 className="mb-4">Confirm Loan Details</h3>
                            <Row>
                                <Col><span>Account Number:</span></Col>
                                <Col><span className="font-weight-bold">{stageAcc?.AccountNumber}</span></Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col><span>Borrowers:</span></Col>
                                <Col><span className="font-weight-bold">{stageAcc?.Borrower} (primary) | {stageAcc?.Cosigner && <span>{stageAcc?.Cosigner} (Co-Borrower)</span>}</span></Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col><span>Type:</span></Col>
                                <Col><span className="font-weight-bold">{stageAcc?.LoanType}</span></Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col><span>Loan Amount:</span></Col>
                                <Col><span className="font-weight-bold">${stageAcc?.OriginalLoanAmount.toLocaleString("en-US")}</span></Col>
                            </Row>
                            
                            <div className="d-flex flex-row justify-content-center mt-4">
                                    <Button shape="pill" colors={{ font: "#fff", background: "#6c757d" }} className="mr-2" onClick={handleClose}>Cancel</Button>
                                    <Button shape="pill" onClick={processLink}>
                                        <span className="mr-2">Confirm</span>
                                        {load && <Spinner animation="border" size="sm" />}
                                    </Button>
                            </div>

                        </div>
                    )
                    : (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                                {msg.show && <Alert variant={msg.variant}>{msg.msg}</Alert> }

                                <Form.Group>
                                    <Form.Label >Loan Number</Form.Label>
                                    <Form.Control placeholder='Account Number' {...register('accountNumber')}></Form.Control>
                                    <Form.Text>The account number of your loan or credit account</Form.Text>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label >Zip Code</Form.Label>
                                    <Form.Control placeholder='Zip Code' {...register('zipCode')}></Form.Control>
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
                                                onClick={(e) => {e.preventDefault(); setOpen(!open)}}>terms and conditions <FontAwesomeIcon icon={faCaretDown}/>
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
                                    <Button shape="pill" colors={{ font: "#fff", background: "#6c757d" }} className="mr-2" onClick={handleClose}>Cancel</Button>
                                    <Button shape="pill">
                                        <span className="mr-2">Submit</span>
                                        {load && <Spinner animation="border" size="sm" />}
                                    </Button>
                                </div>
                            </Form>
                    )}
                    
                </Modal.Body>
                
            </Modal>
            <Col sm={24} md={24} lg={24} xl={12} className="mb-sm-4"> 
                <ModuleCard accent={theme.primary} className="d-flex flex-column justify-content-start">
                    <div className="d-flex justify-content-between">
                        <h3 className="d-block">My Loans</h3>
                        <Button shape="pill" outline onClick={handleShow} >Add Loan</Button>
                    </div>
                    
                    {loading ? (
                        <StyledSpinner animation="border" color={theme.primary} />
                    ) : (
                        <React.Fragment>
                            <Row>
                                <Col >
                                    <div className="form-group mt-3 mb-3">
                                        
                                        <StyledSelect
                                            className="form-control"
                                            value={dispAcc}
                                            onChange={(e: any) => {
                                                console.log(typeof e.target.value);
                                                setDispAcc(parseInt(e.target.value));
                                            }}
                                        >
                                            {accounts.map((acc, idx) => (
                                                <option key={idx} value={idx}>
                                                    #{acc.AccountNumber}
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </div>
                                </Col>
                                <Col className="d-flex flex-column justify-content-center" >
                                    <OverviewText className="mb-0">
                                        {currentAccount?.LoanType === "Auto" ? (
                                            <StyledIcon color={theme.primary} icon={faCar}/>
                                        ) : currentAccount?.LoanType === "Commercial" ? (
                                            <StyledIcon color={theme.primary} icon={faBuilding} />
                                        ) : currentAccount?.LoanType === "Personal" ? (
                                            <StyledIcon color={theme.primary} icon={faUser} />
                                        ) : (
                                            <StyledIcon color={theme.primary} icon={faUser} />
                                        )}
                                        Type:
                                        <strong> {currentAccount?.LoanType}</strong>
                                    </OverviewText>
                                </Col>
                                {/* <Col >
                                        <Button shape="pill" className="mt-3">Add Loan</Button>
                                        
                                </Col> */}

                            </Row>

                            {accounts.length !== 0 && (
                                <React.Fragment>
                                    <Row className="mb-3">
                                        <Col>
                                            <OverviewText className="mb-1">
                                                Borrower:{" "}
                                                <strong>
                                                    {currentAccount?.Borrower}
                                                </strong>
                                            </OverviewText>
                                            <OverviewText className="mb-1">
                                                Co-Borrower:{" "}
                                                <strong>
                                                    {currentAccount?.Cosigner}
                                                </strong>
                                            </OverviewText>
                                        </Col>
                                        <Col>
                                        
                                        
                                        </Col>
                                    </Row>
                                    
                                    <Expand>
                                    <ShadedBg>
                                        <Row>
                                            <Col>
                                                <OverviewText>
                                                    <span className="d-block">Next Payment Amount:</span>
                                                    <LargeInlineText>
                                                        <strong className="mr-3">
                                                            {" "}
                                                            ${currentAccount?.PaymentAmount}
                                                        </strong>
                                                        <OverviewText>
                                                            Due on:
                                                            <strong> {currentAccount?.DueDate}</strong>
                                                        </OverviewText>
                                                    </LargeInlineText>
                                                </OverviewText>
                                            </Col>
                                            <Col>
                                                
                                                    {currentAccount?.AutoPayEnabled ? (
                                                        <OverviewText className="mt-2">
                                                            <React.Fragment>
                                                                <StyledIcon
                                                                    color={"#4bb563"}
                                                                    icon={faCheckCircle}
                                                                />
                                                                AutoPay: <strong>ON</strong>
                                                                <SmallOverviewText className="mt-2">
                                                                    {/* Next Payment:{' '}
                                                                <strong>{currentAccount.DueDate}</strong> */}
                                                                    The amount shown above will be debited from your
                                                                    account on the due date
                                                                </SmallOverviewText>
                                                            </React.Fragment>
                                                        </OverviewText>
                                                    ) : (
                                                        <React.Fragment>
                                                            {/* <StyledIcon
                                                                color={"#c82333"}
                                                                icon={faTimesCircle}
                                                            />
                                                            AutoPay: <strong>OFF</strong> */}
                                                            <div className="h-100 d-flex flex-column justify-content-around align-items-center py-3">
                                                                <Button shape="pill">Turn On AutoPay</Button>
                                                                <Button shape="pill" colors={{background: '#4bb563', font: '#fff'}}>Make a Payment</Button>
                                                            </div>
                                                        </React.Fragment>
                                                    )}
                                                
                                            </Col>
                                        </Row>
                                        
                                    </ShadedBg>
                                    </Expand>

                                    
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                </ModuleCard>
            </Col>
            <Col sm={24} md={24} lg={24} xl={12} className="mb-sm-4">
                <ModuleCard accent={theme.primary}>
                    <h3>Details</h3>

                    <Row className="my-3">
                        <Col>
                            <OverviewText className="mb-1">
                            Interest Rate:{" "}
                            <AprLabel color='#eee'>
                            {currentAccount?.InterestRate}% APR
                            </AprLabel>
                            </OverviewText>  
                        </Col>
                        <Col>
                            <OverviewText className="mb-1">
                            Type:{" "}
                            <strong>{currentAccount?.RateType}</strong>
                            </OverviewText> 
                        </Col>
                    </Row>

                    <hr className="my-0"></hr>

                    <Row className="mb-3">
                        <Col>
                        <OverviewText className="mb-1">
                            Loan Status:{" "}
                            <strong>{currentAccount?.LoanStatus}</strong>
                            </OverviewText> 
                        </Col>
                        
                    </Row>
                    <hr className="my-0"></hr>
                    <Row className="mb-3">
                        <Col>
                            <OverviewText className="mb-1">
                            Last Payment:{" "}
                            <strong>${currentAccount?.PaymentAmount}</strong>
                            </OverviewText> 
                        </Col>
                        <Col>
                            <OverviewText className="mb-1">
                            Received:{" "}
                            <strong>
                            {currentAccount?.LastPaymentReceived}
                            </strong>
                            
                            
                            </OverviewText>  
                        </Col>
                    </Row>
                    <ShadedBg>
                    <Row className="mb-3">
                        <Col>
                        <BigOverviewText className="mb-0">
                            Payoff Amount:{" "}
                            
                            </BigOverviewText>
                            <LargeInlineText><strong>${currentAccount?.PayoffAmount?.toLocaleString("en-US")}</strong></LargeInlineText>
                        </Col>
                        <Col>
                        <small>Payoff amount effective: <strong>{new Date().toDateString()}</strong>.<br></br>Payoff amounts are good for (10) business days following the effective date.</small>
                        </Col>
                        
                    </Row>
                    </ShadedBg>
                    

                    {/* <Row className="mt-4">
                        <Col>
                          <Button shape="pill" colors={{background: theme.primary, font: '#fff'}} outline>Full Details</Button>
                        </Col>
                        <Col>
                          <Button shape="pill" colors={{background: '#4bb563', font: '#fff'}}>Make a Payment</Button>
                        </Col>
                    </Row> */}

                </ModuleCard>
            </Col>
        </Row>
		
	);
};

const Terms = () => {
	return (
		<React.Fragment>
			<p>You agree that by accessing this Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately. <a href='#' target="_blank" rel="noopener noreferrer">View Full Terms and Conditions</a></p>
		</React.Fragment>
		
	)
}

interface ColorOverrideProp {
    color?: string;
}

const AprLabel = styled.span<ColorOverrideProp>`
    background-color: ${props => props.color ? props.color : props.theme.colors.primary};
    border-radius: 1rem;
    padding: 0.5rem 0.75rem;
    
    font-weight: 600;
`

const ShadedBg = styled.div`
	background-color: #eee;
	padding: 0.35rem 1rem;
	border-radius: 0.25rem;
`;