import {Router}   from 'express';
import { AccountManager } from '../../Controller/Account Manager/AccountManager.js';
import { isAuthenticated } from '../../Middlewares/isAuthenticated/isAuthenticated.js';

const router = Router ();
const Controller = new AccountManager();

router.post('/api/personal-info', isAuthenticated,(request,response) =>{
    Controller.UpdateUserInfo(request,response)
})

export default router