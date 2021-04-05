import './dashboard.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';
import Modal from '../item-crud/create-item';
//import Modaldelete from '../item-crud/delete-item';
//import Modal from '../item-crud/delete-item';


class ItemDashboard extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            availability: '',
            amount: 0,
            itemID: 0,
            mongoData: [],
            
            editedData: {} // gonna be sent to the backend to update the db
        }
    }

    getItemsData = async () =>  {
        const itemRes = await axios.get('http://localhost:4000/items')
        this.setState({ loading: false, mongoData: itemRes.data.data })
        
    }

    componentDidMount() {
        this.getItemsData()
    }

    onEdit = (_id, rowIndex, column, newVal) => {
        const newData = [...this.state.mongoData]
        newData[rowIndex][column] = newVal
        console.log(JSON.stringify(newVal))
        const data = newData[rowIndex]
        axios.put('http://localhost:4000/item/' + data._id, data)
        
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
        axios.delete('http://localhost:4000/item/' + id)
        .then((res) => {
            console.log(res)
            this.getItemsData()
        })
    }

    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });

    render() {
        let columns = [
            {
                Header: 'Item Name',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: 'Availability',
                accessor: 'availability',
            },
            {
                Header: 'Amount Ordered',
                accessor: 'amount',
            },
            {
                Header: 'Item ID',
                accessor: 'itemID'
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
                        <Table deleteItem={this.deleteItem} columns={columns} data={this.state.mongoData} onEdit={this.onEdit} />
                    </div>
                    {/* <Row className="justify-content-md-center">
                        <Col md="6">
                        </Col>
                    </Row> */}
              
                <Button variant="primary" onClick={this.showModal}>
                Add Item
                </Button>
                <Modal show={this.state.showModal} refreshItems={this.getItemsData} onClose={this.hideModal} />
                
                
                {/* <Modal show={this.state.showModal} onClose={this.hideModal}/> */}
                </Container>
                
            </div>
        );
    }

}

export default ItemDashboard;