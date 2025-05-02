let x, y; //positioning of the 
let currentColor = 'pink';
let command = '';
let recognition;
let startButton;

function setup() {
  createCanvas(800, 600);
  background(255);
  x = width / 2;
  y = height / 2;

  // Add a button to start listening
  startButton = createButton('Start Listening');
  startButton.position(10, 10);
  startButton.mousePressed(startListening);
}

function draw() {
  fill(currentColor);
  noStroke();

  if (command === 'circle') {
    ellipse(x, y, 50, 50);
    command = '';
  } else if (command === 'square') {
    rect(x - 25, y - 25, 50, 50);
    command = '';
  } else if (command === 'triangle') {
    triangle(x, y - 30, x - 25, y + 20, x + 25, y + 20);
    command = '';
  } else if (command === 'clear') {
    background(255);
    command = '';
  } else if (command === 'blue') {
    currentColor = 'blue';
    command = '';
  } else if (command === 'red') {
    currentColor = 'red';
    command = '';
  } else if (command === 'left') {
    x -= 20;
    command = '';
  } else if (command === 'right') {
    x += 20;
    command = '';
  } else if (command === 'up') {
    y -= 20;
    command = '';
  } else if (command === 'down') {
    y += 20;
    command = '';
  }
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Sorry, your browser does not support the Web Speech API.');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = function (event) {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log('Heard:', transcript);
    command = transcript;
  };

  recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
  };

  recognition.start();
}
