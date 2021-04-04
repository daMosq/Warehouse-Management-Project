import React, { Componen, useState, setState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateTruck = (props) => {
    const [driverName, setdriverName] = useState('');
    const [route, setroute] = useState('')
    const [status, setstatus] = useState('')
    const [eta, seteta] = useState('')
    const [state, setState] = useState('')
    

    const changeDriverName = event => setdriverName(event.target.value)

    const changeRoute = event => setroute(event.target.value)

    const changeStatus = event => setstatus(event.target.value)

    const changeEta = event => seteta(event.target.value)

    const onSubmit = event => {
        // make new truck
        event.preventDefault()

        const newTruck = {
            driverName,
            route,
            status,
            eta
        }

        // send to server
        axios.post('http://localhost:4000/truck', newTruck)
        .then(res => console.log(res.data))

        // clear state
        setState({
            driverName: '',
            route: '',
            status: '',
            eta: ''
        })
    }


    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Truck</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Driver Name: </label>
                        <input type="text"
                            className="form-control"
                            value={driverName}
                            onChange={changeDriverName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Route </label>
                        <input type="text"
                            className="form-control"
                            value={route}
                            onChange={changeRoute}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status </label>
                        <input type="text"
                            className="form-control"
                            value={status}
                            onChange={changeStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>ETA </label>
                        <input type="text"
                            className="form-control"
                            value={eta}
                            onChange={changeEta}
                        />
                    </div>
                  
                    <div className="form-group">
                        <input type="submit" value="Create Truck" className="btn btn-primary" />
                        <input
                            type="button" value="List" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = '/trucks';
                            }}
                        /> 
                        <input
                            type="button" value="Cancel" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = '/trucks';
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


export default CreateTruck;