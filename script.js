const fileInput = document.querySelector(".file-input")
const chooseImgBtn = document.querySelector(".choose-img")
const previewImg = document.querySelector(".preview-img img")
const filterSlider = document.querySelector(".slider input ")
const filterName = document.querySelector(".slider-info .name")
const filterValue = document.querySelector(".slider-info .value")
const filterOptions = document.querySelectorAll(".filter button")
const rotateOptions = document.querySelectorAll(".rotate button")
const resetFilterBtn = document.querySelector(".reset-filter")
const saveImgBtn = document.querySelector(".save-img")

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale( ${flipVertical}, ${flipHorizontal})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%)invert(${inversion}%)`
}


const loadImage = () => {
    let file = fileInput.files[0]; // getting user selected file
    console.log(file)
    if (!file) return;// return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file)// passing file url as preview img src
    previewImg.addEventListener("load", () => {
        resetFilterBtn.clic()// cliking reset btn,so the filter value reset if the user select new image
        document.querySelector(".container").classList.remove("disable")
    })

}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active")
        filterName.innerText = option.innerText

        if (option.id === "brightness") {
            filterSlider.max = "200"
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`
        } else if (option.id === "saturation") {
            filterSlider.max = "200"
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if (option.id === "grayscale") {
            filterSlider.max = "100"
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`
        } else {
            filterSlider.max = "100"
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`
        }

    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`
    const selectedFilter = document.querySelector(".filter .active")

    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value
    } else {
        grayscale = filterSlider.value
    }
    applyFilters()
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90
        } else if (option.id === "right") {
            rotate += 90
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applyFilters()
    })
})

const resetFilter = () => {
    //resetting all variable value to its default value

     brightness = 100; saturation = 100; inversion = 0;grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click()
     
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement("canvas")// creating canvas elements
    const ctx = canvas.getContext("2d") // canvas.getContext return drawind context on the canvas
    canvas.with = previewImg.naturalWidth
    canvas.height = previewImg.naturalHeight
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%)invert(${inversion}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2)
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180 )
    }
    ctx.scale(flipHorizontal,flipVertical)
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
    const link = document.createElement("a")//creating <a> element</a>
    link.download = "image.jpg"
    link.href = canvas.toDataURL()
    link.click()
}

fileInput.addEventListener("change", loadImage)
filterSlider.addEventListener("input", updateFilter)
resetFilterBtn.addEventListener("click", resetFilter)
saveImgBtn.addEventListener("click", saveImage)
chooseImgBtn.addEventListener("click", () => fileInput.click())