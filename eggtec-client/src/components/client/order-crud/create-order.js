import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateOrder = (props) => {
    const [orderDate, setorderDate] = useState('');
    const [itemOrdered, setitemOrdered] = useState('');
    const [amount, setamount] = useState('');
    const [orderStatus, setorderStatus] = useState('');
    const [schedDelivery, setschedDelivery] = useState('');
    const [address, setaddress] = useState('');
    

    const changeOrderDate = event => setorderDate(event.target.value)

    const changeitemOrdered = event => setitemOrdered(event.target.value)

    const changeAmount = event => setamount(event.target.value)

    const changeOrderStatus = event => setorderStatus(event.target.value)

    const changeSchedDelivery = event => setschedDelivery(event.target.value)

    const changeAddress = event => setaddress(event.target.value)

    const onSubmit = event => {
        event.preventDefault()
        // make new item
        const newOrder = {
            orderDate,
            itemOrdered, 
            amount,
            orderStatus,
            schedDelivery,
            address
        
        }

        // send to server
        axios.post('http://localhost:4000/order', newOrder, { headers: { Authentication: localStorage.getItem('auth') } })
        .then(res => {
            console.log(res.data)
            setorderDate('')
            setitemOrdered('')
            setamount('')
            setorderStatus('')
            setschedDelivery('')
            setaddress('')
            
            props.onClose()
            props.refreshOrders()
        });

    }
    

    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Order Date: </label>
                        <input type="text"
                            className="form-control"
                            value={orderDate}
                            onChange={changeOrderDate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Item Ordered: </label>
                        <input type="text"
                            className="form-control"
                            value={itemOrdered}
                            onChange={changeitemOrdered}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount Ordered: </label>
                        <input type="text"
                            className="form-control"
                            value={amount}
                            onChange={changeAmount}
                        />
                    </div>
                    <div className="form-group">
                        <label>Order Status: </label>
                        <input type="text"
                            className="form-control"
                            value={orderStatus}
                            onChange={changeOrderStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Scheduled Delivery: </label>
                        <input type="text"
                            className="form-control"
                            value={schedDelivery}
                            onChange={changeSchedDelivery}
                        />
                    </div>
                    <div className="form-group">
                        <label>Destination Address: </label>
                        <input type="text"
                            className="form-control"
                            value={address}
                            onChange={changeAddress}
                        />
                    </div>
                  
                </form>
            </div>
            
            </Modal.Body>
            <Modal.Footer>
				<Button variant="secondary" onClick={props.onClose}>
					Close
					</Button>
				<Button variant="primary" onClick={onSubmit}>
					Save Changes
					</Button>
			</Modal.Footer >
            </Modal>
    );
}


export default CreateOrder;