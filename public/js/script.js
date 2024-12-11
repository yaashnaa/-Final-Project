// Select modal elements
const modal = document.getElementById('instructionModal');
const closeButton = document.querySelector('.close-button');
const startButton = document.getElementById('start-button');
const candleStartButton= document.getElementById('candleStartButton');

window.onload = () => {
  modal.style.display = 'flex'; // Show the modal as a flex container
};


closeButton.onclick = () => {
  modal.style.display = 'none';
};


startButton.onclick = () => {
  modal.style.display = 'none';
};

// Close modal if user clicks outside the modal content
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// window.onSpotifyIframeApiReady = (IFrameAPI) => {
//     const element = document.getElementById('embed-iframe');
//     const options = {
//         width: '60%',
//         height: '200',
//         uri: 'spotify:37i9dQZF1DWZqd5JICZI0u?si=25b3deda5769489d'
//       };
//     const callback = (EmbedController) => {};
//     IFrameAPI.createController(element, options, callback);
//   };
  