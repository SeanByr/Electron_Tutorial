const video = document.getElementById('camera');
const captureButton = document.getElementById('capture-image');
const imageTag = document.getElementById('image');

const CAMERA_DISPLAY_WIDTH = 240;
const CAMERA_DISPLAY_HEIGHT = 180;

video.style.width = `${CAMERA_DISPLAY_WIDTH}px`;
video.style.height = `${CAMERA_DISPLAY_HEIGHT}px`;

captureButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL();

  console.log(dataURL);
  imageTag.src = dataURL;
});

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: CAMERA_DISPLAY_WIDTH,
        height: CAMERA_DISPLAY_HEIGHT,
      },
    });
    video.srcObject = stream;
  } catch (error) {
    console.error('camera error:', error);
    document.body.insertAdjacentHTML('beforeend', '<p>Unable to access camera.</p>');
  }
}

startCamera();

//  navigator.permissions.query({name: 'microphone'})
//  .then((permissionObj) => {
//   console.log(permissionObj.state);
//  })
//  .catch((error) => {
//   console.log('Got error :', error);
//  })

// navigator.permissions.query({name: 'camera'})
//  .then((permissionObj) => {
//   console.log(permissionObj.state);
//  })
//  .catch((error) => {
//   console.log('Got error :', error);
//  })

// console.log('camera.js loaded');

// const video = document.querySelector('#camera');

// console.log('video element:', video);

// const constraints = {
//   audio: true,
//   video: { width: 400, height:300 },
// };

// console.log('requesting camera...');

// navigator.mediaDevices.getUserMedia(constraints)
//   .then((mediaStream) => {
//     console.log('camera stream received:', mediaStream);

//     video.srcObject = mediaStream;

//     video.onloadedmetadata = () => {
//       console.log('video metadata loaded');
//       video.play();
//     };
//   })
//   .catch((err) => {
//     console.error('getUserMedia failed:', err.name, err.message);
//   });
