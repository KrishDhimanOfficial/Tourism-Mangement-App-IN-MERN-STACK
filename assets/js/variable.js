export const server_url = `http://localhost:8000/admin`;
export const Formbtn = document.querySelector('#submitForm')
export const previewImg = document.querySelector('#preview_featured_img')
export const Input_img = document.querySelector('#Input_img')
export const multipleImagesInput = document.querySelector('#multipleImagesInput')
export const previewMultipleImage = document.querySelector('#previewMultipleImage')
export const dataID = document.querySelector('#updateID')
export const textInput = document.querySelector('#textInput')
export const ResetForm = document.querySelector('.reset')
export const Loader = document.querySelector('#loader')
export const FormLoader = document.querySelector('#formLoader')
export const ErrorAlert = document.querySelector('#errorAlert')
export const SelectBox = document.querySelector('#categorySelectBox')


export const setPostField = (res) => {
    dataID.value = res.singlePost._id;
    document.querySelector('.title').value = res.singlePost.title;
    document.querySelector('#slug').value = res.singlePost.post_slug;
    document.querySelector('.ql-editor').innerHTML = res.singlePost.description;
    SelectBox.childNodes.forEach(option => {
        if (option.value === res.singlePost.category._id) {
            option.selected = true;
        }
    })
    previewImg.src = `${res.post_img_url}/${res.singlePost.post_image}`
}

// This Function Set Input Field
export const setFormField = (text, id, url) => {
    textInput.value = text;
    dataID.value = id;
    previewImg.src = url;
}

export function createSlug(str) {
    return str.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// This Function Get the All the Data
export const getdata = async (url) => {
    const response = await fetch(url, { method: 'GET' })
    const data = await response.json()
    return data;
}

// Function that send POST AND PUT data to server
export const sendDataToServer = async (url, method, formData) => {
    try {
        FormLoader.style.display = 'block';
        const response = await fetch(url, {
            method: method,
            body: formData,
        })
        const data = await response.json()

        if (!response.ok) {
            ErrorAlert.style.display = 'block';
            ErrorAlert.innerHTML = data.error;
            return;
        } else {
            ErrorAlert.style.display = 'none';
            return true
        }
    } catch (error) {
        console.error(error)
    } finally {
        Loader.style.display = 'none'
        FormLoader.style.display = 'none';
    }
}

// Function That Return Single Data From Server
export const getSingleData = async (url) => {
    try {
        const response = await fetch(url, { method: 'GET' })
        const data = await response.json()
        if (!data) return false
        return data
    } catch (error) {
        console.log(error)
    }
}


// Function that handle delete request to server
export const deleteDataRequestToServer = async (e, url) => {
    try {
        const response = await fetch(url, { method: 'DELETE' })
        const data = await response.json()
        if (data.message) {
            e.target.closest('.table-row').remove()
        }
    } catch (error) {
        console.log(error)
    }
}

// Function that display preview image
export const displayPreviewImage = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => previewImg.src = reader.result;
    reader.readAsDataURL(file)
}

// Function that display preview multiple images
export const displayPreviewImages = (e) => {
    const alert = document.querySelector('#imagesAlert')
    previewMultipleImage.innerHTML = '';
    previewImg.style.display = 'none';
    const files = e.target.files;

    if (Array.from(files).length > 4) {
        previewImg.style.display = 'block';
        alert.style.display = 'block';
    } else {
        Array.from(files).forEach(file => {
            const reader = new FileReader()
            const ImgTag = document.createElement('img')
            reader.onload = () => {
                ImgTag.src = reader.result;
                ImgTag.classList.add('images')
            }
            reader.readAsDataURL(file)
            previewMultipleImage.appendChild(ImgTag)
        })
    }
}

//  Function That's create Tags
export const createTags = (tagName) => {
    const tagElement = `<div class="deleteTag btn bg-body-secondary tag">${tagName}
    <button type="submit" class="btn p-0 ms-2">
    <i class="bi bi-x"></i></button></div>`
    return tagElement
}