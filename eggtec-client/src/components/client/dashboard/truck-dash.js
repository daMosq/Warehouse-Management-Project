import './dashboard.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';
//import Modal from '../item-crud/create-item';
import Modal from '../truck-crud/create-truck';
import TrailerModal from '../trailer-crud/create-trailer';

//import Modal from '../item-crud/delete-item';


class TruckDashboard extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            driverName: '',
            route: '',
            status: '',
            eta: '',
            trailerName: '',
            trailerInfo: '',
            trailerStatus: '',
            trailerCheckedOut: '',
            mongoData: [],
            moreMongoData: [],
            editedData: {} // gonna be sent to the backend to update the db
        }
    }

    async getTrucksData() {
        const truckRes = await axios.get('http://localhost:4000/trucks')
        this.setState({ loading: false, mongoData: truckRes.data.data })
    }

    async getTrailersData() {
        const trailerRes = await axios.get('http://localhost:4000/trailers')
        this.setState({ loading: false, moreMongoData: trailerRes.data.data })
    }

    componentDidMount() {
        this.getTrucksData()
        this.getTrailersData()
    }

    onEdit = (_id, rowIndex, column, newVal) => {
        const newData = [...this.state.mongoData]
        newData[rowIndex][column] = newVal
        console.log(JSON.stringify(newVal))
        const data = newData[rowIndex]
        axios.put('http://localhost:4000/truck/' + data._id, data)
        
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
    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });
    // need another handler for second modal 

    render() {
        let truckColumns = [
            {
                Header: 'Driver Name',
                accessor: 'driverName', // accessor is the "key" in the data
            },
            {
                Header: 'Route',
                accessor: 'route',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'ETA',
                accessor: 'eta'
            }
    

        ];

        let trailerColumns = [
            {
                Header: 'Trailer Name',
                accessor: 'trailerName', // accessor is the "key" in the data
            },
            {
                Header: 'Info',
                accessor: 'trailerInfo',
            },
            {
                Header: 'Status',
                accessor: 'trailerStatus',
            },
            {
                Header: 'Checked Out By',
                accessor: 'trailerCheckedOut'
            }
    

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
                        <Table columns={truckColumns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
                    <div className="mx-5">
                        {/* this is the other data table */}
                        <Table columns={trailerColumns} data={this.state.moreMongoData} onEdit={this.onEdit} />
                    </div>
                    {/* <Row className="justify-content-md-center">
                        <Col md="6">
                        </Col>
                    </Row> */}
                {/*
                <Button variant="primary" onClick={this.showModal}>
                Add Truck
                </Button>
                <Modal show={this.state.showModal} onClose={this.hideModal} />
                <Button variant="secondary" onClick={this.showModal}>
                Delete Truck
                </Button>
                <Modal show={this.state.showModal} onClose={this.hideModal}/>
                
                */ }
                <Button variant="primary" onClick={this.showModal}>
                Add Truck
                </Button>
                <Modal show={this.state.showModal} onClose={this.hideModal} />
                </Container>
            </div>
            
        );
    }

}

export default TruckDashboard;