import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateTrailer = (props) => {

    const [trailerMake, settrailerMake] = useState('');
    const [trailerModel, settrailerModel] = useState('');
    const [bodyType, setbodyType] = useState('');
    const [trailerType, settrailerType] = useState('');
    const [mechStatus, setmechStatus] = useState('');
    const [maintenance, setmaintenance] = useState('');

    const changeTrailerMake = event => settrailerMake(event.target.value)

    const changeTrailerModel = event => settrailerModel(event.target.value)

    const changeBodyType = event => setbodyType(event.target.value)

    const changeTrailerType = event => settrailerType(event.target.value)

    const changeMechStatus = event => setmechStatus(event.target.value)

    const changeMaintenance = event => setmaintenance(event.target.value)
    
    const onSubmit = event => {
        event.preventDefault()
        // make new trailer
        const newTrailer = {
            trailerMake,
            trailerModel,
            bodyType,
            trailerType,
            mechStatus,
            maintenance
        }

        // send to server
        axios.post('http://localhost:4000/trailer', newTrailer, { headers: { Authentication: localStorage.getItem('auth') } })
        .then(res => {
            console.log(res.data)
            settrailerMake('')
            settrailerModel('')
            setbodyType('')
            settrailerType('')
            setmechStatus('')
            setmaintenance('')

            props.onClose()
            props.refreshTrailers()
        });

    }
    

    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Trailer Make: </label>
                        <input type="text"
                            className="form-control"
                            value={trailerMake}
                            onChange={changeTrailerMake}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trailer Model:  </label>
                        <input type="text"
                            className="form-control"
                            value={trailerModel}
                            onChange={changeTrailerModel}
                        />
                    </div>
                    <div className="form-group">
                        <label>Body Type: </label>
                        <input type="text"
                            className="form-control"
                            value={bodyType}
                            onChange={changeBodyType}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trailer Type: </label>
                        <input type="text"
                            className="form-control"
                            value={trailerType}
                            onChange={changeTrailerType}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mechanical Status: </label>
                        <input type="text"
                            className="form-control"
                            value={mechStatus}
                            onChange={changeMechStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Next Maintenance: </label>
                        <input type="text"
                            className="form-control"
                            value={maintenance}
                            onChange={changeMaintenance}
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


export default CreateTrailer;