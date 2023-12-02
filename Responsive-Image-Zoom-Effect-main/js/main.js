// Get references to DOM elements
const zoomContainer = document.getElementById("zoomContainer"),
      zoomImage = document.getElementById("zoomImage"),
      boxes = document.querySelectorAll(".box");

// Store original image source of the zoomContainer
let originalImageSrc = zoomImage.src;

// Add click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Swap image sources between clicked box and zoomContainer
    const clickedImage = box.querySelector("img");
    const tempImageSrc = clickedImage.src;

    clickedImage.src = originalImageSrc;
    zoomImage.src = tempImageSrc;

    originalImageSrc = zoomImage.src;
  });
});

// Zoom effect on mousemove inside the zoomContainer
zoomContainer.addEventListener("mousemove", (e) => {
  // Get the dimensions and position of the zoomContainer
  const { left, top, width, height } = zoomContainer.getBoundingClientRect();

  // Calculate mouse position relative to zoomContainer
  const mouseX = e.clientX - left;
  const mouseY = e.clientY - top;

  // Set the zoom ratio (1.5x) and calculate zoom offsets
  const zoomRatio = 1.5;
  const zoomX = (mouseX / width) * (1 - zoomRatio);
  const zoomY = (mouseY / height) * (1 - zoomRatio);

  // Apply zoom and translation to the zoomImage
  zoomImage.style.transform = `scale(${zoomRatio}) translate(${zoomX * 100}%, ${
    zoomY * 100
  }%)`;

  // Change cursor to indicate zoom-in
  zoomContainer.style.cursor = "zoom-in";
});

// Reset zoom effect and cursor on mouseout
zoomContainer.addEventListener("mouseout", () => {
  zoomImage.style.transform = "scale(1) translate(0%, 0%)";
  zoomContainer.style.cursor = "default";
});
