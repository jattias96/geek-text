import {Router} from 'express';
import {AccountManager} from '../../Controller/Account Manager/AccountManager.js';
import {isAuthenticated} from '../../Middlewares/isAuthenticated/isAuthenticated.js';

const router = Router();
const Controller = new AccountManager();

router.post('/api/personal-info', isAuthenticated, (request, response) => {
    Controller.UpdateUserInfo(request, response)
})

router.post('/api/credit-card', isAuthenticated, (request, response) => {
    Controller.AddCreditCard(request, response)
})

router.post('/api/insert-credit-card', isAuthenticated, (request, response) => {
    Controller.InsertCreditCard(request, response)
})

router.post('/api/insert-shipping-address', isAuthenticated, (request, response) => {
    Controller.AddShippingAddress(request, response)
})

export default router
