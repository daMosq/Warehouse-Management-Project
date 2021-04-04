import React, { Component, useState, setState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const DeleteItem = (props) => {
    const [name, setname] = useState('');
    const [availability, setavailability] = useState('');
    const [amount, setamount] = useState('');
    const [itemID, setitemID] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const [state, setState] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:4000/items/' + props.match.params.id)
        .then(res => {
            console.log(res.data)
            // supposed to push to dashboard that displays list of items
            props.history.push('/itemlist');
        })
        .catch(function (error) {
            console.log(error)
        });
        // unsure about this
        setState(prevState => ({
            ...prevState,
            'successMessage': 'Item not deleted. Try again'
        }))
    }
    // missing useEffect to get items from database


    return (
        < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
                <form onSubmit={onSubmit}>
                <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Availability: </label>
                        <input type="text"
                            className="form-control"
                            value={availability}
                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input type="number"
                            className="form-control"
                            value={amount}
                            
                        />
                    </div>
                    <div className="form-group">
                        <label>Item ID: </label>
                        <input type="number"
                            className="form-control"
                            value={itemID}
                        
                        />
                    </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Delete Item" className="btn btn-primary" />

                        <input
                            type="button" value="Cancel" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                // supposed to redirect to dashboard that displays list of items
                                window.location.href = '/items';
                            }}
                        />
                    </div>

                    <div className="alert alert-success mt-2" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
                        {successMessage}
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
				<Button variant="secondary" onClick={props.onClose}>
					Close
					</Button>
				<Button variant="primary" onClick={() => console.log('submitted')}>
					Save Changes
					</Button>
			    </Modal.Footer >
            </Modal>
    )
}
export default DeleteItem;