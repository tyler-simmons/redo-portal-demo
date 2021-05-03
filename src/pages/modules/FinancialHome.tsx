import {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {ModuleHeading} from 'app/components';
import * as HW from 'app/widgets/Home';

export const FinancialHome = () => {
	const [currentAccount, setCurrentAccount] = useState({
		AccountNumber: '',
		Street: '',
		City: '',
		Zip: 0,
		FirstName: '',
		LastName: '',
		PremiseType: '',
		CurrentBalance: 0,
		AutoPayEnabled: false,
		DueDate: '',
		PastPayment: '',
		LastStatementAmount: 0,
		LastMonthUsage: 0,
		AverageDailyUsage: 0,
		LastYearUsage: 0,
	});

	return (
		<Container fluid>
			<ModuleHeading>Overview</ModuleHeading>
			<Row>
				<Col>
					<HW.LoanOverviewWidget updateAccount={setCurrentAccount} />
				</Col>
				{/* <Col>
					<HW.UsageSnapshotWidget currentAccount={currentAccount} />
				</Col> */}
			</Row>
			<Row className="mt-4">
				<Col sm={12}>
					<HW.RecentActivityWidget />
				</Col>
				<Col sm={12}>
					<HW.DashboardMessageWidget />
				</Col>
			</Row>
		</Container>
	);
};