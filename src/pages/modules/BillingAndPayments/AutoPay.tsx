import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap';
import {faBuilding, faHome} from '@fortawesome/free-solid-svg-icons';



import {db} from 'app/data';
import {Theme} from 'app/contexts';
import {Button} from 'app/components';

import * as C from './Components';

export const EnrollInAutoPay = ({ updateAccount }: any) => {
	const [key, setKey] = useState("1");
	const [confirm, setConfirm] = useState(false);
	const theme = useContext(Theme.Context);
	const [accounts, setAccounts] = useState<any[]>([]);
	const [dispAcc, setDispAcc] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentAccount, setCurrentAccount] = useState<any>({});

	let history = useHistory();

	const getAccounts = async () => {
		setLoading(true);
		let tempAccounts: any[] = [];
		let dbRes = await db
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
	}, []);

	useEffect(() => {
		setCurrentAccount(accounts[dispAcc]);
		// updateAccount(accounts[dispAcc]);
	}, [dispAcc, accounts]);

	return (
		
			<div>
				<C.SubHeading  className="mb-3">About Enrolling in AutoPay</C.SubHeading>
				<p className="w-75 mb-4">
					If your account is already being automatically debited from one of our other payment options, please contact Level One to cancel any existing AutoPay arrangements prior to new AutoPay enrollments. This will ensure that duplicate payments are not made on your account.
				</p>
				<C.SubHeading className="mb-3">
					Select an Account
				</C.SubHeading>

				<div className="form-group mb-4 w-50 d-flex flex-row">
					<C.StyledSelect
						className="form-control w-50"
						value={dispAcc}
						onChange={(e: any) => {
							console.log(typeof e.target.value);
							setDispAcc(parseInt(e.target.value));
						}}
						// disabled={key !== "0"}
					>
						{accounts.map((acc, idx) => (
							<option key={idx} value={idx}>
								Loan: {acc?.AccountNumber}
							</option>
						))}
					</C.StyledSelect>
					{/* {!loading && (
						<C.OverviewText className="my-auto ml-3">
							{currentAccount?.PremiseType === "Commercial" ? (
								<C.StyledIcon  icon={faBuilding} />
							) : (
								<C.StyledIcon  icon={faHome} />
							)}
							Type:
							<strong> {currentAccount?.PremiseType}</strong>
						</C.OverviewText>
					)} */}
				</div>

				
				<C.SubHeading>
					Frequency
				</C.SubHeading>
				{/* <p className="w-75 mb-4">
					Payments to your account will be made on the{" "}
					<strong>Payment Due Date </strong>
					detailed in your billing statement, and will be for the
					<strong> Statement Amount</strong> shown on that statement. The
					debits from your <strong>payment method</strong> will occur
					within two business days of those dates but no earlier than
					those dates. You authorize your bank (and its successors or
					assigns) to process these debits to your account.
				</p> */}
				<p className="w-75">This is how often your specified amount will get debited from your chosen payment method. If you would like to make a payment immediately
					or schedule a one-time payment, <a href="#" >click here</a>.
				</p>
				<div className="form-group w-50 mb-4">
					<select className="form-control w-50">
						<option>Weekly</option>
						<option>Every Other Week</option>
						<option>Twice Monthly - 15th and last day of the month</option>
						<option>Monthly</option>
						<option>Monthly - last day of the month</option>
					</select>
				</div>
							
				<C.SubHeading>
					Choose Start Date
				</C.SubHeading>
				<div className="form-group w-25 mb-4">
					<input type="date" className="form-control" ></input>
				</div>


				<C.SubHeading>
					End Date
				</C.SubHeading>
				<p className="w-75 mb-1">If <strong>indefinitely</strong> is chosen, payments will continue automatically through the end of payment term. AutoPay can be cancelled at any time.</p>
				<div className="form-group w-25 mb-4">
					
						<fieldset>
							
							<Form.Check type="radio" name="typeSelection" id="lastStatementRad" className="mb-3">
								<Form.Check.Input type="radio" name="typeSelection" checked/>
								<Form.Check.Label>Indefinitely</Form.Check.Label>
							</Form.Check>
							
							<Form.Check type="radio" name="typeSelection" id="currentBalanceRad" className="mb-2">
								<Form.Check.Input type="radio" name="typeSelection"/>
								<Form.Check.Label>Specify End Date</Form.Check.Label>
							</Form.Check>
						</fieldset>
						
						<input type="date" className="form-control mb-3" ></input>
						
						<Form.Check type="radio" name="typeSelection" id="currentBalanceRad" className="mb-2">
							<Form.Check.Input type="radio" name="typeSelection"/>
							<Form.Check.Label>After this many payments:</Form.Check.Label>
						</Form.Check>
						<input type="number" className="form-control" ></input>
				</div>

				<hr></hr>
				
				<C.SubHeading>
					Choose a Payment Method
				</C.SubHeading>
				
						<div className="form-group w-50">
							<select className="form-control w-50">
								<option>VISA **1234 - Primary Debit</option>
								<option>MASTERCARD ** 5678 - Credit Card</option>
							</select>
						</div>
						<p className="mb-4">
							By clicking Next you authorize us to initiate automatic debits
							from the Funding Source to make a payment to the Account Number(s)
							as detailed above.
						</p>
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
						onClick={(e) => {e.preventDefault(); history.replace('/portal/billing/autopay/confirm')}}
					>
						Next
					</Button>
					<small>Your AutoPay will begin starting with your next payment (unless otherwise scheduled).</small>
					

				
			</div>
		
	);
};

export const ConfirmAutoPay = () => {
	const theme = useContext(Theme.Context);
	let history = useHistory();
	
	return (
		<Container fluid>
			<C.SubHeading>
				AutoPay Enrollment
			</C.SubHeading>
			<p>By clicking Confirm you authorize us to initiate automatic debits from the payment method to make a payment to the Account Number(s) detailed below. You will be notified via email regarding the dates and amounts of these payments before a payment is processed. You will be able to cancel a payment at any time before the payment date by cancelling your enrollment in AutoPay.</p>
			<div className="d-flex justify-content-start align-items-center">
				<div className="mr-4">
					<C.AccountLine>2687143152</C.AccountLine>
					<C.AddressLine>123 Street Rd</C.AddressLine>
					<p>Payment Method: <strong>VISA_1234 - Primary Debit</strong></p>
				</div>
				
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
				onClick={(e) => {e.preventDefault(); history.replace('/portal/billing')}}
			>
				Confirm
			</Button>
		</Container>
		
	)
}