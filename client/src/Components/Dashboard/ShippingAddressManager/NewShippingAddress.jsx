import React, {useState} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';

export const NewShippingAddress = () => {

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const BlankValidation = () => {
        if (!street && !city && !state && !postalCode && !country) {
            alert('At least 1 field is required');
        }
    }

    const cancelFunc = () => {
        window.location.replace("http://localhost:3000/dashboard");
    }

    const UpdateInfo = (e) => {
        e.preventDefault();

        BlankValidation();

        const baseURL = {
            dev: "http://localhost:3000/api/personal-info",
            prod: ''
        }
    }
    return (
        <div>
            <form className="personal-info-update-form">
                <h2>
                    Add new Shipping Address
                </h2>
                <label>Street</label>
                <input type="text" placeholder="4 Yawkey Way"/>
                <label>City</label>
                <input type="text" placeholder="Boston"/>
                <label>State</label>
                <input type="text" placeholder="MA"/>
                <label>Postal Code</label>
                <input type="text" placeholder="022215"/>
                <label style={
                    {marginTop: "1rem"}
                }>Country</label>
                <input type="text" placeholder="USA"/>
                <p className="btn-wrapper">
                    <span onClick={UpdateInfo}
                        className="btn-update-info">
                        {/*Inline element*/}
                        Add New Address
                    </span>
                    <span onClick={cancelFunc}
                        className="btn-cancel">
                        {/*Inline element*/}
                        Cancel
                    </span>
                </p>
            </form>
            <h2></h2>
            <h2></h2>
            <h2></h2>

        </div>
    )
}
