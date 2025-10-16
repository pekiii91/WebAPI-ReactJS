import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmployeeModal} from './AddEmployeeModal';
import {EditEmployeeModal} from './EditEmployeeModal';

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {emps: [], addModalShow: false, editModalShow: false};
  }

  //method for refresh list
  componentDidMount() {
    //Add condition not to repeat infinite refresh
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44370/api/employee')
      .then(response => response.json())
      .then(data => {
        this.setState({emps: data});
      });
  }

  componentDidUpdate() {
    this.refreshList();
  }

  //function delete method
  deleteEmployee(empid) {
    if (window.confirm('Are you sure?')) {
      fetch('https://localhost:44370/api/employee/' + empid, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  }

  render() {
    const {empid, empname, dempt, emailid, doj} = this.state;
    let addModalClose = () => this.setState({addModalShow: false});
    let editModalClose = () => this.setState({editModalShow: false});
    return (
      <>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th> EmployeeID </th>
              <th> EmployeeName </th>
              <th> Department </th>
              <th> EmailID </th>
              <th> DateOfJoin </th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {this.state.emps
              .sort((a, b) => a.EmployeeID - b.EmployeeID)
              .map(emp => (
                <tr key={emp.EmployeeID}>
                  <td> {emp.EmployeeID} </td>
                  <td> {emp.EmployeeName} </td>
                  <td> {emp.Department} </td>
                  <td> {emp.EmailID} </td>
                  <td> {emp.DateOfJoin} </td>
                  <td style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                      <Button
                        className="mr-2"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            empid: emp.EmployeeID,
                            empname: emp.EmployeeName,
                            depmt: emp.Department,
                            emailid: emp.EmailID,
                            doj: emp.DateOfJoin
                          })
                        }>
                        Edit
                      </Button>

                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={() => this.deleteEmployee(emp.EmployeeID)}>
                        Delete
                      </Button>

                      <EditEmployeeModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        empid={empid}
                        empname={empname}
                        depmt={dempt}
                        emailid={emailid}
                        doj={doj}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary" onClick={() => this.setState({addModalShow: true})}>
            Add Employee
          </Button>
          <AddEmployeeModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </>
    );
  }
}

export default Employee;
