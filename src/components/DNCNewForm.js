import React, { useState } from 'react';
import { config } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import uuid from 'uuid';

const DNCNewForm = (props) => {
    const [address, setAddress] = useState('')
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const today = new Date()
    let month = today.getMonth()
    if(month < 9){
        month = `0${month + 1}`
    } else {
        month += 1
    }
    const [date, setDate] = useState(`${today.getFullYear()}-${month}-${today.getDate()}`)
    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    // const [territoryId, setTerritoryId] = useState('0')
    // const handleTerritoryChange = (e) => {
    //     setTerritoryId(e.target.value)
    // }

    const submitDnc = (e) => {
        e.preventDefault()
        debugger
        const configObj = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "accepts": "application/json"
            },
            "body": JSON.stringify({
                "dnc": {
                    "address": address,
                    "territory_id": props.territoryId,
                    "date": date
                }
            })
        }
        fetch(`${config.url.API_URL}/congregations/${props.currentUser.congregation.id}/territories/${props.territoryId}/dncs`, configObj)
            .then(r=>r.json())
            .then(d => {
                setAddress('')
                props.handleFinishCreate()
            })
    } 

    return(
        <div className="dnc-form">
            <h3>Add New Do-Not-Call</h3>
            <form onSubmit={e => submitDnc(e)}>
                <div className="input-row">
                    <label htmlFor="address">Address:</label><input type="text" name="address" value={address} onChange={e => handleAddressChange(e)} />
                </div>
                <div className="input-row">
                    <label>Date:</label><input type="date" name="date" value={date} onChange={e => handleDateChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Add DNC" />
            </form>
            
            <FontAwesomeIcon icon={faTimesCircle} onClick={props.handleClose}/>
        </div>
    )
}

export default DNCNewForm;