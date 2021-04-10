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

router.get('/api/managing-credit-card', isAuthenticated, (request, response) => {
    Controller.getCreditCard(request, response)
})

router.post('/api/managing-credit-cardd', isAuthenticated, (request, response) => {
    Controller.getttCreditCard(request, response)
})

router.post('/api/deleting-credit-cardd', isAuthenticated, (request, response) => {
    Controller.deleteCreditCard(request, response)
})

router.post('/api/managing-shipping-adress', isAuthenticated, (request, response) => {
    Controller.managingShippingAddress(request, response)
})

// 3-31-21
router.post('/api/updating-credit-card', isAuthenticated, (request, response) => {
    Controller.updatingCreditCardInfo(request, response)
})

router.post('/api/updating-shipping-adress', isAuthenticated, (request, response) => {
    Controller.updatingShippingAddress(request, response)
})
// 3-31-21
router.post('/api/testing-deleteCC', isAuthenticated, (request, response) => {
    Controller.deletingItemFromCreditCard(request, response)
})

router.post('/api/deleting-shipping-adress', isAuthenticated, (request, response) => {
    Controller.deletingItemFromShippingAddress(request, response)
})

export default router