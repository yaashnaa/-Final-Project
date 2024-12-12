document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('instructionModal');
    const closeButton = document.querySelector('.close-button');
    const startButton = document.getElementById('start-button');
  
    // Show the modal on page load
    modal.style.display = 'flex';
  
    // Close modal when clicking the close button
    closeButton.onclick = () => {
      modal.style.display = 'none';
    };
  
    // Close modal when clicking the start button
    startButton.onclick = () => {
      modal.style.display = 'none';
    };
  
    // Close modal when clicking outside the modal content
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  });
  