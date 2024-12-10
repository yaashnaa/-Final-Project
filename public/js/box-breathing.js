let squareSize = 300; 
let circleX, circleY; 
let timer = 0; 
let duration = 60;
let holdDuration = 60; 
let phases = ['INHALE', 'HOLD', 'EXHALE', 'HOLD'];

let phaseIndex = 0; 
let sliderBreath, sliderHold; // Sliders for breath and hold duration

function setup() {
  createCanvas(600, 600);
  circleX = width / 2 - squareSize / 2; // Start at the left side
  circleY = height / 2 - squareSize / 2;
  textAlign(CENTER, CENTER);
  textSize(24);

  // sliders
  sliderBreath = createSlider(1, 10, duration/60); 
  sliderBreath.position(10, height - 60);
  sliderBreath.size(150);

  sliderHold = createSlider(1, 10, holdDuration/60); 
  sliderHold.position(10, height - 30);
  sliderHold.size(150);
}

function draw() {
  background(10, 60, 90); // Deep blue background

  // Update duration values from sliders
  duration = sliderBreath.value() *60;
  holdDuration = sliderHold.value() * 60;

  // Draw instructions for sliders
  fill(255);
  text("Breath Duration: " + sliderBreath.value() + "s", 200, height - 50);
  text("Hold Duration: " + sliderHold.value() + "s", 200, height - 20);
  // Draw the square
  noFill();
  stroke(20, 100, 140);
  strokeWeight(8);
  rectMode(CENTER);
  for (let i = 0; i < 3; i++) {
    rect(width / 2, height / 2, squareSize + i * 20, squareSize + i * 20);
  }


  fill(180, 220, 230);
  noStroke();
  ellipse(circleX, circleY, 30, 30);
let currentPhase = phases[phaseIndex];

  fill(255);
  noStroke();
  text(currentPhase, width / 2, height - 100);

  timer++;
  let progress;

  if (currentPhase === "INHALE" || currentPhase === "EXHALE") {
    progress = timer / duration;
  } else if (currentPhase === "HOLD") {
    progress = timer / holdDuration;
  }

  if (currentPhase === "INHALE") {

    // lerp logic explained by AI
    circleX = lerp(width / 2 - squareSize / 2, width / 2 + squareSize / 2, progress);
    circleY = height / 2 - squareSize / 2;
    if (timer >= duration) {
      timer = 0;
      phaseIndex = (phaseIndex + 1) % phases.length;
    }
  } else if (currentPhase === "HOLD" && phaseIndex === 1) {

    circleX = width / 2 + squareSize / 2;
    circleY = lerp(height / 2 - squareSize / 2, height / 2 + squareSize / 2, progress);
    if (timer >= holdDuration) {
      timer = 0;
      phaseIndex = (phaseIndex + 1) % phases.length;
    }
  } else if (currentPhase === "EXHALE") {

    circleX = lerp(width / 2 + squareSize / 2, width / 2 - squareSize / 2, progress);
    circleY = height / 2 + squareSize / 2;
    if (timer >= duration) {
      timer = 0;
      phaseIndex = (phaseIndex + 1) % phases.length;
    }
  } else if (currentPhase === "HOLD" && phaseIndex === 3) {

    circleX = width / 2 - squareSize / 2;
    circleY = lerp(height / 2 + squareSize / 2, height / 2 - squareSize / 2, progress);
    if (timer >= holdDuration) {
      timer = 0;
      phaseIndex = 0; 
    }
  
  }
}
