import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateTruck = (props) => {

    const [driverName, setdriverName] = useState('');
    const [vehicleModel, setvehicleModel] = useState('');
    const [licensePlate, setlicensePlate] = useState('');
    const [status, setstatus] = useState('');
    const [estDelivery, setestDelivery] = useState('');
    
    const changeDriverName = event => setdriverName(event.target.value)

    const changeVehicleModel = event => setvehicleModel(event.target.value)

    const changeLicensePlate = event => setlicensePlate(event.target.value)

    const changeStatus = event => setstatus(event.target.value)

    const changeEstDelivery = event => setestDelivery(event.target.value)
    
    const onSubmit = event => {
        event.preventDefault()
        // make new truck
        const newTruck = {
            driverName,
            vehicleModel,
            licensePlate,
            status,
            estDelivery
        }

        // send to server
        axios.post('http://localhost:4000/truck', newTruck, { headers: { Authentication: localStorage.getItem('auth') } })
        .then(res => {
            console.log(res.data)
            setdriverName('')
            setvehicleModel('')
            setlicensePlate('')
            setstatus('')
            setestDelivery('')

            props.onClose()
            props.refreshTrucks()
        });

    }
    // need useEffect?

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
                        <label>Vehicle Model: </label>
                        <input type="text"
                            className="form-control"
                            value={vehicleModel}
                            onChange={changeVehicleModel}
                        />
                    </div>
                    <div className="form-group">
                        <label>License Plate: </label>
                        <input type="text"
                            className="form-control"
                            value={licensePlate}
                            onChange={changeLicensePlate}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input type="text"
                            className="form-control"
                            value={status}
                            onChange={changeStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Estimated Delivery: </label>
                        <input type="text"
                            className="form-control"
                            value={estDelivery}
                            onChange={changeEstDelivery}
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


export default CreateTruck;