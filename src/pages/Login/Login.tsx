import React, {useState} from 'react';
import { Form, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import styled from '@emotion/styled';
import {useHistory, useLocation} from 'react-router-dom';

import { Button as CustomButton } from 'app/components';
import {auth} from 'app/data';

//#region containers, row, and col
const Container = styled.div`
	width: 100vw;
	height: 100vh;
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
`;
const FormRow = styled(Row)`
	width: 60%;
	margin: 2rem auto 0;
`;
const FormCol = styled(Col)`
	padding-left: 2.75rem;
	padding-right: 2.75rem;
	&:nth-of-type(1) {
		border-right: 2px solid lightgrey;
	}
`;
//#endregion
//#region headings
const SectionHeading = styled.h2`
	color: #007ac2;
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
//#endregion
const MessageBox = styled(Alert)`
	width: 60%;
	margin-left: auto;
	margin-right: auto;
`;

const MessageBoxArtesian = styled(MessageBox)`
	background-color: #f3c623;
`
const Link = styled.a`
	display: block;
	color: #007ac2;
	margin-top: 0.75rem;
`;

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	let history = useHistory();
  	let location = useLocation();
	// @ts-ignore
	let { from } = location.state || { from: { pathname: "/" } };
	
	let login = async () => {
		try {
			setLoading(true);
			let authRes = await auth.signInWithEmailAndPassword(username, password);
			console.log(authRes);
			setLoading(false);
			history.replace(from);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
		
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		login();
	}

	return (
		<Form onSubmit={handleSubmit}>
			<SectionHeading>Registered customers sign in below</SectionHeading>
			<Form.Group className="mt-3">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value);}}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value);}}/>
			</Form.Group>
			<CustomButton
				colors={{ font: '#fff', background: '#0069d9' }}
				shape="pill"
				className="mt-3"
				onClick={(e) => {
					e.preventDefault(); 
					history.replace('/portal');
				}}
			>
				Sign In
				{loading && <Spinner animation="border" size="sm" />}
			</CustomButton>

			<Link href="#">Forgot your username/password?</Link>
		</Form>
	);
};

const UnRegistered = () => {
	return (
		<>
			<SectionHeading>Pay Now and Register Later</SectionHeading>
			<SmallSubText>
				Select the Pay Now button to make a one-time payment. You do not need to
				sign in or register.
			</SmallSubText>
			<CustomButton
				colors={{ font: '#fff', background: '#4bb563' }}
				shape="pill"
				className="mt-3"
			>
				Pay Now
			</CustomButton>

			<SectionHeading className="mt-5">
				Don't Have Online Access Yet?
			</SectionHeading>
			<SmallSubText>
				You'll need your loan number and billing zip code to complete registration.
			</SmallSubText>

			<CustomButton
				className="mt-3"
				colors={{ font: '#fff', background: '#007ac2' }}
				shape="pill"
				outline
			>
				Register Now
			</CustomButton>
		</>
	);
};

export const Login = () => {
	return (
		<Container>
			<HeaderContainer>
				<img src="/header.png" alt="aws header" className="shadow"></img>
			</HeaderContainer>
			<MainContainer>
				
				<FormRow>
					<FormCol>
						<LoginForm />
					</FormCol>
					<FormCol>
						<UnRegistered />
					</FormCol>
				</FormRow>
			</MainContainer>
		</Container>
	);
};