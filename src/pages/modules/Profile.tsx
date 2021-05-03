import React, {useState, useEffect, useContext} from 'react';
import {Row, Col, Spinner} from 'react-bootstrap';
import styled from '@emotion/styled';

import {db} from 'app/data';
import {Theme} from 'app/contexts';
import {Button, ModuleCard} from 'app/components';


export const Profile = () => {
	const theme = useContext(Theme.Context);
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
	});
	const [user, setUser] = useState({});

	const getAccounts = async () => {
		setLoading(true);
		let tempAccounts: any[] = [];
		db.collection("accounts").get()
			.then((docs) => {
				docs.forEach((acc) => {
					tempAccounts.push(acc.data());
				});
				setAccounts(tempAccounts);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getUser = async () => {
		setLoading(true);
		db.collection("users")
			.where("FirstName", "==", "John")
			.get()
			.then((doc) => {
				doc.forEach((usr) => {
					setUser(usr.data());
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getAccounts();
		getUser();
	}, []);

	useEffect(() => {
		setCurrentAccount(accounts[dispAcc]);
	}, [dispAcc, accounts]);
	return (
		<React.Fragment>
			<h1 className="mb-5">My Profile</h1>
			{loading ? (
				<StyledSpinner animation="border" color={theme.primary} />
			) : (
				<Row className="w-75 mr-auto">
					<Col>
						<div>
							<ShadedBg>
								{/* @ts-ignore */}
								<OverviewText>
									{/* @ts-ignore */}
									Email:<strong className="ml-2">{user.Email}</strong>
									<button className="btn btn-link ml-3">
										<i className="fas fa-edit mr-1"></i>Edit
									</button>
								</OverviewText>
								{/* @ts-ignore */}
								<OverviewText>
									Password:<strong className="ml-2">•••••••</strong>
									<button className="btn btn-link ml-3">
										<i className="fas fa-edit mr-1"></i>Change
									</button>
								</OverviewText>
								{/* @ts-ignore */}
								<OverviewText>
									{/* @ts-ignore */}
									Phone:<strong className="ml-2">{user.Phone}</strong>
									<button className="btn btn-link ml-3">
										<i className="fas fa-edit mr-1"></i>Edit
									</button>
								</OverviewText>
							</ShadedBg>
						</div>
					</Col>
					<Col>
						<ModuleCard accent={theme.primary}>
							<h3 className="mb-3">My Loans</h3>
							{accounts.map((acc, idx) => (
								<p key={idx}>
									{acc.Street} - <strong>{acc.AccountNumber}</strong>
								</p>
							))}
							<NarrowBtn
								shape="pill"
								colors={{
									font: "#fff",
									background: theme.primary,
								}}
								className="w-75"
							>
								Manage Loans
							</NarrowBtn>
						</ModuleCard>
					</Col>
				</Row>
			)}
		</React.Fragment>
	);
};

const StyledSpinner = styled(Spinner)`
	width: 4rem;
	height: 4rem;
	margin: auto;
	color: ${(props) => props.color};
`;
const NarrowBtn = styled(Button)`
	padding-left: 1rem !important;
	padding-right: 1rem !important;
	width: 60% !important;
	&&& {
	}
`;
const ShadedBg = styled.div`
	background-color: #eee;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	padding-top: 1rem;
`;
const OverviewText = styled.p`
	font-size: 1.2rem;
	text-align: left;
`;