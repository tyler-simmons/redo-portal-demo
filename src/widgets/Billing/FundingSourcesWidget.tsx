/** @jsxImportSource @emotion/react */
import {useState, useEffect, useContext} from 'react';
import {Table, Row, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import {Theme} from 'app/contexts';
import {ModuleCard, Button} from 'app/components';
import {useFundingSources} from 'app/hooks';

import * as C from './Components';

import {css} from '@emotion/react';

export const FundingSourcesWidget = () => {
	const theme = useContext(Theme.Context);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [reload, setReload] = useState(0);
	const [
		paymentMethods,
		methodsDoneLoading,
		operationLoading,
		getPaymentMethods,
		addBankAcct,
		addCard,
		deleteMethod,
	] = useFundingSources();

	useEffect(() => {
		getPaymentMethods();
	}, []);

	return (
		<ModuleCard accent={theme.primary} className="px-5 py-4">
			<h3 className="mb-3">Cards</h3>
			{methodsDoneLoading && (
				<Table hover>
					<thead>
						<tr>
							<th>NickName</th>
							<th>Card Holder</th>
							<th>Card Type</th>
							<th>Exp. Date</th>
							<th>Card Number</th>
							<th>Manage</th>
						</tr>
					</thead>
					<tbody>
						{paymentMethods
							.filter((method) => method.MethodType === "Card")
							.map((card, idx) => (
								<tr key={idx}>
									<td>{card?.NickName}</td>
									<td>{card.CardHolder}</td>
									<td>{card.CardType}</td>
									<td>{card.Expiration}</td>
									<td>•••••••••{card.CardNumber}</td>
									<td>
										<C.DeleteBtn
											className="text-danger"
											onClick={() => {
												deleteMethod(card.id);
											}}
										>
											<span className="text-dark">
												<i className="fas fa-times mr-1 text-danger"></i>
												Delete
											</span>
										</C.DeleteBtn>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}

			<h3 className="mb-3">Bank Accounts</h3>
			{methodsDoneLoading && (
				<Table hover>
					<thead>
						<tr>
							<th>NickName</th>
							<th>Account Holder</th>
							<th>Account Type</th>
							<th>Routing Number</th>
							<th>Account Number</th>
							<th>Manage</th>
						</tr>
					</thead>
					<tbody>
						{paymentMethods
							.filter((method) => method.MethodType === "Bank")
							.map((acct, idx) => (
								<tr key={idx}>
									<td>{acct?.NickName}</td>
									<td>{acct.AccountHolder}</td>
									<td>{acct.AccountType}</td>
									<td>{acct.RoutingNumber}</td>
									<td>•••••••••{acct.AccountNumber}</td>
									<td>
										<C.DeleteBtn
											className="text-danger"
											onClick={() => {
												deleteMethod(acct.id);
											}}
										>
											<span className="text-dark">
												<i className="fas fa-times mr-1 text-danger"></i>
												Delete
											</span>
										</C.DeleteBtn>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
			<div className="d-flex flex-row align-items-center mt-3">
				<Button
					outline
					shape="pill"
					className="w-25 px-1 mr-3"
					onClick={() => {
						setIsAddingNew(!isAddingNew);
					}}
				>
					<div>
						<FontAwesomeIcon icon={faPlus} className="mr-2" />
						
						<span>Add a new method of payment</span>
					</div>
				</Button>
				
				{/* <button css={css`
					background-image: url("https://www.gstatic.com/instantbuy/svg/light_gpay.svg");
					min-width: 90px;
    				width: 160px;
					background-color: #fff;
					background-origin: content-box;
					background-position: center center;
					background-repeat: no-repeat;
					background-size: contain;
					border: 0px;
					border-radius: 4px;
					box-shadow: rgb(60 64 67 / 30%) 0px 1px 1px 0px, rgb(60 64 67 / 15%) 0px 1px 3px 1px;
					cursor: pointer;
					height: 40px;
					min-height: 40px;
					padding: 11px 24px;
				`}></button> */}
			</div>
			{isAddingNew && <AddPaymentMethod />}
		</ModuleCard>
	);
};

const AddPaymentMethod = () => {
	const [methodType, setMethodType] = useState("bank");
	const theme = useContext(Theme.Context);

	return (
		<C.ShadedBg className="mt-3">
			<C.FormTitle>Add a New Payment Method</C.FormTitle>
			<form className="mt-1">
				<div className="form-group">
					<label htmlFor="methodType">Payment Method Type</label>
					<select
						className="form-control"
						id="methodType"
						value={methodType}
						onChange={(e) => {
							setMethodType(e.target.value);
						}}
					>
						<option value="bank">Bank Account</option>
						<option value="card">Card</option>
					</select>
				</div>
				{/* {{
					bank: <BankAccountInputs />,
					card: <CreditCardInputs />,
					external: <ExternalProviders />,
				}} */}
				{methodType === "bank" ? <BankAccountInputs /> : <CreditCardInputs />}
			</form>
		</C.ShadedBg>
	);
};

const BankAccountInputs = () => {
	const theme = useContext(Theme.Context);
	const { register, handleSubmit, getValues } = useForm();
	let history = useHistory();
	const [
		paymentMethods,
		methodsDoneLoading,
		operationLoading,
		getPaymentMethods,
		addBankAcct,
		addCard,
		deleteMethod,
	] = useFundingSources();

	const onSubmit = async (data: any) => {
		await addBankAcct(data);
		await getPaymentMethods();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col sm={14}>
					<div className="form-group mb-1">
						<label htmlFor="accType">Account Type</label>
						<select className="form-control" {...register('accountType')}>
							<option value="Checking">Checking</option>
							<option value="Savings">Savings</option>
						</select>
					</div>
					<div className="form-group mb-1">
						<label htmlFor="nameOnAcc">Name On Account</label>
						<input
							type="text"
							placeholder="John Smith"
							id="nameOnAcc"
							className="form-control"
							{...register('accountHolder', { required: true })}
						></input>
					</div>

					<div className="form-group mb-1">
						<label htmlFor="routingNum">Routing Number</label>
						<input
							type="text"
							placeholder="Routing Number"
							id="routingNum"
							className="form-control"
							{...register('routingNumber', { required: true })}
						></input>
					</div>
					<div className="form-group mb-1">
						<label htmlFor="accNum">Account Number</label>
						<input
							type="text"
							placeholder="Account Number"
							id="accNum"
							className="form-control"
							{...register('accountNumber', { required: true })}
						></input>
					</div>
					<div className="form-group mb-1">
						<label htmlFor="accNumConf">Confirm Account Number</label>
						<input
							type="text"
							placeholder="Account Number"
							id="accNumConf"
							className="form-control"
							{...register('confirmAccountNumber', { required: true })} 
						></input>
					</div>
					<div className="form-group mb-1">
						<label htmlFor="nick">Choose a Nickname (optional)</label>
						<input
							type="text"
							placeholder="AutoPay Bank Account"
							id="nick"
							className="form-control"
							{...register('nickName', { required: false })}
						></input>
					</div>
					<Button
						type="submit"
						shape="pill"
						colors={{
							font: "#fff",
							background: theme.primary,
						}}
						className="mt-3"
					>
						Save
					</Button>
				</Col>
				<Col sm={6} className="justify-content-center">
					<C.CustImg rounded src="/check.png" />
				</Col>
			</Row>
		</form>
	);
};

const CreditCardInputs = () => {
	const theme = useContext(Theme.Context);
	return (
		<Row>
			<Col sm={14}>
				<div className="form-group ">
					<label htmlFor="cardNum">Card Number</label>
					<input
						type="text"
						className="form-control"
						placeholder="Card Number"
						id="cardNum"
					></input>
				</div>
				<div className="form-group ">
					<label htmlFor="holderName">Card Holder Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="John Doe"
						id="holderName"
					></input>
				</div>
				<div className="form-group">
					<label htmlFor="holderName">Card Holder Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="John Doe"
						id="holderName"
					></input>
				</div>
				<Row>
					<Col sm={16}>
						<label>Expiration</label>
						<div className="form-group d-flex flex-row">
							<C.InlineSelect className="form-control">
								<option>01</option>
								<option>02</option>
								<option>03</option>
								<option>04</option>
								<option>05</option>
								<option>06</option>
								<option>07</option>
								<option>08</option>
								<option>09</option>
								<option>10</option>
								<option>11</option>
								<option>12</option>
							</C.InlineSelect>
							<C.InlineSelect className="form-control">
								<option>2020</option>
								<option>2021</option>
								<option>2022</option>
								<option>2023</option>
								<option>2024</option>
								<option>2025</option>
								<option>2026</option>
								<option>2027</option>
								<option>2028</option>
								<option>2029</option>
								<option>2030</option>
							</C.InlineSelect>
						</div>
						<Button
							shape="pill"
							colors={{
								font: "#fff",
								background: theme.primary,
							}}
							className="mt-3"
						>
							Save
						</Button>
					</Col>
					<Col sm={8}>
						<div className="form-group">
							<label>CVV</label>
							<input
								type="text"
								className="form-control"
								placeholder="CVV"
							></input>
						</div>
					</Col>
				</Row>
			</Col>
			<Col sm={6} className="justify-content-center">
				<C.CustImg rounded src="/cc-d.png" className="cc-img" />
			</Col>
		</Row>
	);
};