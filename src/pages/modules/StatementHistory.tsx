import {Container, Row, Col} from 'react-bootstrap'
import {ModuleHeading} from 'app/components';
import {StatementHistoryWidget, DocumentsWidget} from 'app/widgets';

export const StatementHistory = () => {
    return (
        <Container fluid>
            <ModuleHeading>Document Archive</ModuleHeading>
            <Row >
                <Col className="mb-3">
                    <DocumentsWidget />
                </Col>

                <div className="w-100"/>

                {/* <Col>
                <StatementHistoryWidget />
                </Col> */}
               

            
            </Row>
            
            
        </Container>
    )
}