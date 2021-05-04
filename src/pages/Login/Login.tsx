import {useState} from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import styled from '@emotion/styled';
import {useHistory, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import { Button, HeaderLayout } from 'app/components';
import * as C from './Components';
import {auth} from 'app/data';


export const Login = () => {
	return (
		<HeaderLayout.Container>
			<HeaderLayout.Header>
				<img src="/header.png" alt="aws header" className="shadow"></img>
			</HeaderLayout.Header>
			<HeaderLayout.Main>
				<C.FormRow>
					<C.FormCol>
						<LoginForm />
					</C.FormCol>
					<C.FormCol>
						<UnRegistered />
					</C.FormCol>
				</C.FormRow>
			</HeaderLayout.Main>
		</HeaderLayout.Container>
	);
};

const LoginForm = () => {
	const {register, handleSubmit, formState: { errors }, setError} = useForm();
	const [loading, setLoading] = useState(false);
	
	let history = useHistory();
  	let location = useLocation();
	
	  // @ts-ignore
	let { from } = location.state || { from: { pathname: "/" } };
	
	const login = (data:any) => {
		setLoading(true);
		auth.signInWithEmailAndPassword(data.username, data.password)
			.then((res) => {
				history.replace(from);
			})
	};

	return (
		<Form onSubmit={handleSubmit(login)} >
			<C.SectionHeading>Registered customers sign in below</C.SectionHeading>
			<Form.Group className="mt-3">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="username" {...register('username', {required: true})}/>
				{errors.username && <Form.Control.Feedback type="invalid">Please enter a valid username</Form.Control.Feedback>}
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="password" {...register('password', {required: true})}/>
				{errors.password && <Form.Control.Feedback type="invalid">Please enter a valid username</Form.Control.Feedback>}
			</Form.Group>
			
			<Button shape="pill" className="mt-3">
				Sign In
				{loading && <Spinner animation="border" size="sm" />}
			</Button>

			<C.Link href="#">Forgot your username/password?</C.Link>
		</Form>
	);
};

const UnRegistered = () => {
	return (
		<>
			<C.SectionHeading>Pay Now and Register Later</C.SectionHeading>
			<C.SmallSubText>
				Select the Pay Now button to make a one-time payment. You do not need to
				sign in or register.
			</C.SmallSubText>
			<Button
				colors={{ font: '#fff', background: '#4bb563' }}
				shape="pill"
				className="mt-3"
			>
				Pay Now
			</Button>

			<C.SectionHeading className="mt-5">
				Don't Have Online Access Yet?
			</C.SectionHeading>
			<C.SmallSubText>
				You'll need your loan number and billing zip code to complete registration.
			</C.SmallSubText>

			<Button
				className="mt-3"
				colors={{ font: '#fff', background: '#007ac2' }}
				shape="pill"
				outline
			>
				Register Now
			</Button>
		</>
	);
};

const MessageBox = styled(Alert)`
	width: 60%;
	margin-left: auto;
	margin-right: auto;
`;

const MessageBoxArtesian = styled(MessageBox)`
	background-color: #f3c623;
`;
