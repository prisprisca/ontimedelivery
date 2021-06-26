import express from 'express';

import { getOrders, makeOrder, updateOrder, deleteOrder } from'../controllers/posts.js';
import auth from '../middleware/auth.js';

const router =express.Router();

router.get('/',getOrders ); 
router.post('/', auth, makeOrder ); 
router.patch('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);
// router.patch('/:id/likeOrder',  likeOrder);

export default router

