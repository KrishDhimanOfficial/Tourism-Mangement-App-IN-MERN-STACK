export const server_url = `http://localhost:8000/admin`;
export const Formbtn = document.querySelector('#submitForm')
export const previewImg = document.querySelector('#preview_featured_img')
export const Input_img = document.querySelector('#Input_img')
export const dataID = document.querySelector('#updateID')
export const textInput = document.querySelector('#textInput')
export const ResetForm = document.querySelector('.reset')
export const Loader = document.querySelector('#loader')
const FormLoader = document.querySelector('#formLoader')



// This Function Set Input Field
export const setFormField = (text, id, url) => {
    textInput.value = text;
    dataID.value = id;
    previewImg.src = url;
}

// This Function Get the All the Data
export const getdata = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

// Function that send POST AND PUT data to server
export const sendDataToServer = async (url, method, formData) => {
    try {
        FormLoader.style.display = 'block';  
        const response = await fetch(url, {
            method: method,
            body: formData
        })
        
        const data = await response.json()
        if (data) {
            FormLoader.style.display = 'none';
            return data
        }
    } catch (error) {
        console.log('sendDataToServer : ' + error.message)
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
        if (data.message == "successfully deleted") {
            e.target.closest('.table-row').remove()
        }
    } catch (error) {
        console.log(error)
    }
}

// Function that display preview image
export const displayPreviewImage = async (e) => {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = () => {
            previewImg.src = reader.result;
        }
        reader.readAsDataURL(file)
    }
}