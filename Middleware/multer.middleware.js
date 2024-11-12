import multer from 'multer'
import path from 'path'

const createStorage = (dir) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/${dir}`)
    },
    filename: (req, file, cb) => {
        const randomNo = Math.round(Math.random() * 10)
        const newFileName = `${Date.now()}${randomNo}${path.extname(file.originalname)}`;
        cb(null, newFileName)
    }
})


export const tour_location = multer({ storage: createStorage('tour_location_images') })
export const tour_category = multer({ storage: createStorage('tour_category_images') })
export const post_category = multer({ storage: createStorage('post_category_images') })

