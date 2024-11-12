import express from 'express'
import authenticateControllers from '../Controllers/authentication.controllers.js'
import productControllers from '../Controllers/product.contollers.js'
import admincontrollers from '../Controllers/admin.controllers.js'
import postControllers from '../Controllers/post.controllers.js'
import { tour_location, tour_category, post_category } from '../Middleware/multer.middleware.js'

const router = express.Router()

router.post('/login', authenticateControllers.getAuthenticate)
router.get('/dashboard', admincontrollers.getAdminDashboard)

router.get('/tour/location', (req, res) => res.render('product/tour_location'))
router.get('/tour/category', (req, res) => res.render('product/category'))

router.get('/post/category', (req, res) => res.render('post/category'))

// API Routes for Tour Location
router.get('/api/tour/location', productControllers.getTourLocations)
router.route('/api/tour/location/:id?')
    .post(tour_location.single('featured_img'), productControllers.createLoaction)
    .get(productControllers.getsingleTourLocation)
    .put(tour_location.single('featured_img'), productControllers.updateTourLocation)
    .delete(productControllers.deleteTourLocation)

//  API Routes for Tour Category
router.get('/api/tour/category', productControllers.getTourCategories)
router.route('/api/tour/category/:id?')
    .post(tour_category.single('featured_image'), productControllers.createTourCategory)
    .get(productControllers.getsingleTourCategory)
    .put(tour_category.single('featured_image'), productControllers.updateTourCategory)
    .delete(productControllers.deleteTourCategory)

// API Routes for Post Category
router.get('/api/post/categories', postControllers.getPostCategories)
router.route('/api/posts/category/:id?')
    .post(post_category.single('featured_image'), postControllers.createPostCategory)
    .get(postControllers.getSinglePostCategory)
    .put(post_category.single('featured_image'), postControllers.updatePostCategory)
    .delete(postControllers.deletePostCategory)

export default router