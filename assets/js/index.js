import {
    server_url, Formbtn, previewImg, Loader, ResetForm, dataID, Input_img, displayPreviewImage,
    getdata, deleteDataRequestToServer, getSingleData, setFormField, sendDataToServer
} from './variable.js'

const tour_location_table = document.querySelector('#tour-location-table')
const tour_category_table = document.querySelector('#tour-category-table')
const post_category_table = document.querySelector('#post-category-table')

printTourLocation() // Function That's print tour location on DOM
printTourCategory() // Function That's print tour Category on DOM
printPostCategory() // Function That's print Post Category on DOM

Input_img.onchange = (e) => { displayPreviewImage(e) } // display preview image on screen

ResetForm.onclick = () => {
    Formbtn.id = 'submitForm';
    dataID.value = '';
    previewImg.src = '/assets/images/upload_area.png';
} // It's reset the State

Formbtn.onsubmit = async (e) => {
    e.preventDefault()
    const method = Formbtn.id === 'submitForm' ? 'POST' : 'PUT';
    const url = Formbtn.id === 'submitForm' ? `${server_url}/${EndURL}` : `${server_url}/${EndURL}/${dataID.value}`;
    const formData = new FormData(e.target)
    const response = await sendDataToServer(url, method, formData)

    // This will print the data when you create tour location
    if (response) {
        if (tour_location_table) tour_location_table.innerHTML = '';
        if (tour_category_table) tour_category_table.innerHTML = '';
        if (post_category_table) post_category_table.innerHTML = '';
        Formbtn.id == 'submitForm';
        printTourLocation()
        printTourCategory()
        printPostCategory()
    }
}

// Inject EventListener
tour_location_table ? tour_location_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.edit')) {
        Formbtn.id = 'updateFormData';
        const res = await getSingleData(`${server_url}/${EndURL}/${e.target.dataset.id}`)

        // This will set From Fields
        setFormField(res.data.location_name, res.data._id, `${res.tour_location_img_url}/${res.data.featured_img}`)
    }
}
    : null

// Function That's print tour location on DOM
async function printTourLocation() {
    Loader.style.display = 'block';
    const data = await getdata(`${server_url}/api/tour/location`)
    const structure = data?.locations.map((location, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.tour_location_img_url}/${location.featured_img}"
                    style="width: 100px; height: 100px;" alt="">
            </td>
            <td> ${location.location_name}</td>
            <td>
                <div class="d-flex flex-column gap-3">
                    <button type="button" data-id="${location._id}"
                        class="btn btn-dark edit">Edit</button>
                    <button type="button" data-id="${location._id}"
                        class="btn btn-danger delete">Delete</button>
                </div>
                </td>
        </tr>`).join('')
    Loader.style.display = 'none';
    if (tour_location_table) tour_location_table?.insertAdjacentHTML('afterbegin', structure)
}

// Inject EventListener
tour_category_table ? tour_category_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.edit')) {
        Formbtn.id = 'updateFormData';
        const res = await getSingleData(`${server_url}/${EndURL}/${e.target.dataset.id}`)
        // This will set From Fields
        setFormField(res.data.category_name, res.data._id, `${res.tour_category_img_url}/${res.data.featured_image}`)
    }
}
    : null

// Function That's print tour category on DOM
async function printTourCategory() {
    Loader.style.display = 'block';
    const data = await getdata(`${server_url}/api/tour/category`)
    const structure = data?.categories.map((category, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.tour_category_img_url}/${category.featured_image}"
                    style="width: 100px; height: 100px;" alt="">
            </td>
            <td> ${category.category_name}</td>
            <td>
                <div class="d-flex flex-column gap-3">
                    <button type="button" data-id="${category._id}"
                        class="btn btn-dark edit">Edit</button>
                    <button type="button" data-id="${category._id}"
                        class="btn btn-danger delete">Delete</button>
                </div>
                </td>
        </tr>`).join('')
    Loader.style.display = 'none';
    if (tour_category_table) tour_category_table.insertAdjacentHTML('afterbegin', structure)
}

post_category_table ? post_category_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.edit')) {
        Formbtn.id = 'updateFormData';
        const res = await getSingleData(`${server_url}/${EndURL}/${e.target.dataset.id}`)
        // This will set From Fields
        setFormField(res.data.category_name, res.data._id, `${res.post_category_img_url}/${res.data.featured_image}`)
    }
}
    : null

// Function That's print post category on DOM
async function printPostCategory() {
    Loader.style.display = 'block';
    const data = await getdata(`${server_url}/api/post/categories`)
    const structure = data?.categories.map((category, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.post_category_img_url}/${category.featured_image}"
                    style="width: 100px; height: 100px;" alt="">
            </td>
            <td> ${category.category_name}</td>
            <td>
                <div class="d-flex flex-column gap-3">
                    <button type="button" data-id="${category._id}"
                        class="btn btn-dark edit">Edit</button>
                    <button type="button" data-id="${category._id}"
                        class="btn btn-danger delete">Delete</button>
                </div>
                </td>
        </tr>`).join('')
    Loader.style.display = 'none';
    if (post_category_table) post_category_table.insertAdjacentHTML('afterbegin', structure)
}