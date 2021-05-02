import styled from '@emotion/styled';
import {Image} from 'react-bootstrap';

export const DeleteBtn = styled.button`
	background-color: transparent;
	border: none;
`;

export const InlineSelect = styled.select`
	&.form-control {
		display: inline;
	}
`;

export const CustImg = styled(Image)`
	background-color: transparent;
	display: block;
	margin-top: 5rem;
	margin-left: 2rem;
	&.cc-img {
		margin-top: 2.25rem;
		margin-left: 4rem;
		max-width: 20rem;
	}
`;

export const FormTitle = styled.h3`
	margin-bottom: 1rem;
`;

export const ShadedBg = styled.div`
	background-color: #eee;
	padding: 2.5rem 4rem;
	border-radius: 0.25rem;
`;