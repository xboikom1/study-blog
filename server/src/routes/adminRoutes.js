import express from 'express'
import {
    adminLogin,
    adminRegister,
    approveCommentById,
    unapproveCommentById,
    deleteCommentById,
    getAllBlogsAdmin,
    getAllComments,
    getDashboard
} from '../controllers/adminController.js'
import auth from '../middleware/auth.js'
import { loginLimiter } from '../middleware/rateLimiter.js'

const adminRouter = express.Router()

// Apply strict rate limiting to login and register endpoint
adminRouter.post('/login', loginLimiter, adminLogin)
adminRouter.post('/register', adminRegister)

// Apply auth middleware to all routes below this point
adminRouter.use(auth)

adminRouter.get('/dashboard', getDashboard)
adminRouter.get('/blogs', getAllBlogsAdmin)
adminRouter.get('/comments', getAllComments)
adminRouter.post('/approve-comment', approveCommentById)
adminRouter.post('/unapprove-comment', unapproveCommentById)
adminRouter.post('/delete-comment', deleteCommentById)

export default adminRouter