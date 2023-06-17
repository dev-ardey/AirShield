// Get references to the elements
const textBlock1 = document.getElementById('why-text-block-1');
const textBlock2 = document.getElementById('why-text-block-2');
const textBlock3 = document.getElementById('why-text-block-3');
const indoorHealth = document.getElementById('indoor-health');
const outdoorHealth = document.getElementById('outdoor-health');
const longtermHealth = document.getElementById('longterm-health');

// why images
const whyImg1 = document.getElementById('why-img-1');
const whyImg2 = document.getElementById('why-img-2');
const whyImg3 = document.getElementById('why-img-3');



// first button is always activated
let midButtonActive = outdoorHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
let midButtonBeInFront = textBlock2.style.zIndex = 2;

// first why image
let MidImgBeInFront = whyImg2.style.zIndex = 2;


// Attach event listeners to the buttons
indoorHealth.addEventListener('click', function () {
    // Set z-index to 2 for outdoorHealth and 1 for others
    textBlock1.style.zIndex = 2;
    indoorHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
    textBlock2.style.zIndex = 1;
    outdoorHealth.style.background = '';
    textBlock3.style.zIndex = 1;
    longtermHealth.style.background = '';


    // why images
    whyImg1.style.zIndex = 2;
    whyImg2.style.zIndex = 1;
    whyImg3.style.zIndex = 1;

});


outdoorHealth.addEventListener('click', function () {
    // Set z-index to 2 for outdoorHealth and 1 for others
    textBlock2.style.zIndex = 2;
    outdoorHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
    textBlock1.style.zIndex = 1;
    indoorHealth.style.background = '';
    textBlock3.style.zIndex = 1;
    longtermHealth.style.background = '';

     // why images
     whyImg1.style.zIndex = 1;
     whyImg2.style.zIndex = 2;
     whyImg3.style.zIndex = 1;

});

longtermHealth.addEventListener('click', function () {
    // Set z-index to 2 for longtermHealth and 1 for others
    textBlock3.style.zIndex = 2;
    longtermHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
    textBlock1.style.zIndex = 1;
    indoorHealth.style.background = '';
    textBlock2.style.zIndex = 1;
    outdoorHealth.style.background = '';

     // why images
     whyImg1.style.zIndex = 1;
     whyImg2.style.zIndex = 1;
     whyImg3.style.zIndex = 2;
});




// document.getElementById("outdoor-health").style.background = "linear-gradient(270deg, rgb(255, 112, 119), rgb(252, 74, 127))";
