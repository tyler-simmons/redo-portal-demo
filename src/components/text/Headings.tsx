import styled from '@emotion/styled';

export const Heading = styled.h2`
    color: ${props => props.color ? props.color : props.theme.colors.primary};
`;

export const SubHeading = styled.h3`
    color: ${props => props.color ? props.color : props.theme.colors.primary};
`;

