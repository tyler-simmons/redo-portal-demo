/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import {Row, Col, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCheckCircle, faTimesCircle, faBuilding, faCar, faUser} from '@fortawesome/free-solid-svg-icons';

import {ModuleCard, Button} from 'app/components';
import {Theme} from 'app/contexts';
import { db } from "app/data";

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

	const getAccounts = async () => {
		setLoading(true);
		let tempAccounts: any[] = [];
        

		db.collection("loanAccounts")
			.get()
			// @ts-ignore
			.then((docs) => {
				// @ts-ignore
				docs.forEach((acc) => {
					tempAccounts.push(acc.data());
				});
				setAccounts(tempAccounts);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getAccounts();
	}, []);

	useEffect(() => {
		setCurrentAccount(accounts[dispAcc]);
		updateAccount && updateAccount(accounts[dispAcc]);
	}, [dispAcc, accounts]);

	

	return (
        <Row>
            <Col sm={24} md={24} lg={24} xl={12} className="mb-sm-4"> 
                <ModuleCard accent={theme.primary} className="d-flex flex-column justify-content-start">
                    <h3>My Loans</h3>
                    {loading ? (
                        <StyledSpinner animation="border" color={theme.primary} />
                    ) : (
                        <React.Fragment>
                            <Row>
                                <Col>
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
                                                    Loan: {acc.AccountNumber}
                                                </option>
                                            ))}
                                        </StyledSelect>
                                    </div>
                                </Col>
                                <Col className="d-flex flex-column justify-content-center">
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
                            </Row>

                            {accounts.length !== 0 && (
                                <React.Fragment>
                                    <Row>
                                        <Col>
                                            <OverviewText className="mb-1">
                                                Borrower:{" "}
                                                <strong>
                                                    {currentAccount?.Borrower}
                                                </strong>
                                            </OverviewText>
                                            <OverviewText className="mb-1">
                                                Lender:{" "}
                                                <strong>
                                                    {currentAccount?.LenderName}
                                                </strong>
                                            </OverviewText>
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
                                                <OverviewText className="mt-2">
                                                    {currentAccount?.AutoPayEnabled ? (
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
                                                    ) : (
                                                        <React.Fragment>
                                                            <StyledIcon
                                                                color={"#c82333"}
                                                                icon={faTimesCircle}
                                                            />
                                                            AutoPay: <strong>OFF</strong>
                                                        </React.Fragment>
                                                    )}
                                                </OverviewText>
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
                    

                    <Row className="mt-4">
                        <Col>
                          <Button shape="pill" colors={{background: theme.primary, font: '#fff'}} outline>Full Details</Button>
                        </Col>
                        <Col>
                          <Button shape="pill" colors={{background: '#4bb563', font: '#fff'}}>Make a Payment</Button>
                        </Col>
                    </Row>

                </ModuleCard>
            </Col>
        </Row>
		
	);
};

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