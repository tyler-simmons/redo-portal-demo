import {Container} from 'react-bootstrap'
import {ModuleHeading} from 'app/components';
import {StatementHistoryWidget} from 'app/widgets';

export const StatementHistory = () => {
    return (
        <Container fluid>
            <ModuleHeading>Statement History</ModuleHeading>
            <StatementHistoryWidget />
        </Container>
    )
}