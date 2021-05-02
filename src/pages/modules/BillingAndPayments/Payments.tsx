import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Table, Form, FormCheck, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import {db} from 'app/data';
import {Theme} from 'app/contexts';
import {Button} from 'app/components';

import * as C from './Components';

export const ConfirmMakeAPayment = () => {
	const theme = useContext(Theme.Context);
	let history = useHistory();

	return (
		<Container fluid>
			<C.SubHeading>
				Confirm Your One-Time Payment
			</C.SubHeading>
			<p className="mt-1">
				Please verify your scheduled payment.<br></br>
				If you authorize Level One to take this payment from your payment method listed below, click <strong>Confirm</strong><br></br>
				If you do not want to schedule this payment, click <strong>Cancel</strong>
			</p>
			<div className="d-flex justify-content-start align-items-center">
				<div className="mr-4">
					<C.AccountLine>2687143152</C.AccountLine>
					<C.AddressLine>123 Street Rd</C.AddressLine>
					<p>Payment Method: <strong>VISA_1234 - Primary Debit</strong></p>
				</div>
				
			</div>
			<Table className="w-50">
				<thead>
					<tr>
						<th>Payment Date</th>
						<th>Description</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>11/03/2020</td>
						<td>Bill Payment</td>
						<td>$73.75</td>
					</tr>
					<tr>
						<td></td>
						<td className="text-right">
							<span >Total Payment Amount<i className="fas fa-caret-right ml-1"></i></span>
						</td>
						<td><strong>$73.75</strong></td>
					</tr>
				</tbody>
			</Table>
			<Button
				shape="pill"
				className="mr-2"
				colors={{ font: "#fff", background: "#6c757d" }}
			>
				Cancel
			</Button>
			<Button
				shape="pill"
				className="mr-2"
				colors={{ font: "#fff", background: theme.primary }}
				onClick={(e) => {e.preventDefault(); history.replace('/portal/billing/one-time/done');}}
			>
				Confirm
			</Button>
		</Container>
	)
}

