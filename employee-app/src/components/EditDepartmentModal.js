import React, {Component} from 'react';
import {Modal, Button, Row, Form, Col} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class EditDepartmentModal extends Component {
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
    fetch('https://localhost:44370/api/department', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        DepartmentID: event.target.DepartmentID.value,
        DepartmentName: event.target.DepartmentName.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({snackbaropen: true, snackbarmsg: result});
        },
        error => {
          this.setState({snackbaropen: true, snackbarmsg: 'Failed in updating department'});
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
            <Modal.Title id="contained-modal-title-vcenter">Edit Department </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentID">
                    <Form.Label>DepartmentID</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentID"
                      required
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="DepartmentID"
                    />
                  </Form.Group>

                  <Form.Group className="mt-3" controlId="DepartmentName">
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      defaultValue={this.props.depname}
                      placeholder="DepartmentName"
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                      Update Department
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
