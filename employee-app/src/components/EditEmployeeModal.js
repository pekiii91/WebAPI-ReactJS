import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {snackbaropen: false, snackbarmsg: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //function for closing the snackbar
  snackbarClose = event => {
    this.setState({snackbaropen: false});
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://localhost:44370/api/employee', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        EmployeeID: event.target.EmployeeID.value,
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        DateOfJoining: event.target.DateOfJoining.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({snackbaropen: true, snackbarmsg: result});
        },
        error => {
          this.setState({snackbaropen: true, snackbarmsg: 'Failed in updating employee'});
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.snackbarClose}>
              ×
            </IconButton>
          ]}
        />
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Edit Employee </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeeID">
                    <Form.Label>EmployeeID</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeID"
                      required
                      disabled
                      defaultValue={this.props.empid}
                      placeholder="EmployeeID"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="EmployeeName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      defaultValue={this.props.empname}
                      placeholder="EmployeeName"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="Department"
                      required
                      defaultValue={this.props.depname}
                      placeholder="Department"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="DateOfJoining">
                    <Form.Label>DateOfJoining</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOfJoining"
                      required
                      defaultValue={this.props.doj}
                      placeholder="DateOfJoining"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                      Update Employee
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
