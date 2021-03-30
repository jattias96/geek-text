import pkg from 'formidable';
const {IncomingForm} = pkg;
import {user} from '../../models/userModel.js';

class AccountManager {
    UpdateUserInfo(request, response) {
        const form = new IncomingForm();
        try {
            form.parse(request, async (error, fields, files) => {
                if (error) {
                    return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
                }
                a
                const {name, email, nickname, home_address} = fields; // Expecting at least one data from the list
                if (!name && !email && !nickname && !home_address) {
                    return response.status(400).json({msg: 'At least 1 field is required'})
                }

                const userSession = request.user.data;
                const user_email = userSession.email;
                const isUserExisting = await user.findOne({email: user_email});

                if (! isUserExisting) {
                    return response.status(404).json({msg: 'Account with this e-mail does not exist'})
                }

                const userDoc = isUserExisting;
                console.log(userDoc);

                userDoc.name = name ? name : userDoc.name;
                userDoc.email = email ? email : userDoc.email;
                userDoc.nickname = nickname ? nickname : userDoc.nickname;
                userDoc.homeAddress = home_address ? home_address : userDoc.homeAddress;

                // console.log(userDoc);//Log out the user doc

                const updatedDoc = await user.findOneAndUpdate({
                    email: user_email
                }, userDoc, {new: true})
                return response.status(200).json({msg: 'Personal information updated'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }
    }

    AddCreditCard(request, response) {

        const form = new IncomingForm();

        try {

            form.parse(request, async (error, fields, files) => {
                if (error) {
                    return response.status(500).json({msg: 'Failed to add new credit card info'})
                }

                const {
                    cardHolder,
                    cardNumber,
                    cardExpMonth,
                    cardExpYear,
                    cardCVC
                } = fields;

                if (!cardHolder || !cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
                    return response.status(400).json({msg: "All fields are required"})
                }
                const userSession = request.user.data;
                const user_email = userSession.email;
                const userDoc = await user.findOne({email: user_email})

                userDoc.creditCards.push({
                    cardHolder,
                    cardNumber,
                    cardExpMonth,
                    cardExpYear,
                    cardCVC
                })

                const updatedDoc = await user.findOneAndUpdate({
                    email: user_email
                }, userDoc, {new: true});

                return response.status(200).json({msg: 'Credit card information added'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Failed to add new credit card info'})
        }

    }

    InsertCreditCard(request, response) {
        const form = new IncomingForm();
        try {
            form.parse(request, async (error, fields, files) => {
                console.log("TATAKAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");


                if (error) {
                    return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
                }

                const {ArrayCreditCard} = fields; // Expecting at least one data from the list
                var user_email = "bloodfear@arete.com";
                const userSession = request.user.data;
                console.log("TATAKAE1" + request.user.data);
                console.log("TATAKAE2" + request.user.data.creditCards);

                const isUserExisting = await user.findOne({email: user_email});

                if (! isUserExisting) {
                    return response.status(404).json({msg: 'Account with this e-mail does not exist'})
                }

                const userDoc = isUserExisting;
                console.log(userDoc);


                userDoc.creditCards = ArrayCreditCard ? ArrayCreditCard : userDoc.creditCards;

                console.log("Array3" + userDoc.creditCards);


                return response.status(200).json({msg: 'CC information updated'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }
    }

    AddShippingAddress(request, response) {

        const form = new IncomingForm();

        try {

            form.parse(request, async (error, fields, files) => {
                if (error) {
                    return response.status(500).json({msg: 'Failed to add new shipping address info'})
                }

                const {
                    street,
                    city,
                    state,
                    postalCode,
                    country
                } = fields;

                if (!street || !city || !state || !postalCode || !country) {
                    return response.status(400).json({msg: "All fields are required"})
                }
                const userSession = request.user.data;
                const user_email = userSession.email;
                const userDoc = await user.findOne({email: user_email})

                userDoc.shippingAddress.push({
                    street,
                    city,
                    state,
                    postalCode,
                    country
                })

                const updatedDoc = await user.findOneAndUpdate({
                    email: user_email
                }, userDoc, {new: true});

                return response.status(200).json({msg: 'Shipping Address information added'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Failed to add new shipping address info'})
        }

    }
}

export {
    AccountManager
}
