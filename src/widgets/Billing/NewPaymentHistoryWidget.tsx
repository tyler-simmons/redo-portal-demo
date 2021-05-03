import React, {useContext, useState} from 'react';
import { Button as BsButton, Table, Modal, Form, Row, Col} from 'react-bootstrap';

import {Theme} from 'app/contexts';
import {ModuleCard, Button} from 'app/components';

export const NewPaymentHistoryWidget = () => {
    const theme = useContext(Theme.Context);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    return (
        <ModuleCard accent={theme.primary}>
            <h3>Payment History</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Payment Type</th>
                        <th>Payment Date</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Confirmation</th>
                        <th className="px-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>One Time</td>
                        <td>03/20/20</td>
                        <td>$101.25</td>
                        <td>VISA **1234</td>
                        <td>Completed</td>
                        <td><a href="#">#OKC5451</a></td>
                        <td><BsButton variant="link" className="text-danger font-weight-bold text-decoration-underline" onClick={handleShow}>Cancel</BsButton></td>
                    </tr>
                    <tr>
                        <td>One Time</td>
                        <td>03/20/20</td>
                        <td>$101.25</td>
                        <td>VISA **1234</td>
                        <td>Completed</td>
                        <td><a href="#">#OKC5451</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>One Time</td>
                        <td>03/20/20</td>
                        <td>$101.25</td>
                        <td>VISA **1234</td>
                        <td>Completed</td>
                        <td><a href="#">#OKC5451</a></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>One Time</td>
                        <td>03/20/20</td>
                        <td>$101.25</td>
                        <td>VISA **1234</td>
                        <td>Completed</td>
                        <td><a href="#">#OKC5451</a></td>
                        <td></td>
                    </tr>
                    {/* <tr>
                        <td>Payment Type</td>
                        <td>03/20/2020</td>
                        <td>Amount</td>
                        <td>Payment Method</td>
                        <td>Status</td>
                        <td>Confirmation</td>
                        <td></td>
                    </tr> */}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel AutoPay</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h3>Current Payment</h3>
                        <Row className="mb-2">
                            <Col>Account #:</Col>
                            <Col>2680001365</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>Payment Type:</Col>
                            <Col>AutoPay</Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>Status:</Col>
                            <Col>Scheduled</Col>
                        </Row>
                        <Row>
                            <Col>Confirmation #:</Col>
                            <Col>#OKC5451</Col>
                        </Row>

                            <hr></hr>

                        <Form className="mt-3">
                            <fieldset>
                                <Form.Group>
                                    <Form.Check className="font-weight-bold mb-3" type="radio" label='Cancel this payment of $101.25 due on 04/20/20. Your AutoPay preference will remain.'></Form.Check>
                                    <Form.Check className="font-weight-bold" type="radio" label='Cancel AutoPay enrollment for this account. Any existing AutoPay payments will also be cancelled.'></Form.Check>
                                </Form.Group>
                            </fieldset>
                            
                            
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleClose} colors={{background: '#dc3545', font: '#fff'}}>
                        Confirm
                    </Button>
                    <Button  onClick={handleClose} colors={{ font: "#fff", background: "#6c757d" }} >
                        Cancel
                    </Button>
                    </Modal.Footer>
            </Modal>
        </ModuleCard>
    )

}