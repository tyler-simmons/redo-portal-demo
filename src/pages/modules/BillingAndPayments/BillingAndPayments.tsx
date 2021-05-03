import {useContext} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {Switch as RouterSwitch, Route} from 'react-router-dom';

import {db} from 'app/data';
import {Theme} from 'app/contexts';
import {ModuleHeading} from 'app/components';
import * as Widgets from 'app/widgets/Billing';

import {EnrollInAutoPay, ConfirmAutoPay} from './AutoPay';
import {MakeAPayment, ConfirmMakeAPayment, MakePaymentDone} from './Payments';

export const BillingAndPayments = () => {
	const theme = useContext(Theme.Context);

	return (
		<Container fluid>
			<RouterSwitch>
				<Route path="/portal/billing/autopay/confirm">
					<ConfirmAutoPay />
				</Route>
				<Route path="/portal/billing/autopay">
					<ModuleHeading>Schedule AutoPay</ModuleHeading>
					<EnrollInAutoPay />
				</Route>
				<Route path="/portal/billing/one-time/done">
					<MakePaymentDone />
				</Route>
				<Route path="/portal/billing/one-time/confirm">
					<ConfirmMakeAPayment />
				</Route>
				<Route path="/portal/billing/one-time">
					<ModuleHeading>Make a Payment</ModuleHeading>
					<MakeAPayment />
				</Route>
				
				<Route path="/portal/billing/payment-methods">
					<ModuleHeading>My Wallet</ModuleHeading>
					<Widgets.FundingSourcesWidget />
				</Route>
				<Route path="/portal/billing">
					<ModuleHeading>Payments</ModuleHeading>
					<Row>
						<Col>
							<Widgets.NewPaymentHistoryWidget />
						</Col>
					</Row>
				</Route>
			</RouterSwitch>
		</Container>
	);
};