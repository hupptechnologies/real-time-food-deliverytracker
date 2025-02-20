import express from 'express';

const router = express.Router();

router.post('/admin/create-user');
router.get('/admin/list-users');
router.get('/admin/get-user/:id');
router.put('/admin/update-user/:id');
router.delete('/admin/delete-user/:id');

export default router;
