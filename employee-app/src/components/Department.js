import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepartmentModal} from './AddDepartmentModal';
import {EditDepartmentModal} from './EditDepartmentModal';

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {deps: [], addModalShow: false, editModalShow: false};
  }

  //method for refresh list
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

  //function delete method
  deleteDepartment(depid) {
    if (window.confirm('Are you sure?')) {
      fetch('https://localhost:44370/api/department/' + depid, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  }

  render() {
    const {depid, depname} = this.state;
    let addModalClose = () => this.setState({addModalShow: false});
    let editModalClose = () => this.setState({editModalShow: false});

    return (
      <>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th> DepartmentID </th> <th> DepartmentName </th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {this.state.deps
              .sort((a, b) => a.DepartmentID - b.DepartmentID)
              .map(dep => (
                <tr key={dep.DepartmentID}>
                  <td> {dep.DepartmentID} </td> <td> {dep.DepartmentName}</td>
                  <td style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                      <Button
                        className="mr-2"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            depid: dep.DepartmentID,
                            depname: dep.DepartmentName
                          })
                        }>
                        Edit
                      </Button>

                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={() => this.deleteDepartment(dep.DepartmentID)}>
                        Delete
                      </Button>

                      <EditDepartmentModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        depid={depid}
                        depname={depname}
                      />
                    </div>
                  </td>
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
