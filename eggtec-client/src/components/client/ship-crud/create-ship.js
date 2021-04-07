import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateShip = (props) => {
    const [shipmentID, setshipmentID] = useState('');
    const [clientID, setclientID] = useState('');
    const [shipAddress, setshipAddress] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [deliveryCost, setdeliveryCost] = useState('');
    
    const changeShipmentID = event => setshipmentID(event.target.value)

    const changeClientID = event => setclientID(event.target.value)

    const changeShipAddress = event => setshipAddress(event.target.value)

    const changeProductPrice = event => setproductPrice(event.target.value)

    const changeDeliveryCost = event => setdeliveryCost(event.target.value)


    const onSubmit = event => {
        event.preventDefault()
        // make new item
        const newShip = {
            shipmentID,
            clientID,
            shipAddress,
            productPrice,
            deliveryCost
        }

        // send to server
        axios.post('http://localhost:4000/ship', newShip, { headers: { Authentication: localStorage.getItem('auth') } })
        .then(res => {
            console.log(res.data)
            setshipmentID(0)
            setclientID(0)
            setshipAddress('')
            setproductPrice('')
            setdeliveryCost('')

            props.onClose()
            props.refreshShips()
        });

    }
    

    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Shipment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Shipment ID: </label>
                        <input type="number"
                            className="form-control"
                            value={shipmentID}
                            onChange={changeShipmentID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Client ID: </label>
                        <input type="number"
                            className="form-control"
                            value={clientID}
                            onChange={changeClientID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Shipping Address: </label>
                        <input type="text"
                            className="form-control"
                            value={shipAddress}
                            onChange={changeShipAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Price: </label>
                        <input type="text"
                            className="form-control"
                            value={productPrice}
                            onChange={changeProductPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Delivery Cost: </label>
                        <input type="text"
                            className="form-control"
                            value={deliveryCost}
                            onChange={changeDeliveryCost}
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


export default CreateShip;