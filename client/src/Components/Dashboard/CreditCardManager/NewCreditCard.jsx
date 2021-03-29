import React, {useState} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';

export const NewCreditCard = () => {
    const [cardHolder, setcardHolder] = useState("");
    const [cardNumber, setcardNumber] = useState("");
    const [expirationMonth, setexpirationMonth] = useState("");
    const [expirationYear, setexpirationYear] = useState("");
    const [securityNumber, setsecurityNumber] = useState("");

    const handleChangeLoginManager = (e) => {
        switch (e.target.id) {
            case "cardHolder":
                setcardHolder(e.target.value);
                break;
            case "cardNumber":
                setcardNumber(e.target.value);
                break;
            case "expirationMonth":
                setexpirationMonth(e.target.value);
                break;
            case "expirationYear":
                setexpirationYear(e.target.value);
                break;
            case "securityNumber":
                setsecurityNumber(e.target.value);
                break;
            default:
                break;
        }
    }

    const testingVars = () => {
        try {
            console.log(cardHolder);
            console.log(cardNumber);
            console.log(expirationMonth);
            console.log(expirationYear);
            console.log(securityNumber);
            checkCreditCardValidation();
        } catch (e) {
            alert(e);
            window.location.reload();
            return;
        }

    }
    // Check CreditCard Arrow Function.
    const checkCreditCardValidation = () => {
        /* Initialization.*/
        /* Date Class Import statement. */
        var today = new Date();
        const CreditCardNumberTmp = cardNumber;
        const ExpMonthTmp = expirationMonth;
        const ExpYearTmp = expirationYear;
        const lowercase = /[a-z]/;
        const upercase = /[A-Z]/;
        const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        /* Credit Card Number can be only Numbers */
        if (lowercase.test(CreditCardNumberTmp) || upercase.test(CreditCardNumberTmp) || symbol.test(CreditCardNumberTmp)) {
            throw "CreditCardNumber Must be numbers";
        }

        /* Getting month. */
        var mm = today.getMonth() + 1;

        /* Getting Full Year. */
        var yyyy = today.getFullYear();

        /* Checking the year. */
        if (ExpYearTmp < yyyy) {
            throw "Credit Card has expired check your year.";
        }

        /* Checking for the month */
        if (ExpYearTmp == yyyy && ExpMonthTmp < mm) {
            throw "Credit Card has expired check your month.";
        }
    };
    const cancelFunc = () => {
        window.location.replace("http://localhost:3000/dashboard");
    }

    return (
        <div>
            <form className="personal-info-update-form">
                <h2>
                    Add new credit card
                </h2>
                <label>Card Holder</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="cardHolder"
                    placeholder="Enter card holder"/>
                <label>Card Number</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="cardNumber"
                    placeholder="Enter Card Number"/>
                <label>Expiration date</label>
                <span>
                    <input onChange={handleChangeLoginManager}
                        type="text"
                        id="expirationMonth"
                        placeholder="Enter exp month"/>
                    <input onChange={handleChangeLoginManager}
                        type="text"
                        id="expirationYear"
                        placeholder="Enter exp year"/>
                </span>
                <label style={
                    {marginTop: "1rem"}
                }>CVC</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="securityNumber"
                    placeholder="Enter security number"/>


                <p className="btn-wrapper">
                    <span className="btn-update-info"
                        onClick={testingVars}>
                        {/*Inline element*/}
                        Add Credit Card
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
