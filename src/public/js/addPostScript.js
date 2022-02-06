const addSegment = document.getElementById('add-segment')
const addLink = document.getElementById('add-link')
const preview = document.getElementById('preview')
const savePost = document.getElementById('save-post')

const form_data = document.forms['form-data']


addSegment.addEventListener('click', () => {
    const segment = document.querySelector('.segment')
    const div = document.createElement('div')
    div.innerHTML = segment.innerHTML
    div.classList.add('segment')
    document.querySelector('.post').appendChild(div)
})

addLink.addEventListener('click', () => {
    const link = document.querySelector('.link')
    const div = document.createElement('div')
    div.classList.add('link')
    div.innerHTML = link.innerHTML
    document.querySelector('.links').appendChild(div)
})

savePost.addEventListener('click', () => {
    form_data.submit()
})