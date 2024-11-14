import config from '../config/config.js'
import tourLocationModel from '../models/tour_location.model.js'
import tourCategoryModel from '../models/product_category.model.js'
import deleteImage from '../services/deleteImg.js'

const productControllers = {
    renderTourPage: async (req, res) => {
        try {
            const tour_locations = await tourLocationModel.find({}, { location_name: 1 })
            const tour_categories = await tourCategoryModel.find({}, { category_name: 1 })
            return res.render('product/tour', { tour_locations, tour_categories })
        } catch (error) {
            console.log('renderTourPage : ' + error.message)
        }
    },
    createLoaction: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Please upload a image' })
            const checkTourLocationExists = await tourLocationModel.findOne(
                { location_name: { $regex: `^${req.body.location_name}$`, $options: 'i' } }
            )
            if (checkTourLocationExists) {
                await deleteImage(`tour_location_images/${req.file.filename}`)
                return res.status(200).json({ message: 'value Exists' });
            } else {
                const data = await tourLocationModel.create({
                    featured_img: req.file.filename,
                    location_name: req.body.location_name
                })
                if (!data) {
                    await deleteImage(`tour_location_images/${req.file.filename}`)
                    return res.status(204).json({ message: 'failed' })
                }
                return res.status(200).json({ message: 'successfully created' })
            }
        } catch (error) {
            deleteImage(`tour_location_images/${req.file.filename}`)
            console.log('createLoaction : ' + error.message)
        }
    },
    getTourLocations: async (req, res) => {
        try {
            const locations = await tourLocationModel.find({})
            if (locations) return res.status(200).json({ locations, tour_location_img_url: config.server_tour_location_img_url })
        } catch (error) {
            console.log('getAllTourLoactions : ' + error.message)
        }
    },
    getsingleTourLocation: async (req, res) => {
        try {
            const data = await tourLocationModel.findOne({ _id: req.params.id })
            return res.status(200).json({ data, tour_location_img_url: config.server_tour_location_img_url })
        } catch (error) {
            console.log('getsingleTourLocation : ' + error.message)
        }
    },
    updateTourLocation: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await tourLocationModel.findOne({ _id: req.params.id })
            if (image) deleteImage(`tour_location_images/${previousimg.featured_img}`)

            const data = await tourLocationModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    featured_img: req.file?.filename,
                    location_name: req.body.location_name,
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ message: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updateTourLocation : ' + error.message)
        }
    },
    deleteTourLocation: async (req, res) => {
        try {
            const data = await tourLocationModel.findOne({ _id: req.params.id })
            const response = await tourLocationModel.findByIdAndDelete({ _id: req.params.id })
            if (response) {
                deleteImage(`tour_location_images/${data.featured_img}`)
                return res.status(200).json({ message: 'successfully deleted' })
            }
        } catch (error) {
            console.log('deleteTourLocation : ' + error.message)
        }
    },
    createTourCategory: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Please upload a image' })
            const checkTourCategoryExists = await tourCategoryModel.findOne({
                category_name: { $regex: `^${req.body.category_name}$`, $options: 'i' }
            })
            if (checkTourCategoryExists) {
                await deleteImage(`tour_category_images/${req.file.filename}`)
                return res.status(200).json({ message: 'value Exists' });
            } else {
                const data = await tourCategoryModel.create({
                    featured_image: req.file.filename,
                    category_name: req.body.category_name
                })
                if (!data) {
                    await deleteImage(`tour_category_images/${req.file.filename}`)
                    return res.status(204).json({ message: 'failed' })
                }
                return res.status(200).json({ message: 'successfully created' })
            }
        } catch (error) {
            deleteImage(`tour_category_images/${req.file.filename}`)
            console.log('createTourCategory : ' + error.message)
        }
    },
    getTourCategories: async (req, res) => {
        try {
            const categories = await tourCategoryModel.find({})
            if (categories) return res.status(200).json({ categories, tour_category_img_url: config.server_tour_category_img_url })
        } catch (error) {
            console.log('getTourCategories : ' + error.message)
        }
    },
    getsingleTourCategory: async (req, res) => {
        try {
            const data = await tourCategoryModel.findOne({ _id: req.params.id })
            return res.status(200).json({ data, tour_category_img_url: config.server_tour_category_img_url })
        } catch (error) {
            console.log('getsingleTourCategory : ' + error.message)
        }
    },
    updateTourCategory: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await tourCategoryModel.findOne({ _id: req.params.id })
            if (image) deleteImage(`tour_category_images/${previousimg.featured_image}`)

            const data = await tourCategoryModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    featured_image: req.file?.filename,
                    category_name: req.body.category_name,
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ message: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updateTourCategory : ' + error.message)
        }
    },
    deleteTourCategory: async (req, res) => {
        try {
            const data = await tourCategoryModel.findOne({ _id: req.params.id })
            const response = await tourCategoryModel.findByIdAndDelete({ _id: req.params.id })
            if (response) {
                deleteImage(`tour_category_images/${data.featured_image}`)
                return res.status(200).json({ message: 'successfully deleted' })
            }
        } catch (error) {
            console.log('deleteTourCategory : ' + error.message)
        }
    },
    getAllTours: async (req, res) => {
        try {

        } catch (error) {
            console.log('getAllTours : ' + error.message)
        }
    },
    createTour: async (req, res) => {
        try {

        } catch (error) {
            console.log('createTour : ' + error.message)
        }
    },
    getSingleTour: async (req, res) => {
        try {

        } catch (error) {
            console.log('getSingleTour : ' + error.message)
        }
    },
    updateTour: async (req, res) => {
        try {

        } catch (error) {
            console.log('updateTour : ' + error.message)
        }
    },
    deleteTour: async (req, res) => {
        try {

        } catch (error) {
            console.log('deleteTour : ' + error.message)
        }
    }

}
export default productControllers