import {useWindowSize} from 'app/hooks';
import {DesktopContainers, Sidebar} from 'app/components';
import {PortalRoutes} from './PortalRoutes';

import {Toast} from 'react-bootstrap';

import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import styled from '@emotion/styled';
import {NavLink} from 'react-router-dom';

const {TopLevel: TopLevelCtr, Side: SideCtr, Main: MainCtr} = DesktopContainers;

const SmallNavLink = styled(NavLink)`

`;

export const Portal = () => {
    const {width, height} = useWindowSize();


    if (width && width < 576) {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#">
                        <img src="/sidebar-logo.png" width="80"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <SmallNavLink exact to="/portal/">Home</SmallNavLink>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Navbar>
                <h1>Small version</h1>
            </div>
            
        )
    }

    return (
        <TopLevelCtr>
            <SideCtr>
                <Sidebar/>
            </SideCtr>
            <MainCtr>
            <Toast
                style={{
                position: 'absolute',
                top: 0,
                right: 0,
                }}
            >     
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Window Size</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>Width: {width}, Height: {height}</Toast.Body>
            </Toast>
            <PortalRoutes />
            </MainCtr>
        </TopLevelCtr>
    )
}