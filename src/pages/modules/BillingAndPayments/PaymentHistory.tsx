import {Container} from 'react-bootstrap'
import {ModuleHeading} from 'app/components';
import * as Widgets from 'app/widgets/Billing';

export const PaymentHistory = () => {
    return (
        <Container fluid>
            <ModuleHeading>PaymentHistory</ModuleHeading>
            <Widgets.NewPaymentHistoryWidget />
        </Container>
    )
}