import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Navbar} from 'app/components';
import {AppMainContainer} from './PortalComponents';
import * as Modules from 'app/pages/modules';

//just for the demo since im in a rush
import {ModuleHeading} from 'app/components';
import {FundingSourcesWidget} from 'app/widgets';
import {Container, Toast} from 'react-bootstrap';

export const PortalRoutes = () => {
    return (
        <React.Fragment>
            <Navbar />
            <AppMainContainer>
                <Switch>
                    <Route path="/portal/profile">
                        <Modules.Profile />
                    </Route>
                    <Route path="/portal/billing">
                        <Modules.BillingAndPayments />
                    </Route>
                    <Route path="/portal/wallet">
                        <Container fluid>
                            <ModuleHeading>My Wallet</ModuleHeading>
                            <FundingSourcesWidget />
                        </Container>
                    </Route>
                    <Route path="/portal/statements">
                        statements
                        <Modules.StatementHistory />
                    </Route>
                    <Route path="/portal/preferences">
                        preferences
                        <Modules.Preferences />
                    </Route>
                    <Route path="/portal/usage">
                        usage
                        {/* <Usage /> */}
                    </Route>
                    <Route path="/portal/payment-history">
                        <Modules.PaymentHistory />
                    </Route>
                    <Route path="/portal/service">
                        service
                        {/* <ServiceRequests /> */}
                    </Route>
                    <Route path="/portal">
                        <Modules.FinancialHome />
                    </Route>
                </Switch>
            </AppMainContainer>
            {/* <Toast show={true} style={{position: 'absolute', top: 105, right: 25}} draggable>
                <Toast.Header>
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast> */}
            
        </React.Fragment>
    )
}