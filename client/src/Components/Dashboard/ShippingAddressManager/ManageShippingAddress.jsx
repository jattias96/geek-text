import React, {useState} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';

export const ManageShippingAddress = () => {

    return (
        <div>
            <form className="personal-info-update-form">
                <h2>
                    Update shipping address(es)
                </h2>

                <p className="btn-wrapper">
                    <span className="btn-cancel">
                        {/*Inline element*/}
                        Cancel
                    </span>
                </p>
            </form>

        </div>
    )
}
