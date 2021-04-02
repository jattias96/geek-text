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
            const body = request.body;
            console.log(body);
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
                console.log('fileds', fields)

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
    // OJO
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
                console.log('fireedd to create shipping')

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

    getCreditCard(request, response) {
        try {

            const userSession = request.user.data;
            const user_email = userSession.email;
            const isUserExisting = user.findOne({email: user_email});

            if (! isUserExisting) {
                return response.status(404).json({msg: 'Account with this e-mail does not exist'})
            }

            console.log();

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }
    }


    getttCreditCard(request, response) {
        try {
            // console.log("I got here");
            // const user_email = "luis1@gmail.com";
            const userSession = request.user.data;
            const user_email = userSession.email;

            user.findOne({
                email: user_email
            }, {
                id: true,
                creditCards: true
            }).then(result => { // console.log("RESULTCICOKS: " + result);
                return response.send(result);
            })

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }
    }

    deleteCreditCard(request, response) {
        try {
            console.log("I got DELETE");

            const userSession = request.user.data;
            const user_email = userSession.email;
            console.log(user_email)
            /*
            const {cardNumber} = fields;
            console.log("user_cardNumber" + cardNumber);
*/
            console.log("lambooooooooooooooooooooooooooooo");

            user.findOneAndUpdate({
                email: user_email
            }, {
                $pull: {
                    creditCards: {
                        cardNumber: "111111111"
                    }
                }
            }).then(result => { // console.log("RESULTLAMB: " + result);
                return response.send(result);
            })

            /*
            user.findOne({
                email: user_email
            }, {
                id: true,
                creditCards: true
            })*/

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }
    }

    managingShippingAddress(request, response) {
        try {
            console.log("I got Shipping Address");

            // const user_email = "luis1@gmail.com";
            const userSession = request.user.data;
            const user_email = userSession.email;
            user.findOne({
                email: user_email
            }, {
                id: true,
                shippingAddress: true
            }).then(result => { // console.log("RESULTCICOKS: " + result);
                return response.send(result);
            })

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }
    }

    // 3-31-21
    updatingCreditCardInfo(request, response) {
        console.log('firedd')
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
                    cardCVC,
                    id
                } = fields;

                if (!cardHolder || !cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
                    return response.status(400).json({msg: "All fields are required"})
                }
                const userSession = request.user.data;
                const user_email = userSession.email;
                // const userDoc = await user.findOne({email: user_email})
                console.log(cardNumber, id)
                user.findOneAndUpdate({
                    email: user_email,
                    'creditCards._id': id
                }, {
                    $set: {
                        'creditCards.$.cardNumber': cardNumber,
                        'creditCards.$.cardHolder': cardHolder,
                        'creditCards.$.cardExpMonth': cardExpMonth,
                        'creditCards.$.cardExpYear': cardExpYear,
                        'creditCards.$.cardCVC': cardCVC
                    }
                }).then(result => { // console.log("RESULTLAMB: " + result);
                    return response.send(result);
                })


                return response.status(200).json({msg: 'Credit card information added'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Failed to add new credit card info'})
        }
    }
    updatingShippingAddress(request, response) {
        const form = new IncomingForm();

        try {

            form.parse(request, async (error, fields, files) => {
                if (error) {
                    return response.status(500).json({msg: 'Failed to add new credit card info'})
                }

                const {
                    street,
                    city,
                    state,
                    postalCode,
                    country,
                    id
                } = fields;

                if (!street || !city || !state || !postalCode || !country) {
                    return response.status(400).json({msg: "All fields are required"})
                }
                const userSession = request.user.data;
                const user_email = userSession.email;
                console.log('ser mail', user_email)
                // const userDoc = await user.findOne({email: user_email})
                console.log('we are firing this');

                user.findOneAndUpdate({
                    email: user_email,
                    'shippingAddress._id': id
                }, {
                    $set: {
                        'shippingAddress.$.street': street,
                        'shippingAddress.$.city': city,
                        'shippingAddress.$.state': state,
                        'shippingAddress.$.postalCode': postalCode,
                        'shippingAddress.$.country': country
                    }
                }).then(result => { // console.log("RESULTLAMB: " + result);
                    return response.send(result);
                })


                return response.status(200).json({msg: 'Credit card information added'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Failed to add new credit card info'})
        }
    }

    async deletingItemFromCreditCard(request, response) {

        const id_creditCard = '1';
        // const email = 'test1@gmail.com';
        const userSession = request.user.data;
        const user_email = userSession.email;
        console.log(user_email)


        const form = new IncomingForm();
        try {
            form.parse(request, async (error, fields, files) => {


                if (error) {
                    return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
                }

                console.log('fiels', fields)
                const {id} = fields;
                await user.findOneAndUpdate({
                    email: user_email

                }, {

                    $pull: {
                        'creditCards': {
                            _id: id
                        }


                    }
                });
                return response.status(200).json({msg: 'CC information updated'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }


    }

    async deletingItemFromShippingAddress(request, response) {

        const id_creditCard = '1';
        // const email = 'test1@gmail.com';
        const userSession = request.user.data;
        const user_email = userSession.email;

        console.log(user_email)

        console.log('delete shipping address works ')
        const form = new IncomingForm();
        try {
            form.parse(request, async (error, fields, files) => {


                if (error) {
                    return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
                }

                console.log('fiels', fields)
                const {id} = fields;
                await user.findOneAndUpdate({
                    email: user_email

                }, {

                    $pull: {
                        'shippingAddress': {
                            _id: id
                        }


                    }
                });
                return response.status(200).json({msg: 'CC information updated'})
            })

        } catch (error) {
            return response.status(500).json({msg: 'Network Error: Failed to update personal information '})
        }


    }
}
export {
    AccountManager
}
