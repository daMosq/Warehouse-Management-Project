import './dashboard.css';
import React, { Component } from 'react';
import axios from 'axios';

import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';

class EmployeeDashboard extends Component {
    constructor(props) {
        super(props)
        let sessionUser = JSON.parse(window.sessionStorage.getItem("currentUser"))
        this.state = {
            currentUser: sessionUser,
            // currentUserRole: sessionUser.role,
            loading: true,
            mongoData: [],
            editedData: {} // gonna be sent to the backend to update the db
        }
    }

    async getRegisterData() {
        const registerRes = await axios.get('http://localhost:4000/users')
        this.setState({ loading: false, mongoData: registerRes.data.data })
    }

    componentDidMount() {
        this.getRegisterData()
    }

    onEdit = (_id, rowIndex, column, newVal) => {
        const newData = [...this.state.mongoData]
        newData[rowIndex][column] = newVal
        //alert(JSON.stringify(newVal))
        //alert(JSON.stringify(newData[rowIndex]))
        const data = newData[rowIndex]
        axios.put('http://localhost:4000/user/' + data._id, data)
        
        this.setState(
            {
                mongoData: newData,
                editedData: { ...this.state.editedData, [_id]: { ...this.state.editedData[_id], [column]: newVal } }
            },
            () => {
                console.log(this.state.editedData)
            }
        )
        
    }


    render() {
        let columns = [
            {
                Header: 'First Name',
                accessor: 'firstName', // accessor is the "key" in the data
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Phone Number',
                accessor: 'phoneNumber',
            },
            {
                Header: 'E-mail',
                accessor: 'email',
            },

        ];
        let buttonLabel = '';
        let redirectTo = '';

        return (
            <div>
                
                <Container fluid>
                    <Row className="">
                        {/* <label>{this.state.currentUser.role}</label> */}
                        <br />
                    </Row>
                    <div className="mx-5">
                        {/* this is the data table */}
                        <Table columns={columns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
                    {/* <Row className="justify-content-md-center">
                        <Col md="6">
                        </Col>
                    </Row> */}

                </Container>
            </div>
        );
    }

}

export default EmployeeDashboard;