export const MakeAPayment = () => {
	const theme = useContext(Theme.Context);
	const [date, setDate] = useState(new Date());
	const [accounts, setAccounts] = useState<any[]>([]);
	const [dispAcc, setDispAcc] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentAccount, setCurrentAccount] = useState<any>({});

	let history = useHistory();

	const getAccounts = async () => {
		setLoading(true);
		let tempAccounts: any[] = [];
		await db
			.collection("loanAccounts")
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
		setCurrentAccount(accounts[dispAcc]);
	}, []);

	useEffect(() => {
		setCurrentAccount(accounts[dispAcc]);
		// updateAccount(accounts[dispAcc]);
	}, [dispAcc, accounts]);

	const changeHandler = (date: any) => {
		setDate(date);
	};

	return (
		<div>
			{!loading && currentAccount !== undefined ? (
				<Form>
					<C.SubHeading >
						Make a One-Time Payment
					</C.SubHeading>
					<p className="w-75 text-muted">
						<strong>Please note:</strong> All dollar amounts listed below are
						for the current month only. Future dollar amounts will vary. Online
						Bill Pay will NOT process payments without your authorization. Any
						payments made after 2:00PM Eastern Standard time will be processed
						the next business day.
					</p>

					<div className="d-flex justify-content-start align-items-center">
						<div className="mr-4">
							<C.AccountLine>{currentAccount?.AccountNumber}</C.AccountLine>
							<C.AddressLine>{currentAccount?.Borrower}</C.AddressLine>
						</div>
						<div>
							<select className="form-control" onChange={(e) => {setCurrentAccount(accounts.find((acc) => acc.AccountNumber === e.target.value))}}>
								{accounts.map((acc, idx) => 
									<option value={acc.AccountNumber}>Loan: {acc?.AccountNumber}</option>
								)}
							</select>
						</div>
					</div>

					<Table className="w-25">
						<thead>
							<tr>
								<th>Payment Amount</th>
								<th>Due Date</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${currentAccount?.PaymentAmount}</td>
								<td>{currentAccount?.DueDate}</td>
							</tr>
						</tbody>
					</Table>


					<C.SubHeading>Choose Payment Type</C.SubHeading>
					<fieldset className="mb-5">
						
						<Form.Check type="radio" name="typeSelection" id="lastStatementRad" className="mb-3">
							<Form.Check.Input type="radio" name="typeSelection" checked/>
							<Form.Check.Label>Regular Payment</Form.Check.Label>
						</Form.Check>
						<Form.Check type="radio" name="typeSelection" id="currentBalanceRad" >
							<Form.Check.Input type="radio" name="typeSelection"/>
							<Form.Check.Label>Principal Payment</Form.Check.Label>
						</Form.Check>
					</fieldset>

					<C.SubHeading >Select Payment Amount</C.SubHeading>
					<fieldset>
						
						<Form.Check type="radio" name="amountSelection" id="lastStatementRad" className="mb-3">
							<Form.Check.Input type="radio" name="amountSelection" checked/>
							<Form.Check.Label>{`Normal Payment Amount: $${currentAccount?.PaymentAmount}`}</Form.Check.Label>
						</Form.Check>
						<Form.Check type="radio" name="amountSelection" id="currentBalanceRad" >
							<Form.Check.Input type="radio" name="amountSelection"/>
							<Form.Check.Label>{`Payoff Amount: $${currentAccount?.PayoffAmount}`}</Form.Check.Label>
						</Form.Check>
						<small className="form-text text-muted mb-3">
							Note: If current balance document does not reflect recent
							payments, payments may not have posted. Contact customer service
							with questions
						</small>
						<Form.Check>
							<Form.Check.Input type="radio" name="amountSelection"/>
							<Form.Check.Label>
								<Row>
									<Col>
									Other Payment Amount
									</Col>
									<Col>
									<Form.Control type="text" className="ml-2" placeholder="Enter Amount"/>
									</Col>
								</Row>
								 
							</Form.Check.Label>
						</Form.Check>
						
						
					</fieldset>
					

					<C.SubHeading className="mt-4" >
						Select Payment Date
					</C.SubHeading>
					<Form.Check
						type="radio"
						id="5"
						label={`Statement Due Date: ${currentAccount?.DueDate}`}
						className="mb-2"
						name="paymentDate"
						checked
					/>
					<div className="d-flex">
						<div className="align-items-center mr-2">
							<FormCheck className="h-100 vertical-align-middle" name="paymentDate">
								<FormCheck.Input type="radio" name="paymentDate"/>
								<FormCheck.Label>Other Date </FormCheck.Label>
							</FormCheck>
						</div>
						<div>
							<DatePicker onChange={changeHandler} selected={date} />
						</div>
					</div>
					<C.SubHeading className="mt-4" >
						Select Payment Method
					</C.SubHeading>
					<div className="form-group w-25 mb-4">
						<select className="form-control">
							<option>VISA **1234 - Primary Debit</option>
						</select>
					</div>
					<Button
						shape="pill"
						className="mr-2"
						colors={{ font: "#fff", background: "#6c757d" }}
					>
						Cancel
					</Button>
					<Button
						shape="pill"
						className="mr-2"
						colors={{ font: "#fff", background: theme.primary }}
						onClick={(e) => {e.preventDefault(); history.replace('/portal/billing/one-time/confirm');}}
					>
						Next
					</Button>
				</Form>
			) : (
				<C.StyledSpinner animation="border"  />
			)}
		</div>
	);
};

export const MakePaymentDone = () => {
	const theme = useContext(Theme.Context);
	let history = useHistory();
	return (
		<Container fluid>
			<C.SubHeading color={theme.primary}>
				Thank you for your payment
			</C.SubHeading>
			<p>Payment details and your confirmation number are listed below.</p>
			<div className="d-flex justify-content-start align-items-center">
				<div className="mr-4">
					<C.AccountLine>2687143152</C.AccountLine>
					<C.AddressLine>123 Street Rd</C.AddressLine>
					<p>Payment Method: <strong>VISA_1234 - Primary Debit</strong></p>
				</div>
				
			</div>
			<Table className="w-50">
				<thead>
					<tr>
						<th>Payment Date</th>
						<th>Description</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>11/03/2020</td>
						<td>Bill Payment</td>
						<td>$73.75</td>
					</tr>
					<tr>
						<td></td>
						<td className="text-right">
							<span >Total Payment Amount<i className="fas fa-caret-right ml-1"></i></span>
						</td>
						<td><strong>$73.75</strong></td>
					</tr>
				</tbody>
			</Table>
			<C.ConfCont>
				<p className="mb-0">Payment Confirmation</p>
				<C.ConfNum>L1ABBD47</C.ConfNum>
			</C.ConfCont>
			<div className="w-50 d-flex justify-content-end">
				<Button
					shape="pill"
					className="mr-2 mt-2"
					colors={{ font: "#fff", background: theme.primary }}
					onClick={() => {history.replace('/portal/billing')}}
				>
					Done
				</Button>
			</div>
			
		</Container>
	)
}