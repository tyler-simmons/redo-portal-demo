import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ColorOverrideProp {
    color?: string
}

export const ColorIcon = styled(FontAwesomeIcon)<ColorOverrideProp>`
    color: ${props => props.color ? props.color : props.theme.colors.primary};
    
`;