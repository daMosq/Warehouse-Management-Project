import React, { Componen, useState, setState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateItem = (props) => {
    const [name, setname] = useState('');
    const [availability, setavailability] = useState('')
    const [amount, setamount] = useState('');
    const [itemID, setitemID] = useState('')

    const changeName = event => setname(event.target.value)

    const changeAvailability = event => setavailability(event.target.value)

    const changeAmount = event => setamount(event.target.value)

    const changeItemID = event => setitemID(event.target.value)

    const onSubmit = event => {
        // make new item
        const newItem = {
            name,
            availability, 
            amount,
            itemID
        }

        // send to server
        axios.post('http://localhost:4000/item', newItem)
        .then(res => console.log(res.data))

        // clear state? unsure
        setState({
            name: '',
            availability: '',
            amount: 0,
            itemID: 0
        })
    }


    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            onChange={changeName}
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
                        <label>Amount: </label>
                        <input type="number"
                            className="form-control"
                            value={amount}
                            onChange={changeAmount}
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
                        <input type="submit" value="Create Item" className="btn btn-primary" />
                        <input
                            type="button" value="List" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                //window.location.href = '/dashboard';
                                //props.history.push('/items')
                                //window.location.href = '/';
                                //props.history.goBack()
                                //props.history.replace('/items');
                            }}
                        /> 
                        <input
                            type="button" value="Cancel" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                //window.location.href = '/dashboard';
                            }}
                        /> 
                    </div>
                </form>
            </div>
            
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
    );
}


export default CreateItem;