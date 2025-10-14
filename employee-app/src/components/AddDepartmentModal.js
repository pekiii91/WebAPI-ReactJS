import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';

export class AddDepartmentModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://localhost:44370/api/department', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        DepartmentName: event.target.DepartmentName.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          alert(result);
        },
        error => {
          alert('Failed in adding department');
        }
      );
  }

  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Department</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentName">
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      placeholder="DepartmentName"
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                      Add Department
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
