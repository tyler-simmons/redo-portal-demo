import { useState, useContext, useEffect } from "react";
import styled from '@emotion/styled';
import { Theme } from "app/contexts";
import { ModuleCard, Button} from "app/components";
import { Table, Row, Col } from "react-bootstrap";
import {db} from 'app/data';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCheckCircle, faTimesCircle, faBuilding, faCar, faUser} from '@fortawesome/free-solid-svg-icons';

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

const OverviewText = styled.p`
	font-size: 1.2rem;
	text-align: left;
`;
const SOverviewText = styled.p`
	font-size: 1rem;
	text-align: left;
    margin-bottom: 0;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    margin-right: 0.5rem;
    color: ${(props) => props.color};
    text-align: center;
`;

export const DocumentsWidget = () => {
	const theme = useContext(Theme.Context);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [docs, setDocs] = useState<any[]>([]);
	const [dispAcc, setDispAcc] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentAccount, setCurrentAccount] = useState<any>({});
    
    const getAccounts = async () => {
		setLoading(true);
		let tempAccounts: any[] = [];
        let tempDocs: any[] = [];
        
        let loanAccountDocs = await db.collection("loanAccounts").get();
        loanAccountDocs.forEach((doc) => {
            tempAccounts.push(doc.data());
        })

        let loanDocDocs = await db.collection('loanDocuments').get();
        loanDocDocs.forEach((d) => {
            tempDocs.push(d.data());
        })

        setAccounts(tempAccounts);
        setDocs(tempDocs);
        console.log(tempDocs);
        console.log(tempAccounts);

        setLoading(false);

		// db.collection("loanAccounts")
		// 	.get()
		// 	// @ts-ignore
		// 	.then((docs) => {
		// 		// @ts-ignore
		// 		docs.forEach((acc) => {
        //             let acData = acc.data();
        //             tempAccounts.push(acData);
        //         });
		// 		setAccounts(tempAccounts);
		// 	})
		// 	.finally(() => {
		// 		setLoading(false);
		// 	});
	};

	useEffect(() => {
		getAccounts();
	}, []);

	useEffect(() => {
		setCurrentAccount(accounts[dispAcc]);
		// updateAccount && updateAccount(accounts[dispAcc]);
	}, [dispAcc, accounts]);


	return (
        <Row>

            <Col sm={16}>
                <ModuleCard accent={theme.primary} className="px-4 py-4 h-100">
                    <h3>Account Documents</h3>
                    
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
                        <Table borderless className="text-center">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Document Type</th>
                                    <th>View/Download</th>
                                    
                                </tr>
                            </thead>
                            <tbody>

                                {docs && docs.map((doc, idx) => (
                                    <tr key={idx}>
                                        <td>{doc?.DocumentDate}</td>
                                        <td>{doc?.DocumentTitle}</td>
                                        
                                        <td><a href="#">View</a> | <a href="#">Download</a></td>
                                        
                                    </tr>
                                ))}

                                {/* <tr>
                                    <td>2687143152</td>
                                    <td>8/17/2020</td>
                                    <td>$101.60</td>
                                    <a href="#" className="btn btn-link">
                                        View Bill
                                    </a>
                                </tr>
                                <tr>
                                    <td>2687143152</td>
                                    <td>7/17/2020</td>
                                    <td>$105.32</td>
                                    <a href="#" className="btn btn-link">
                                        View Bill
                                    </a>
                                </tr>
                                <tr>
                                    <td>2687143152</td>
                                    <td>6/17/2020</td>
                                    <td>$72.32</td>
                                    <a href="#" className="btn btn-link">
                                        View Bill
                                    </a>
                                </tr> */}
                            </tbody>
                        </Table>
                </ModuleCard>
            </Col>

            <Col sm={8}>
                <ModuleCard accent={theme.primary}>
                    <h3 className="mb-3">Account Details</h3>
                    <Row >
                        <Col>
                        <SOverviewText className="mb-1">
                            Borrower:{" "}
                            <strong>{currentAccount?.Borrower}</strong>
                            </SOverviewText> 
                        </Col>
                        
                    </Row>
                    <hr className="my-0"></hr>
                    <Row>
                    <Col>
                        <SOverviewText className="mb-1">
                            Co-Borrower:{" "}
                            <strong>{currentAccount?.Cosigner}</strong>
                            </SOverviewText> 
                        </Col>
                    </Row>
                    <hr className="my-0"></hr>
                    <Row >
                        <Col>
                        <SOverviewText className="mb-1">
                            Loan Type:{" "}
                            <strong>{currentAccount?.LoanType}</strong>
                            </SOverviewText> 
                        </Col>
                        
                    </Row>
                    <hr className="my-0"></hr>
                    {/* <Row>
                    <Col>
                        <SOverviewText className="mb-1">
                            Loan Status:{" "}
                            <strong>{currentAccount?.LoanStatus}</strong>
                            </SOverviewText> 
                        </Col>
                    </Row>
                    <hr className="my-0"></hr> */}
                    <Row >
                        <Col>
                        <SOverviewText className="mb-1">
                            Loan Status:{" "}
                            <strong>{currentAccount?.LoanStatus}</strong>
                            </SOverviewText> 
                        </Col>
                        
                    </Row>
                    <hr className="my-0"></hr>
                    <Row >
                        <Col>
                            <SOverviewText className="mb-1">
                            Last Payment:{" "}
                            <strong>${currentAccount?.PaymentAmount}</strong>
                            </SOverviewText> 
                        </Col>
                        <Col>
                            <SOverviewText className="mb-1">
                            Received:{" "}
                            <strong>
                            {currentAccount?.LastPaymentReceived}
                            </strong>
                            
                            
                            </SOverviewText>  
                        </Col>
                    </Row>
                </ModuleCard>
            </Col>

            
        </Row>

		
	);
};