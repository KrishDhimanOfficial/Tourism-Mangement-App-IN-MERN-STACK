import {
    server_url, FormLoader, ErrorAlert, Formbtn, previewImg, Loader, ResetForm, dataID,
    Input_img, displayPreviewImage, SelectBox, multipleImagesInput,
    getdata, deleteDataRequestToServer, getSingleData, setFormField,
    sendDataToServer, createSlug, setPostField, displayPreviewImages, createTags
} from './variable.js'

const tour_location_table = document.querySelector('#tour-location-table')
const tour_category_table = document.querySelector('#tour-category-table')
const post_category_table = document.querySelector('#post-category-table')
const posts_table = document.querySelector('#post-table')
const tours_table = document.querySelector('#tour_table')
const description = document.querySelectorAll('.ql-editor')[0]
const travellingPlan = document.querySelectorAll('.ql-editor')[1]
const tour_included = document.querySelector('#included')
const tour_excluded = document.querySelector('#excluded')
const createIncludedTag = document.querySelector('.createIncludedTag')
const createExcludedTag = document.querySelector('.createExcludedTag')
const tagscontainer = document.querySelector('.tourTags')

printTourLocation() // Function That's print tour location on DOM
printTourCategory() // Function That's print tour Category on DOM
printPostCategory() // Function That's print Post Category on DOM
printPosts() // Function That's print Post on DOM
// printToursData() // Function That's print Tour ON DOM

//  preview image on screen
if (Input_img) Input_img.onchange = (e) => {
    displayPreviewImage(e)
}
//  preview images on screen
if (multipleImagesInput) multipleImagesInput.onchange = (e) => {
    displayPreviewImages(e)
}
// Inject Tour Included Tags 
if (tour_included) createIncludedTag.onclick = () => {
    if (tour_included.value) {
        const tag = createTags(tour_included.value.trim())
        document.querySelector('#tourIncludedTags').insertAdjacentHTML('afterbegin', tag)
        tour_included.value = '';
    }
}
// Inject Tour Excluded Tags 
if (tour_excluded) createExcludedTag.onclick = () => {
    if (tour_excluded.value) {
        const tag = createTags(tour_excluded.value.trim())
        document.querySelector('#tourexcludedTags').insertAdjacentHTML('afterbegin', tag)
        tour_excluded.value = '';
    }
}
// Delete Tour Tags
if (tagscontainer) tagscontainer.onclick = (e) => {
    e.target.closest('.deleteTag') ? e.target.closest('.deleteTag').remove() : null
}

// It's reset the Form State
ResetForm.onclick = () => {
    FormLoader.style.display = 'none';
    Formbtn.id = 'submitForm';
    dataID.value = '';
    ErrorAlert.style.display = 'none';
    previewImg.src = '/assets/images/upload_area.png';

    if (SelectBox) SelectBox.childNodes.forEach(option => {
        option.value !== 'category' ? option.selected = false : null
    })
    if (description) description.innerHTML = ''; // This will clear the content of the editor
} 

// Handle Form POST and PUT Operation
Formbtn.onsubmit = async (e) => {
    e.preventDefault()
    const method = Formbtn.id === 'submitForm' ? 'POST' : 'PUT';
    const url = Formbtn.id === 'submitForm' ? `${server_url}/${EndURL}` : `${server_url}/${EndURL}/${dataID.value}`;
    const formData = new FormData(e.target)

    if (EndURL === 'api/post') {
        formData.append('post_slug', createSlug(`${slug.value}`))
        formData.append('description', description.getHTML())
    }
    if (EndURL === 'api/tour') {
        formData.append('slug',createSlug(`${slug.value}`))
        formData.append('description', description.getHTML())
        formData.append('travelling_plan', travellingPlan.getHTML())
    }

    const response = await sendDataToServer(url, method, formData)

    // This will print the data when you create data
    if (response) {
        if (tour_location_table) {
            tour_location_table.innerHTML = '';
            printTourLocation()
        }
        if (tour_category_table) {
            tour_category_table.innerHTML = '';
            printTourCategory()
        }
        if (post_category_table) {
            post_category_table.innerHTML = '';
            printPostCategory()
        }
        if (posts_table) {
            posts_table.innerHTML = '';
            printPosts()
        }
        if (tours_table) {
            tours_table.innerHTML = '';
            // printToursData()
        }
        FormLoader.style.display = 'none';
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
    const structure = data.locations?.map((location, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.tour_location_img_url}/${location.featured_img}"
                    style="width: 100px; height: 100px;" alt="" loading='lazy'>
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
    if (tour_location_table) tour_location_table.insertAdjacentHTML('afterbegin', structure)
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
    const structure = data.categories?.map((category, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.tour_category_img_url}/${category.featured_image}"
                    style="width: 100px; height: 100px;" alt="" loading='lazy'>
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

// Inject EventListener
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
    const structure = data.categories?.map((category, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.post_category_img_url}/${category.featured_image}"
                    style="width: 100px;height: 100px; object-fit: cover;" alt="" loading='lazy'>
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

// Inject EventListener
posts_table ? posts_table.onclick = async (e) => {
    if (e.target.closest('.delete')) {
        deleteDataRequestToServer(e, `${server_url}/${EndURL}/${e.target.dataset.id}`)
    }
    if (e.target.closest('.edit')) {
        Formbtn.id = 'updateFormData';
        const res = await getSingleData(`${server_url}/${EndURL}/${e.target.dataset.id}`)
        setPostField(res)
    }
}
    : null

// This Function Print the Posts on DOM
async function printPosts() {
    Loader.style.display = 'block';
    const data = await getdata(`${server_url}/api/posts`)
    const structure = data.posts?.map((post, i) => `<tr class="table-row">
        <th scope="row">${i + 1}</th>
            <td>
                <img src="${data.post_img_url}/${post.post_image}"
                    style="width: 100px; height: 100px;" alt="" loading='lazy'>
            </td>
            <td> ${post.title}</td>
            <td> ${post.post_slug}</td>
            <td> ${post.category.category_name}</td>
            <td> ${post.formattedDate}</td>
            <td>
                <div class="d-flex flex-column gap-3">
                    <button type="button" data-id="${post._id}"
                        class="btn btn-dark edit">Edit</button>
                    <button type="button" data-id="${post._id}"
                        class="btn btn-danger delete">Delete</button>
                </div>
                </td>
        </tr>
        `).join('')
    if (posts_table) posts_table.insertAdjacentHTML('afterbegin', structure)
    Loader.style.display = 'none';
}

// This Function Print the Tours Data on DOM
// async function printToursData() {
    
// }