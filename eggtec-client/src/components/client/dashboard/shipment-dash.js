import './dashboard.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';
import Modal from '../ship-crud/create-ship';



class ShipmentDashboard extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            shipmentID: 0,
            clientID: 0,
            shipAddress: '',
            productPrice: '',
            deliveryCost: '',
            mongoData: [],
            loading: false,
            editedData: {} // gonna be sent to the backend to update the db
        }
    }

    getShipsData = async () =>  {
        const shipRes = await axios.get('http://localhost:4000/ships')
        this.setState({ loading: false, mongoData: shipRes.data.data })
        
    }

    componentDidMount() {
        this.getShipsData()
    }

    onEdit = (_id, rowIndex, column, newVal) => {
        const newData = [...this.state.mongoData]
        newData[rowIndex][column] = newVal
        console.log(JSON.stringify(newVal))
        const data = newData[rowIndex]
        axios.put('http://localhost:4000/ship/' + data._id, data)
        
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

    deleteItem = (id) => {
        console.log(id)
        axios.delete('http://localhost:4000/ship/' + id)
        .then((res) => {
            console.log(res)
            this.getShipsData()
        })
    }

    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });

    render() {
        let columns = [
            {
                Header: 'Shipment ID',
                accessor: 'shipmentID', // accessor is the "key" in the data
            },
            {
                Header: 'Client ID',
                accessor: 'clientID',
            },
            {
                Header: 'Shipping Address',
                accessor: 'shipAddress',
            },
            {
                Header: 'Product Price',
                accessor: 'productPrice'
            },
            {
                Header: 'Delivery Cost',
                accessor: 'deliveryCost'
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
                        <Table deleteItem={this.deleteItem} columns={columns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
                    
              
                <Button variant="primary" onClick={this.showModal}>
                Add Shipment
                </Button>
                <Modal show={this.state.showModal} refreshShips={this.getShipsData} onClose={this.hideModal} />
                
                </Container>
                
            </div>
        );
    }

}

export default ShipmentDashboard;