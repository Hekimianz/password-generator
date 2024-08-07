document.addEventListener("DOMContentLoaded", () => {
  const sliderValue = document.querySelector(".length__value");
  const slider = document.querySelector(".length__input");

  // Function to update slider appearance
  function updateSlider() {
    const tempSliderValue = slider.value;

    sliderValue.textContent = tempSliderValue;

    // Calculate progress percentage
    const progress =
      ((tempSliderValue - slider.min) / (slider.max - slider.min)) * 100;

    // Set the gradient background for the slider track
    slider.style.background = `linear-gradient(to right, var(--neon-green) ${progress}%, var(--very-dark-grey) ${progress}%)`;
  }

  // Initialize slider appearance on DOM load
  updateSlider();

  // Update slider appearance on input change
  slider.addEventListener("input", updateSlider);
});
