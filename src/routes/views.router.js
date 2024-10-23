import { Router } from 'express';
import userModel from '../models/user.model.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {})
})

router.get('/users', async (req, res) => {

    let page = parseInt(req.query.page);
    let rows = parseInt(req.query.rows);
    if(!page) page = 1;
    if(!rows) rows = 5;
    let result = await userModel.paginate({},{page, limit: 10, lean:true})
    
    result.isValid = !(page<=0 || page > result.totalPages);
    res.render('user', result);
})

export default router;