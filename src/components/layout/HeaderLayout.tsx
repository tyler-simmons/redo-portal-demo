import styled from '@emotion/styled';

export const HeaderLayoutContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
export const HeaderContainer = styled.div`
	max-width: 100%;
	flex-basis: auto;
	flex-grow: 0;
`;
export const MainContainer = styled.div`
	flex-basis: auto;
	flex-grow: 1;
	padding-top: 2.5rem;
`;

export const HeaderLayout = {
    Container: HeaderLayoutContainer,
    Header: HeaderContainer,
    Main: MainContainer
}