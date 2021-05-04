import {Row, Col} from 'react-bootstrap';
import styled from '@emotion/styled';


export const FormRow = styled(Row)`
	width: 60%;
	margin: 2rem auto 0;
`;

export const FormCol = styled(Col)`
	padding-left: 2.75rem;
	padding-right: 2.75rem;
	&:nth-of-type(1) {
		border-right: 2px solid lightgrey;
	}
`;

export const SectionHeading = styled.h2`
    ${props => props.color ? props.color : props.theme.colors.primary};
`;

export const SubText = styled.p`
	margin-bottom: 0;
	color: grey;
	font-weight: 600;
	font-size: 1.3rem;
`;

export const SmallSubText = styled(SubText)`
	font-size: 1rem;
`;

export const Link = styled.a`
	display: block;
	color: #007ac2;
	margin-top: 0.75rem;
`;