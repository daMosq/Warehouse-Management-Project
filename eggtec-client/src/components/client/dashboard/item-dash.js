import './dashboard.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';
import Modal from '../item-crud/create-item';



class ItemDashboard extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            itemName: '',
            itemID: 0,
            availability: '',
            quantity: 0,
            unitPrice: '',
            
            mongoData: [],
            loading: false,
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
/*
    componentDidUpdate(){
        if(this.state.loading == true){
            this.getItemsData()
        }
        
    }
*/
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
            //this.setState({loading: true})
            //alert('Delete')
            this.getItemsData()
            //this.forceUpdate()
            //this.props.refreshItems()
        })
    }

    showModal = () => this.setState({ showModal: true });
    hideModal = () => this.setState({ showModal: false });

    render() {
        
        let columns = [
            {
                Header: 'Item Name',
                accessor: 'itemName', // accessor is the "key" in the data
            },
            {
                Header: 'Item ID',
                accessor: 'itemID',
            },
            {
                Header: 'Availability',
                accessor: 'availability',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity'
            },
            {
                Header: 'Unit Price',
                accessor: 'unitPrice'
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
                Add Item
                </Button>
                <Modal show={this.state.showModal} refreshItems={this.getItemsData} onClose={this.hideModal} />
                
                </Container>
                
            </div>
        );
    }

}

export default ItemDashboard;