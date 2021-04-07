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
            // truck
            driverName: '',
            vehicleModel: '',
            licensePlate: '',
            status: '',
            estDelivery: '',
            // trailer
            trailerMake: '',
            trailerModel: '',
            bodyType: '',
            trailerType: '',
            mechStatus: '',
            maintenance: '',

            mongoData: [],
            moreMongoData: [],
            editedData: {},
            trailEditedData: {} // gonna be sent to the backend to update the db
        }
    }

    getTrucksData = async () => {
        const truckRes = await axios.get('http://localhost:4000/trucks')
        this.setState({ loading: false, mongoData: truckRes.data.data })
    }

    getTrailersData = async () => {
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

        const trailerData = [...this.state.moreMongoData]
        trailerData[rowIndex][column] = newVal
        const trailData = trailerData[rowIndex]
        axios.put('http://localhost:4000/trailer' + trailData._id, trailData)
        
        this.setState(
            {
                mongoData: newData,
                editedData: { ...this.state.editedData, [_id]: { ...this.state.editedData[_id], [column]: newVal } }
            },
            {
                moreMongoData: trailerData,
                trailEditedData: {...this.state.trailEditedData, [_id]: {...this.state.trailEditedData[_id], [column]: newVal}}
            },
            () => {
                console.log(this.state.editedData)
                console.log(this.state.trailEditedData)
            }
        )
        
    }
    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });
    // need another handler for second modal 
    showTrailModal = () => this.setState({ showTrailModal: true});
    hideTrailModal = () => this.setState({ showTrailModal: false});

    deleteItem = (id) => {
        console.log(id)
        axios.delete('http://localhost:4000/truck/' + id)
        .then((res) => {
            console.log(res)
            this.getTrucksData()
        })
    }

    deleteTrailItem = (id) => {
        console.log(id)
        axios.delete('http://localhost:4000/trailer/' + id)
        .then((res) => {
            console.log(res)
            this.getTrailersData()
        })
    }

    render() {
        let truckColumns = [
            {
                Header: 'Driver Name',
                accessor: 'driverName', // accessor is the "key" in the data
            },
            {
                Header: 'Vehicle Model',
                accessor: 'vehicleModel',
            },
            {
                Header: 'License Plate',
                accessor: 'licensePlate',
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Estimated Delivery',
                accessor: 'estDelivery'
            }
    

        ];

        let trailerColumns = [
            {
                Header: 'Trailer Make',
                accessor: 'trailerMake', // accessor is the "key" in the data
            },
            {
                Header: 'Trailer Model',
                accessor: 'trailerModel',
            },
            {
                Header: 'Body Type',
                accessor: 'bodyType',
            },
            {
                Header: 'Trailer Type',
                accessor: 'trailerType'
            },
            {
                Header: 'Mechanical Status',
                accessor: 'mechStatus'
            },
            {
                Header: 'Next Maintenance',
                accessor: 'maintenance'
            }
    

        ];

        return (
            <div>
                
                <Container fluid>
                    <Row className="">
                       
                        <br />
                    </Row>
                    <div className="mx-5">
                        {/* this is the data table */}
                        <Table deleteItem={this.deleteItem} columns={truckColumns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
                    <div className="mx-5">
                        {/* this is the other data table */}
                        <Table deleteItem={this.deleteTrailItem} columns={trailerColumns} data={this.state.moreMongoData} onEdit={this.onEdit} />
                    </div>
                   
                <Button variant="primary" onClick={this.showModal}>
                Add Truck
                </Button>
                <Modal refreshTrucks={this.getTrucksData} show={this.state.showModal} onClose={this.hideModal} />

                <Button variant="secondary" onClick={this.showTrailModal}>
                Add Trailer
                </Button>
                <TrailerModal refreshTrailers={this.getTrailersData} show={this.state.showTrailModal} onClose={this.hideTrailModal} />
                </Container>
            </div>
            
        );
    }

}

export default TruckDashboard;