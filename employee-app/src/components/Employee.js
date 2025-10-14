import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmployeeModal} from './AddEmployeeModal';

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {emps: [], addModalShow: false};
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44370/api/employee')
      .then(response => response.json())
      .then(data => {
        this.setState({emps: data});
      });
  }
  //method for refresh list
  componentDidUpdate() {
    //Add condition not to repeat infinite refresh
    this.refreshList();
  }

  render() {
    let addModalClose = () => this.setState({addModalShow: false});
    return (
      <>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th> EmployeeID </th> <th> EmployeeName </th> <th> Department </th>
              <th> DateOfJoining </th>
            </tr>
          </thead>
          <tbody>
            {this.state.emps
              .sort((a, b) => a.EmployeeID - b.EmployeeID)
              .map(emp => (
                <tr key={emp.EmployeeID}>
                  <td> {emp.EmployeeID} </td> <td> {emp.EmployeeName} </td>
                  <td> {emp.Department} </td> <td> {emp.DateOfJoining} </td>
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
