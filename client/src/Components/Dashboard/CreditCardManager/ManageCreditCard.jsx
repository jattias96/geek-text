import React, {useState, useEffect} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";

import "../CreditCardManager/ManageCreditCard.css"
import axios from 'axios';

// const URL = 'https://jsonplaceholder.typicode.com/users';

export const ManageCreditCard = () => {
    const [employees, setEmployees] = useState([]);

    // useEffect(() => {
    //    getDataPay();
    // }, []);

    // Get all creditcards for a user.
    const getDataPay = async () => { // const response = await axios.post("http://localhost:3001/payment/getpayment", {IdEmail: decoded.EmailAddressReg});
        const form_data = new FormData();
        const token = localStorage.getItem('token');
        const url = "http://localhost:5000/api/managing-credit-cardd";
        axios.post(url, form_data, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            console.log(res.data.creditCards);
            setEmployees(res.data.creditCards);
            // window.location.reload();
        }).catch(err => {
            console.log(err.response.data.msg);
        })


        /*console.log("Response" + response);*/
        /*setEmployees(response.data.results);*/
    };

    const renderHeader = () => {
        let headerElement = [
            "cardHolder     ",
            "cardNumber     ",
            "cardExpMonth   ",
            "cardExpYear    ",
            "cardCVC        ",
            "Update         ",
            "Delete         ",
        ];

        return headerElement.map((key, index) => {
            return <th key={index}>
                {
                key.toUpperCase()
            }</th>;
        });
    };

    // Remove Credit card info.
    const removeData = async (cardNumber) => { /*
    window.location.reload();
    */
        const form_data = new FormData();
        const token = localStorage.getItem('token');
        const url = "http://localhost:5000/api/deleting-credit-cardd";
        axios.post(url, form_data, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            console.log(res.data.creditCards);
            // setEmployees(res.data.creditCards);
            // window.location.reload();
        }).catch(err => {
            console.log(err.response.data.msg);
        })
        /*
    window.location.reload();
    */
        const del = employees.filter(employee => cardNumber !== employee.cardNumber);
        setEmployees(del);
    };

    const renderBody = () => {
        return(employees && employees.map(({
            cardHolder,
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC
        }) => {
            return (
                <tr key={cardNumber}>
                    <td>{cardHolder}</td>
                    <td>{cardNumber}</td>
                    <td>{cardExpMonth}</td>
                    <td>{cardExpYear}</td>
                    <td>{cardCVC}</td>
                    <td className="operation">
                        <button className="buttonUpdate"
                            /*onClick={
                                () => updateData(CardNumber)
                        }*/
                        >
                            Update
                        </button>
                    </td>
                    <td className="opration">
                        <button className="button"
                            onClick={
                                () => removeData(cardNumber)
                        }>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        }));
    };

    return (
        <div>
            <form className="personal-info-update-form">
                <h2>
                    Update credit card (s)
                </h2>

                <div className="container">
                    <table id="employee">
                        <thead>
                            <tr>{
                                renderHeader()
                            }</tr>
                        </thead>
                        <tbody>{
                            renderBody()
                        }</tbody>
                    </table>
                </div>

                <p className="btn-wrapper">
                    <span className="btn-cancel"
                        onClick={getDataPay}>
                        {/*Inline element*/}
                        Cancel
                    </span>
                </p>
            </form>

        </div>
    )
}
