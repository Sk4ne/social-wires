import express from 'express'
import userRouter from './user'
import postRouter from './post'
import { Router } from 'express';

const router:Router = express.Router()

router.use(userRouter)
router.use(postRouter)


export default router