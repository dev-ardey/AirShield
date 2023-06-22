// Get references to the elements
const textBlock1 = document.getElementById('why-text-block-1');
const textBlock2 = document.getElementById('why-text-block-2');
const textBlock3 = document.getElementById('why-text-block-3');
const indoorHealth = document.getElementById('indoor-health');
const outdoorHealth = document.getElementById('outdoor-health');
const longtermHealth = document.getElementById('longterm-health');


// first button is always activated
let midButtonActive = outdoorHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
let midButtonBeInFromt = textBlock2.style.zIndex = 2;


// Attach event listeners to the buttons
indoorHealth.addEventListener('click', function () {
    // Set z-index to 2 for outdoorHealth and 1 for others
    textBlock1.style.zIndex = 2;
    indoorHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
    textBlock2.style.zIndex = 1;
    outdoorHealth.style.background = '';
    textBlock3.style.zIndex = 1;
    longtermHealth.style.background = '';
    document.getElementById("why-text-block-1").classList.add("pulse");


});


outdoorHealth.addEventListener('click', function () {
    // Set z-index to 2 for outdoorHealth and 1 for others
    textBlock2.style.zIndex = 2;
    outdoorHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
    textBlock1.style.zIndex = 1;
    indoorHealth.style.background = '';
    textBlock3.style.zIndex = 1;
    longtermHealth.style.background = '';
    document.getElementById("why-text-block-2").classList.add("pulse");



});

longtermHealth.addEventListener('click', function () {
    // Set z-index to 2 for longtermHealth and 1 for others
    textBlock3.style.zIndex = 2;
    longtermHealth.style.background = "linear-gradient(0deg, rgba(0, 255, 157), rgb(0, 195, 255))";
    textBlock1.style.zIndex = 1;
    indoorHealth.style.background = '';
    textBlock2.style.zIndex = 1;
    outdoorHealth.style.background = '';
    document.getElementById("why-text-block-3").classList.add("pulse");


});




// side scroll animation
// working first one not working


// // Get the side-scroll-block elements
// const sideScrollBlocks = document.querySelectorAll('.side-scroll-block');

// // Check if the elements exist before proceeding
// if (sideScrollBlocks.length > 0) {
//   // Add the class initially
//   sideScrollBlocks.forEach(block => block.classList.add('pulse-on'));

//   // Add scroll event listener to the container
//   const sideScrollContainer = document.getElementById('what-side-scroll');
//   sideScrollContainer.addEventListener('scroll', handleScroll);

//   // Function to handle scroll event
//   function handleScroll() {
//     // Check if scroll snapping is active for each side-scroll-block
//     sideScrollBlocks.forEach(block => {
//       const isSnapped = isBlockSnapped(block);
//       if (isSnapped) {
//         block.classList.remove('pulse-on');
//       } 
//     //   else {
//     //     block.classList.add('pulse-on');
//     //   }
//     });
//   }

//   // Function to check if scroll snapping is active for a specific side-scroll-block
//   function isBlockSnapped(block) {
//     const containerRect = sideScrollContainer.getBoundingClientRect();
//     const blockRect = block.getBoundingClientRect();
//     const containerCenter = containerRect.left + containerRect.width / 2;
//     const blockCenter = blockRect.left + blockRect.width / 2;
//     const distanceToCenter = Math.abs(containerCenter - blockCenter);
//     return distanceToCenter < 1;
//   }
// }











// Get the side-scroll-block elements
const sideScrollBlocks = document.querySelectorAll('.side-scroll-block');

// Check if the elements exist before proceeding
if (sideScrollBlocks.length > 0) {
    // Add the class initially
    sideScrollBlocks.forEach(block => block.classList.add('pulse-on'));

    // Add scroll event listener to the container
    const sideScrollContainer = document.getElementById('what-side-scroll');
    sideScrollContainer.addEventListener('scroll', handleScroll);

    // Function to handle scroll event
    function handleScroll() {
        // Check if scroll snapping is active for each side-scroll-block
        sideScrollBlocks.forEach((block, index) => {
            const isSnapped = isBlockSnapped(block);
            const nextBlock = sideScrollBlocks[index + 1];
            const isNextSnapped = nextBlock ? isBlockSnapped(nextBlock) : true;

            if ((index === 0 && !isNextSnapped) || (isSnapped && (!nextBlock || !isNextSnapped))) {
                block.classList.remove('pulse-on');
            }
        });
    }

    // Function to check if scroll snapping is active for a specific side-scroll-block
    function isBlockSnapped(block) {
        const containerRect = sideScrollContainer.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const blockCenter = blockRect.left + blockRect.width / 2;
        const distanceToCenter = Math.abs(containerCenter - blockCenter);
        return distanceToCenter < 1;
    }
}






