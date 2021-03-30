import React, {useState, useEffect} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';

// const URL = 'https://jsonplaceholder.typicode.com/users';

export const ManageCreditCard = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getDataPay();
    }, []);

    // Get all payments for a user.
    const getDataPay = async () => { // const response = await axios.post("http://localhost:3001/payment/getpayment", {IdEmail: decoded.EmailAddressReg});
        const response = await axios.get(URL);
        setEmployees(response.data.results);
    };

    const renderHeader = () => {
        let headerElement = [
            "cardHolder",
            "cardNumber",
            "cardExpMonth",
            "cardExpYear",
            "cardCVC",
            "Update",
            "Delete",
        ];

        return headerElement.map((key, index) => {
            return <th key={index}>
                {
                key.toUpperCase()
            }</th>;
        });
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
                    <td className="opration">
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
                            /*onClick={
                                () => removeData(CardNumber)
                        }*/
                        >
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
                    <span className="btn-cancel">
                        {/*Inline element*/}
                        Cancel
                    </span>
                </p>
            </form>

        </div>
    )
}
