// Beautify name
function getDisplayName(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
}

// Initialize filters
function getFilters() {
    return {
        brightness: {
            min: 0,
            max: 200,
            value: 100,
            unit: '%'
        },
        contrast: {
            min: 0,
            max: 200,
            value: 100,
            unit: '%'
        },
        saturation: {
            min: 0,
            max: 200,
            value: 100,
            unit: '%'
        },
        hue: {
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
            unit: '%'
        },
        sepia: {
            min: 0,
            max: 100,
            value: 0,
            unit: '%'
        },
        opacity: {
            min: 0,
            max: 100,
            value: 100,
            unit: '%'
        },
        invert: {
            min: 0,
            max: 100,
            value: 0,
            unit: '%'
        },
    };
};

let filters = getFilters();

const filterPresets = {
    dramatic: {
        brightness: 95,
        contrast: 145,
        saturation: 115,
        hue: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 130,
        saturation: 85,
        hue: 340,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 75,
        hue: 15,
        blur: 0,
        grayscale: 10,
        sepia: 45,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 110,
        contrast: 120,
        saturation: 140,
        hue: 20,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 95,
        contrast: 170,
        saturation: 0,
        hue: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 115,
        contrast: 80,
        saturation: 70,
        hue: 0,
        blur: 0,
        grayscale: 10,
        sepia: 20,
        opacity: 90,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 110,
        saturation: 120,
        hue: 20,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 105,
        hue: 200,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vibrant: {
        brightness: 105,
        contrast: 125,
        saturation: 160,
        hue: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 85,
        saturation: 110,
        hue: 10,
        blur: 2,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 85,
        contrast: 140,
        saturation: 80,
        hue: 330,
        blur: 0,
        grayscale: 15,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    sunset: {
        brightness: 110,
        contrast: 115,
        saturation: 135,
        hue: 25,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    coldWinter: {
        brightness: 100,
        contrast: 125,
        saturation: 80,
        hue: 210,
        blur: 0,
        grayscale: 5,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    highKey: {
        brightness: 135,
        contrast: 85,
        saturation: 105,
        hue: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    lowKey: {
        brightness: 75,
        contrast: 160,
        saturation: 90,
        hue: 0,
        blur: 0,
        grayscale: 10,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    lomo: {
        brightness: 105,
        contrast: 140,
        saturation: 150,
        hue: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    infrared: {
        brightness: 110,
        contrast: 150,
        saturation: 120,
        hue: 180,
        blur: 0,
        grayscale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0
    }
};

// Select filters container
const filtersContainer = document.querySelector('.filters');
// Select image picker
const imagePicker = document.getElementById('image-picker');
// Select canvas
const imageCanvas = document.querySelector('#image-canvas');
// Canvas Context (for manipulations)
const canvasCtx = imageCanvas.getContext('2d');
// Select reset
const reset = document.getElementById('reset');
// Select download
const download = document.getElementById('download');
// Select presets container
const presetsContainer = document.querySelector('.presets');
// Image
let image = null;

function applyFilters() {
    // Clear the previous image on the canvas
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    // Apply filter
    canvasCtx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hue.value}${filters.hue.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
    // Draw new image
    canvasCtx.drawImage(image, 0, 0);
}

function createFilter(name, value, min, max, unit = '%') {
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

    // Apply listener to update values in filters object
    input.addEventListener('input', (event) => {
        filters[name].value = event.target.value;
        applyFilters();
    })

    // Return filter
    return div;
}

// Add filters one by one
function createFilters() {
    Object.keys(filters).forEach(filter => {
        const { value, min, max, unit } = filters[filter];
        const filterElem = createFilter(filter, value, min, max, unit);
        filtersContainer.appendChild(filterElem);
    })
};

function createPreset(name) {
    // Create preset button
    const button = document.createElement('button');
    button.classList.add('btn', 'preset');
    // Set preset name
    button.innerText = getDisplayName(name);
    // Apply listener to update values of filters with presets
    button.addEventListener('click', () => {
        Object.keys(filterPresets[name]).forEach(filter => {
            filters[filter].value = filterPresets[name][filter];
        })

        // Update canvas
        applyFilters();
        // Reset Filter UI
        filtersContainer.innerHTML = "";
        createFilters();
    })

    // Return preset
    return button;
}

// Add filter presets one by one
function createPresets() {
    Object.keys(filterPresets).forEach(filter => {
        const presetElem = createPreset(filter);
        presetsContainer.appendChild(presetElem);
    })
};

createFilters();
createPresets();

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
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
});

// On reset
reset.addEventListener('click', () => {
    // Reset filters
    filters = getFilters();
    applyFilters();

    // Empty filters container
    filtersContainer.innerHTML = "";
    // Create filters again for UI reset
    createFilters();
});

// On download
download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `${new Date().toLocaleDateString()}.png`;
    link.href = imageCanvas.toDataURL();
    link.click();
});