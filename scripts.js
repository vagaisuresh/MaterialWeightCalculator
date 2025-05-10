let crossSectionEl = document.getElementById("cross-section");
let crossSectionImageEl = document.getElementById("cross-section-image");

let materialEl = document.getElementById("material");   // material input element
let densityEl = document.getElementById("density");     // density input element

const form = document.getElementById("form");
//const submitEl = document.getElementById("submit");

crossSectionEl.addEventListener("change", function() {
    let crossSection = crossSectionEl.value;

    changeImage(crossSection);
    showHideInputDivs(crossSection);
});

materialEl.addEventListener("change", function() {
    let materialValue = materialEl.value;
    let density = 0;

    switch (materialValue) {
        case "ti":
            density = 4.506;
            break;
        case "ta":
            density = 16.654;
            break;
        case "zr":
            density = 6.505;
            break;
        default: density = 0;
    }

    densityEl.value = density;
    quantity.value = 1;
});

form.addEventListener("submit", function(event) {
    //alert("Form Submitted!");
    calculateWeight();

    event.preventDefault();
    //alert("Form submission prevented!");
});

/* submitEl.addEventListener("click", function() {
    alert("Submit button clicked!");
    
}); */

function changeImage(crossSection) {
    let imageName = "";

    switch (crossSection) {
        case "Rod":
            imageName = "round";
            break;
        
        case "Sheet":
            imageName = "rectangle";
            break;
        
        case "Plate":
            imageName = "rectangle";
            break;

        default:
            imageName = "";
    }
    
    if (imageName != "") {
        let imageSource = "./assets/images/" + imageName + ".gif";
        crossSectionImageEl.setAttribute("src", imageSource);
        crossSectionImageEl.classList.remove("hidden");
    } else {
        crossSectionImageEl.classList.add("hidden");
    }
}

function showHideInputDivs(crossSection) {
    const thicknessDivEl = document.getElementById("div-thickness");
    const diameterDivEl = document.getElementById("div-diameter");
    const widthDivEl = document.getElementById("div-width");
    const lengthDivEl = document.getElementById("div-length");

    lengthDivEl.classList.remove("hidden");     // Required for all cross-sections

    if (crossSection === "Sheet" || crossSection === "Plate") {
        thicknessDivEl.classList.remove("hidden");
        diameterDivEl.classList.add("hidden");
        widthDivEl.classList.remove("hidden");
    } else if (crossSection === "Rod") {
        thicknessDivEl.classList.add("hidden");
        diameterDivEl.classList.remove("hidden");
        widthDivEl.classList.add("hidden");
    } else {
        thicknessDivEl.classList.add("hidden");
        diameterDivEl.classList.add("hidden");
        widthDivEl.classList.add("hidden");
        lengthDivEl.classList.add("hidden");
    }
}

function calculateWeight() {
    const weightKgEl = document.getElementById("weight-kg");
    const weightLbsEl = document.getElementById("weight-lbs");

    let weightGrms = materialWeightCalculation();
    let conversion = convertGrams(weightGrms);

    weightKgEl.value = conversion.kg.toFixed(3);
    weightLbsEl.value = conversion.lbs.toFixed(3);
}

function materialWeightCalculation() {
    let crossSection = crossSectionEl.value;
    let weight = 0;

    let densityValue = parseFloat(densityEl.value);         // Convert to float

    let thicknessEl = document.getElementById("thickness"); // thickness input element
    let diameter = document.getElementById("diameter");     // diameter input element
    let widthEl = document.getElementById("width");         // width input element
    let length = document.getElementById("length");         // length input element
    let quantity = document.getElementById("quantity");     // quantity input element

    let thickValue = parseFloat(thicknessEl.value);         // Convert to float
    let diameterValue = parseFloat(diameter.value);         // Convert to float
    let widthValue = parseFloat(widthEl.value);             // Convert to float
    let lengthValue = parseFloat(length.value);             // Convert to float
    let quantityValue = parseInt(quantity.value, 10);       // Convert to integer

    switch (crossSection) {
        case "Sheet":
            // Converted in to gram insted kg, so divided by 1000 only
            // ((T x W x L x Den) / 1000000) x Pcs
            weight = ((thickValue * widthValue * lengthValue * densityValue) / 1000) * quantityValue;
            break;
        case "Rod":
            // (( D x D x L x Den x 0.785398) / 1000000) x Pcs
            weight = ((diameterValue * diameterValue * lengthValue * densityValue * 0.785398) / 1000) * quantityValue;
            break;
        case "Plate":
            // Same as Sheet
            weight = ((thickValue * widthValue * lengthValue * densityValue) / 1000) * quantityValue;
            break;
        default:
            weight = 0;
    }

    return weight;
}

function convertGrams(g) {
    let kg = g / 1000;              // Convert grams to kilograms
    let lbs = g / 453.59237;        // Convert grams to pounds

    return { kg: kg, lbs: lbs };    // Return as object
}

/*
    Formula for Calculations (as actual)
    --------------------------------------------------------
    Round (Rod & Wire):

    Find the radius (r)         :   r = d / 2
    Calculate the volume (V)    :   V = π * (r²) * l
    Calculate the weight (W)    :   W = V * D

    d - diameter
    l - length
    D - density
    --------------------------------------------------------
*/
