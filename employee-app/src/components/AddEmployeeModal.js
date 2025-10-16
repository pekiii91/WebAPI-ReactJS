import React, {Component} from 'react';
import {Modal, Button, Form, Col, Row} from 'react-bootstrap';
import SnackBar from '@mui/material/Snackbar';
import {IconButton} from '@mui/material';

export class AddEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {deps: [], snackbaropen: false, snackbarmsg: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //component data mount method for department
  componentDidMount() {
    fetch('https://localhost:44370/api/department')
      .then(response => response.json())
      .then(data => {
        this.setState({deps: data});
      });
  }

  //function for closing the snackbar
  snackbarClose = event => {
    this.setState({snackbaropen: false});
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://localhost:44370/api/employee', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        EmployeeID: null,
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        EmailID: event.target.EmailID.value,
        DateOfJoin: event.target.DateOfJoin.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({snackbaropen: true, snackbarmsg: result});
        },
        error => {
          this.setState({snackbaropen: true, snackbarmsg: 'Failed in adding employee'});
        }
      );
  }

  render() {
    return (
      <div className="container">
        <SnackBar
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
            <Modal.Title id="contained-modal-title-vcenter">Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*Polja Employee */}
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeeName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      placeholder="EmployeeName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Department" className="mt-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select">
                      {this.state.deps.map(dep => (
                        <option key={dep.DepartmentID}>{dep.DepartmentName}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="EmailID" className="mt-3">
                    <Form.Label>EmailID</Form.Label>
                    <Form.Control type="text" name="EmailID" required placeholder="EmailID" />
                  </Form.Group>

                  <Form.Group controlId="DateOfJoin" className="mt-3">
                    <Form.Label>DateOfJoin</Form.Label>
                    <Form.Control type="date" name="DateOfJoin" required placeholder="DateOfJoin" />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                      Add Employee
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
