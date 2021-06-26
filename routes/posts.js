import express from 'express';

import { getOrders, makeOrder, updateOrder, deleteOrder } from'../controllers/posts.js';

const router = express.Router();

router.get('/',getOrders ); 
router.post('/', makeOrder ); 
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);
// router.patch('/:id/likeOrder', likeOrder);

export default router

