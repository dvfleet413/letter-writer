import React, { useState, useEffect } from 'react';
import { config } from '../constants';

const DNCList = (props) => { 
    const [addresses, setAddresses] = useState([])
    useEffect(() => {
        if(props.territoryId != 0){
            fetch(`${config.url.API_URL}/territories/${props.territoryId}/dncs`)
                .then(r => r.json())
                .then(d => setAddresses(d))
                .catch(e => console.log(e))
        }
    },[props.territoryId])

    const handleDeleteClick = (e, id) => {
        e.preventDefault()
        if (window.confirm("Are You sure you want to delete this do-not-call?")){
            const configObj = {
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json",
                    "accepts": "aplication/json"
                }
            }
            fetch(`${config.url.API_URL}/territories/${props.territoryId}/dncs/${id}`, configObj)
                .then(r => r.json())
                .then(d => console.log(d))
        }
    }

    const rows = addresses.map((address) => {
        return (
            <tr>
                <td>{address.address}</td>
                <td><button className="btn btn-warning">Edit</button></td>
                <td><button className="btn btn-danger" onClick={(e) => handleDeleteClick(e, address.id)}>Delete</button></td>
                </tr>
        )
    })

    console.log(addresses)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Address</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default DNCList;