import config from '../config/config.js'
import deleteImage from '../services/deleteImg.js'
import postcategoryModel from '../models/post.category.model.js'

const postControllers = {
    getPostCategories: async (req, res) => {
        const categories = await postcategoryModel.find({})
        if (categories) return res.status(200).json({ categories, post_category_img_url: config.server_post_category_img_url })
        try {
        } catch (error) {
            console.log('getPostCategories : ' + error.message)
        }
    },
    createPostCategory: async (req, res) => {
        try {
            const postCategoryExists = await postcategoryModel.findOne(
                { category_name: { $regex: /^req.body.category_name$/, $options: 'i' } }
            )
            if (postCategoryExists) {
                await deleteImage(`post_category_images/${req.file.filename}`)
                return res.status(200).json({ message: 'value Exists' });
            } else {
                const data = await postcategoryModel.create({
                    featured_image: req.file.filename,
                    category_name: req.body.category_name
                })
                if (!data) {
                    await deleteImage(`post_category_images/${req.file.filename}`)
                    return res.status(204).json({ message: 'failed' })
                }
                return res.status(200).json({ message: 'successfully created' })
            }
        } catch (error) {
            await deleteImage(`post_category_images/${req.file.filename}`)
            console.log('createPostCategory : ' + error.message)
        }
    },
    getSinglePostCategory: async (req, res) => {
        try {
            const data = await postcategoryModel.findOne({ _id: req.params.id })
            return res.status(200).json({ data, post_category_img_url: config.server_post_category_img_url })
        } catch (error) {
            console.log('getSinglePostCategory : ' + error.message)
        }
    },
    updatePostCategory: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await postcategoryModel.findOne({ _id: req.params.id })
            if (image) deleteImage(`post_category_images/${previousimg.featured_image}`)

            const data = await postcategoryModel.findByIdAndUpdate(
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
            console.log('updatePostCategory : ' + error.message)
        }
    },
    deletePostCategory: async (req, res) => {
        try {
            const data = await postcategoryModel.findOne({ _id: req.params.id })
            const response = await postcategoryModel.findByIdAndDelete({ _id: req.params.id })
            if (response) {
                await deleteImage(`post_category_images/${data.featured_image}`)
                return res.status(200).json({ message: 'successfully deleted' })
            }
        } catch (error) {
            console.log('deletePostCategory : ' + error.message)
        }
    },
}
export default postControllers