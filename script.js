const filters = {
    brightness: {
        min: 0,
        max: 200,
        value: 100,
        unit: 'percentage'
    },
    contrast: {
        min: 0,
        max: 200,
        value: 100,
        unit: 'percentage'
    },
    exposure: {
        min: 0,
        max: 200,
        value: 100,
        unit: 'percentage'
    },
    saturation: {
        min: 0,
        max: 200,
        value: 100,
        unit: 'percentage'
    },
    hueRotation: {
        min: 0,
        max: 360,
        value: 0,
        unit: 'deg'
    },
    blur: {
        min: 0,
        max: 20,
        value: 0,
        unit: 'px'
    },
    grayscale: {
        min: 0,
        max: 100,
        value: 0,
        unit: 'percentage'
    },
    sepia: {
        min: 0,
        max: 100,
        value: 0,
        unit: 'percentage'
    },
    opacity: {
        min: 0,
        max: 100,
        value: 100,
        unit: 'percentage'
    },
    invert: {
        min: 0,
        max: 100,
        value: 0,
        unit: 'percentage'
    },
}

// Select filters container
const filtersContainer = document.querySelector('.filters');
// Select image picker
const imagePicker = document.getElementById('image-picker');
// Select canvas
const imageCanvas = document.querySelector('#image-canvas');
// Canvas Context (for manipulations)
const canvasCtx = imageCanvas.getContext('2d');

function createFilter(name, value, min, max, unit = 'percentage') {
    // Create filter div
    const div = document.createElement('div');
    div.classList.add('filter');
    // Create filter name
    const p = document.createElement('p');
    p.innerText = name;
    // Create filter slider
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value;
    // Append filter name and slider
    div.appendChild(p);
    div.appendChild(input);

    // Return filter
    return div;
}

// Add filters one by one
Object.keys(filters).forEach(filter => {
    const {value, min, max, unit} = filters[filter];
    const filterElem = createFilter(filter, value, min, max, unit);
    filtersContainer.appendChild(filterElem);
})

// On image select
// Here we are using 'change' event since on selecting an image, the value will change
imagePicker.addEventListener('change', (event) => {
    const selectedImage = event.target.files[0];
    // Hide placeholder and display canvas
    document.querySelector('.placeholder').style.display = "none";
    imageCanvas.style.display = "initial";
    // Create JS image
    const img = new Image();

    // Create URL of selected image and pass it to src of img
    img.src = URL.createObjectURL(selectedImage);

    // On load
    img.onload = () => {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
})