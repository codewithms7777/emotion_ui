const video = document.getElementById('video');

// Start video stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  }).catch(err => console.error("Camera Error:", err));

// Load models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/static/models/tiny_face_detector_model'),
  faceapi.nets.faceExpressionNet.loadFromUri('/static/models/face_expression_model')
]).then(startDetection);

// Detect face and expressions
function startDetection() {
  setInterval(async () => {
    const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
    if (!result) {
      console.log('No face detected');
      return;
    }

    // Log expressions to see if they are being detected
    console.log('Detected Emotions:', result.expressions);

    // Get the dominant expression
    const mood = getDominantExpression(result.expressions);
    console.log('Detected Mood:', mood);
    
    // Update UI based on mood
    updateUI(mood);
  }, 1500);
}

// Function to get the dominant expression
function getDominantExpression(expressions) {
  const max = Object.entries(expressions).reduce((max, curr) => {
    return curr[1] > max[1] ? curr : max;
  });

  // Set a threshold for detection
  if (max[1] < 0.2) {
    return "neutral";  // If none of the emotions exceed 20%, return "neutral"
  }

  return max[0]; // Return the dominant emotion
}


// Function to update UI
function updateUI(mood) {
       const moodMap = {
         happy:  { color: '#ffe600', img: '/static/img/happy.png', text: 'You look happy!' },
         sad:    { color: '#001f3f', img: '/static/img/sad.png', text: 'Feeling down?' },
         angry:  { color: '#ff4136', img: '/static/img/angry.png', text: 'Whoa! You seem angry!' },
       };
     
       const config = moodMap[mood] || { color: '#ffffff', img: '', text: '' };
     
       // Change background
       document.body.style.backgroundColor = config.color;
     
       // Show emoji
       const emoji = document.getElementById('mood-emoji');
       const text = document.getElementById('mood-text');
       if (config.img) {
         emoji.src = config.img;
         emoji.style.display = 'inline';
       } else {
         emoji.style.display = 'none';
       }
     
       // Set mood text
       text.textContent = config.text;
     }
     
