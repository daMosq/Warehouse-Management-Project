import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateItem = (props) => {
    const [itemName, setitemName] = useState('')
    const [itemID, setitemID] = useState('')
    const [availability, setavailability] = useState('')
    const [quantity, setquantity] = useState(''); 
    const [unitPrice, setunitPrice] = useState('');
    
    

    const changeitemName = event => setitemName(event.target.value)

    const changeItemID = event => setitemID(event.target.value)

    const changeAvailability = event => setavailability(event.target.value)

    const changeQuantity = event => setquantity(event.target.value)

    const changeUnitPrice = event => setunitPrice(event.target.value)

    

    const onSubmit = event => {
        event.preventDefault()
        // make new item
        const newItem = {
            itemName,
            itemID,
            availability, 
            quantity,
            unitPrice,
            
        }

        // send to server
        axios.post('http://localhost:4000/item', newItem, { headers: { Authentication: localStorage.getItem('auth') } })
        .then(res => {
            console.log(res.data)
            setitemName('')
            setitemID(0)
            setavailability('')
            setquantity(0)
            setunitPrice('')
            
            props.onClose()
            props.refreshItems()
        });

    }
    // need useEffect?

    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Item Name: </label>
                        <input type="text"
                            className="form-control"
                            value={itemName}
                            onChange={changeitemName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Item ID: </label>
                        <input type="number"
                            className="form-control"
                            value={itemID}
                            onChange={changeItemID}
                        />
                    </div>
                    <div className="form-group">
                        <label>Availability: </label>
                        <input type="text"
                            className="form-control"
                            value={availability}
                            onChange={changeAvailability}
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number"
                            className="form-control"
                            value={quantity}
                            onChange={changeQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <label>Unit Price: </label>
                        <input type="text"
                            className="form-control"
                            value={unitPrice}
                            onChange={changeUnitPrice}
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


export default CreateItem;