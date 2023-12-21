import express from 'express';

const router = express();

router.get('/', (req,res) => {
    res.json({
        message: 'API is working'
    })
})

export default router