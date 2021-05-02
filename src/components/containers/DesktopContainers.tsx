import styled from '@emotion/styled';

const TopLevelContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: row;
`;
const SideContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-basis: auto;
	flex-grow: 0;
`;
const MainContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	flex-basis: auto;
	flex-grow: 1;
`;


export const DesktopContainers = {
    TopLevel: TopLevelContainer,
    Side: SideContainer,
    Main: MainContainer
}