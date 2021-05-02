import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {Row, Col, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faCheckCircle, faTimesCircle, faBuilding} from '@fortawesome/free-solid-svg-icons';

import {ModuleCard} from 'app/components';
import {Theme} from 'app/contexts';
import { db } from "app/data";

const OverviewText = styled.p`
	font-size: 1.2rem;
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

export const AccountOverviewWidget = ({
	updateAccount,
}: {
	updateAccount: any;
}) => {
	const [accounts, setAccounts] = useState<any[]>([]);
	const [dispAcc, setDispAcc] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentAccount, setCurrentAccount] = useState({
		AccountNumber: "",
		Street: "",
		City: "",
		Zip: 0,
		FirstName: "",
		LastName: "",
		PremiseType: "",
		CurrentBalance: 0,
		AutoPayEnabled: false,
		DueDate: "",
		PastPayment: "",
		LastStatementAmount: 0,
	});

	const getAccounts = async () => {
		setLoading(true);
		let tempAccounts: any[] = [];
		let dbRes = await db
			.collection("accounts")
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

	const theme = useContext(Theme.Context);

	return (
		<ModuleCard accent={theme.primary}>
			<h3>Account Overview</h3>
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
											{acc.Street} - {acc.AccountNumber}
										</option>
									))}
								</StyledSelect>
							</div>
						</Col>
						<Col className="d-flex flex-column justify-content-center">
							<OverviewText className="mb-0">
								{currentAccount?.PremiseType === "Commercial" ? (
									// <StyledIcon
                                    //     icon={['fas', 'building']}
									// 	color={theme.primary}
									// />
                                    <StyledIcon color={theme.primary} icon={faBuilding}/>
								) : (
									<StyledIcon color={theme.primary} icon={faHome} />
								)}
								Type:
								<strong> {currentAccount?.PremiseType}</strong>
							</OverviewText>
						</Col>
					</Row>

					{accounts.length !== 0 && (
						<React.Fragment>
							<Row>
								<Col>
									<OverviewText className="mb-1">
										Account Holder:{" "}
										<strong>
											{currentAccount?.FirstName} {currentAccount?.LastName}
										</strong>
									</OverviewText>
								</Col>
							</Row>
							{/* <hr className="my-1"></hr> */}
							<Row>
								<Col>
									<OverviewText>
										Service Address:
										<strong> {currentAccount?.Street}</strong>
									</OverviewText>
								</Col>
							</Row>
							{/* <hr className="my-1"></hr> */}
							<ShadedBg>
								<Row>
									<Col>
										<OverviewText>
											<span className="d-block">Last Statement Amount:</span>
											<LargeInlineText>
												<strong className="mr-3">
													{" "}
													${currentAccount?.LastStatementAmount}
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
														The last statement amount will be debited from your
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
								{/* <hr className="my-1"></hr> */}
								{/* <Row>
									<Col>
										<OverviewText>
											{currentAccount.AutoPayEnabled ? (
												<React.Fragment>
													<StyledIcon
														color={'#f5a442'}
														className="fas fa-check-circle"
													/>
													AutoPay: <strong>ON</strong>
													<SmallOverviewText className="mt-2">
														The last statement amount will be
														debited from your account on the
														due date
													</SmallOverviewText>
												</React.Fragment>
											) : (
												<React.Fragment>
													<StyledIcon
														color={'#c82333'}
														className="fas fa-times-circle"
													/>
													AutoPay: <strong>OFF</strong>
												</React.Fragment>
											)}
										</OverviewText>
									</Col>
								</Row> */}
							</ShadedBg>
							{/* <Row>
								<Col>
									<OverviewText>
										<StyledIcon
											color={'#218838'}
											className="fas fa-dollar-sign ml-2"
										/>
										Current Balance:{' '}
										<strong>${currentAccount.CurrentBalance}</strong>
									</OverviewText>
								</Col>
								<Col>
									<OverviewText>
										Last Statement Amount:{' '}
										<strong>{currentAccount.PastPayment}</strong>
									</OverviewText>
								</Col>
							</Row> */}
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</ModuleCard>
	);
};

const ShadedBg = styled.div`
	background-color: #eee;
	padding: 0.35rem 1rem;
	border-radius: 0.25rem;
`;