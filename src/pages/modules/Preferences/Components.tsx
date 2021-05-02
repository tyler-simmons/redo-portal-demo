import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ColorOverrideProp {
    color?: string
}

export const SettingGroup = styled.div`
	vertical-align: middle;
	display: flex;
	margin-bottom: 0.75rem;
`;

export const Setting = styled.p`
	font-size: 1.3rem;
	margin-bottom: 0;
	margin-left: 0.75rem;

	vertical-align: middle;
`;

export const SettingIcon = styled(FontAwesomeIcon)<ColorOverrideProp>`
	color: ${props => props.color ? props.color : props.theme.colors.primary};
`