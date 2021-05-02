import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Spinner} from 'react-bootstrap';

export interface ColorOverrideProp {
    color?: string
}

export const SubHeading = styled.h3<ColorOverrideProp>`
	color: ${props => props.color ? props.color : props.theme.colors.primary};
	font-size: 1.4rem;
`;

export const StyledSelect = styled.select`
	font-size: 1.1rem;

	font-weight: 600;
	&:hover {
		cursor: pointer;
	}
	&:after {
		font-weight: bold;
	}
`;

export const OverviewText = styled.p`
	font-size: 1.2rem;
	text-align: left;
	&.nowrap {
		white-space: nowrap;
	}
`;

export const StyledIcon = styled(FontAwesomeIcon)<ColorOverrideProp>`
	font-size: 1.3rem;
	margin-right: 0.5rem;
	color: ${props => props.color ? props.color : props.theme.colors.primary};
	text-align: center;
`;

export const AccountLine = styled.p`
	font-weight: 600;
	font-size: 1.5rem;
	margin-bottom: 0;
`;
export const AddressLine = styled.p`
	font-size: 1rem;
`;

export const StyledSpinner = styled(Spinner)<ColorOverrideProp>`
	width: 4rem;
	height: 4rem;
	margin: auto;
	color: ${props => props.color ? props.color : props.theme.colors.primary};
`;

export const ConfNum = styled.p`
	font-size: 1.4rem;
	font-weight: 600;
`;
export const ConfCont = styled.div`
	text-align: center;
	width: 50%;
	background-color: #eeeeee;
	color: black;
	border-radius: 0.25rem;
`;