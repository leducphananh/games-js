document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  const brightnessSlider = document.getElementById("brightness");
  const contrastSlider = document.getElementById("contrast");
  const filterSelect = document.getElementById("filter");
  const imageCanvas = document.getElementById("imageCanvas");
  const ctx = imageCanvas.getContext("2d");
  const brightnessValueDisplay = document.getElementById("brightnessValue");
  const contrastValueDisplay = document.getElementById("contrastValue");
  const downloadButton = document.getElementById("downloadImage");
  const resetButton = document.getElementById("resetControls");

  let originalImage = null;
  let currentImageSettings = {
    brightness: 100,
    contrast: 100,
    filter: "none",
  };

  imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        originalImage = new Image();
        originalImage.onload = () => {
          // Set canvas dimensions to match image to avoid distortion
          imageCanvas.width = originalImage.width;
          imageCanvas.height = originalImage.height;
          applyAdjustments(); // Initial draw
        };
        originalImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
      resetControls(); // Reset sliders when new image is loaded
    }
  });

  function applyAdjustments() {
    if (!originalImage) return;

    // Clear canvas
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    // Apply CSS-like filters directly on the canvas context
    // Note: Order matters. Brightness and contrast are applied first.
    let filterString = "";
    filterString += `brightness(${currentImageSettings.brightness}%) `;
    filterString += `contrast(${currentImageSettings.contrast}%) `;

    switch (currentImageSettings.filter) {
      case "grayscale":
        filterString += "grayscale(100%) ";
        break;
      case "sepia":
        filterString += "sepia(100%) ";
        break;
      case "invert":
        filterString += "invert(100%) ";
        break;
      case "blur":
        filterString += "blur(3px) "; // Example blur value
        break;
      // A simple sharpen effect is harder with just CSS filters.
      // For a true sharpen, pixel manipulation would be needed, or a library.
      // This is a placeholder or you might use a contrast boost as a pseudo-sharpen.
      case "sharpen":
        // Simple sharpen using unsharp mask principle is complex with just canvas filters.
        // We can try a slight contrast increase for a very basic effect, or use a predefined SVG filter.
        // For this example, we'll keep it simple and note its limitation.
        // No direct CSS filter for simple sharpen, so we'll rely on contrast or skip for now.
        // Or, apply a convolution matrix (more advanced)
        break;
    }

    ctx.filter = filterString.trim();
    ctx.drawImage(originalImage, 0, 0, imageCanvas.width, imageCanvas.height);

    // If sharpen is selected, apply a simple convolution matrix (basic sharpen)
    if (currentImageSettings.filter === "sharpen" && originalImage) {
      // Reset filter to draw original image first if needed, then apply matrix
      // Or draw to an offscreen canvas first, then apply matrix, then draw to main
      // For simplicity here, we apply sharpen after other filters.
      // This is a VERY basic sharpen and might not always look great.
      // A more robust solution would involve a dedicated library or more complex pixel manipulation.
      ctx.filter = "none"; // Remove other filters before applying convolution
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = imageCanvas.width;
      tempCanvas.height = imageCanvas.height;
      // Draw the already filtered image (brightness/contrast/other filters) to temp canvas
      tempCtx.filter = filterString.replace("sharpen", "").trim(); // apply all but sharpen
      tempCtx.drawImage(originalImage, 0, 0);

      const imageData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      const sharpenedData = applySharpenMatrix(imageData);
      ctx.putImageData(sharpenedData, 0, 0);
    }

    // Reset filter for any subsequent direct drawing operations if needed
    // ctx.filter = 'none'; // Uncomment if you have other direct draw calls later
  }

  function applySharpenMatrix(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const outputData = new Uint8ClampedArray(data.length);

    // Sharpen convolution kernel
    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
    const kernelSize = 3;
    const halfKernel = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const imgX = Math.min(width - 1, Math.max(0, x - halfKernel + kx));
            const imgY = Math.min(height - 1, Math.max(0, y - halfKernel + ky));
            const weight = kernel[ky * kernelSize + kx];
            const index = (imgY * width + imgX) * 4;

            r += data[index] * weight;
            g += data[index + 1] * weight;
            b += data[index + 2] * weight;
          }
        }
        const outputIndex = (y * width + x) * 4;
        outputData[outputIndex] = Math.min(255, Math.max(0, r));
        outputData[outputIndex + 1] = Math.min(255, Math.max(0, g));
        outputData[outputIndex + 2] = Math.min(255, Math.max(0, b));
        outputData[outputIndex + 3] = data[outputIndex + 3]; // Alpha
      }
    }
    return new ImageData(outputData, width, height);
  }

  brightnessSlider.addEventListener("input", (event) => {
    currentImageSettings.brightness = event.target.value;
    brightnessValueDisplay.textContent = `${currentImageSettings.brightness}%`;
    applyAdjustments();
  });

  contrastSlider.addEventListener("input", (event) => {
    currentImageSettings.contrast = event.target.value;
    contrastValueDisplay.textContent = `${currentImageSettings.contrast}%`;
    applyAdjustments();
  });

  filterSelect.addEventListener("change", (event) => {
    currentImageSettings.filter = event.target.value;
    applyAdjustments();
  });

  resetButton.addEventListener("click", () => {
    resetControls();
    applyAdjustments();
  });

  function resetControls() {
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    filterSelect.value = "none";

    currentImageSettings.brightness = 100;
    currentImageSettings.contrast = 100;
    currentImageSettings.filter = "none";

    brightnessValueDisplay.textContent = "100%";
    contrastValueDisplay.textContent = "100%";
  }

  downloadButton.addEventListener("click", () => {
    if (!originalImage) {
      alert("Vui lòng tải ảnh lên trước!");
      return;
    }
    const dataURL = imageCanvas.toDataURL("image/png"); // or 'image/jpeg'
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "filtered-image.png"; // Default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Initialize display for sliders
  brightnessValueDisplay.textContent = `${brightnessSlider.value}%`;
  contrastValueDisplay.textContent = `${contrastSlider.value}%`;
});
