import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepartmentModal} from './AddDepartmentModal';

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {deps: [], addModalShow: false};
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44370/api/department')
      .then(response => response.json())
      .then(data => {
        this.setState({deps: data});
      });
  }

  //method for refresh list
  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    let addModalClose = () => this.setState({addModalShow: false});
    return (
      <>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th> DepartmentID </th> <th> DepartmentName </th>
            </tr>
          </thead>
          <tbody>
            {this.state.deps
              .sort((a, b) => a.DepartmentID - b.DepartmentID)
              .map(dep => (
                <tr key={dep.DepartmentID}>
                  <td> {dep.DepartmentID} </td> <td> {dep.DepartmentName}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant="primary" onClick={() => this.setState({addModalShow: true})}>
            Add Department
          </Button>
          <AddDepartmentModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </>
    );
  }
}

export default Department;
