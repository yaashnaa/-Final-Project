let speechRec;
let listening = false; // To track if we're listening
const affirmations = [
  "I am worthy of love and respect.",
  "I am strong and capable.",
  "I trust in my ability to overcome challenges.",
  "I choose to focus on what I can control.",
  "I am calm, centered, and in control.",
  "My mind is clear, and my heart is at peace.",
  "I am free from worry and embrace serenity.",
  "I deserve to be kind to myself.",
  "I am proud of my progress, no matter how small.",
  "I am open to growth and change.",
  "I release fear and welcome courage.",
  "I am grateful for the present moment.",
  "I attract positivity and good energy.",
  "I am confident in my decisions.",
  "I forgive myself for past mistakes.",
  "I trust the process of life.",
  "I am surrounded by love and support.",
  "I am resilient and will rise again.",
  "I am patient with myself.",
  "I am at peace with who I am.",
  "I choose hope over fear.",
  "I am enough.",
  "I prioritize my mental well-being.",
  "I can handle whatever comes my way.",
  "I am deserving of rest and relaxation.",
  "I let go of negativity and embrace joy.",
  "I believe in myself.",
  "I focus on solutions, not problems.",
  "I am safe, secure, and grounded.",
  "I trust myself to make the right choices.",
  "I am grateful for my strength.",
  "I welcome happiness into my life.",
  "I am capable of handling change.",
  "I am a work in progress, and that’s okay.",
  "I love myself unconditionally.",
  "I prioritize my peace.",
  "I am brave, bold, and beautiful.",
  "I accept myself completely.",
  "I find joy in the little things.",
  "I breathe in calmness and exhale stress.",
  "I am proud of who I am becoming.",
  "I am enough, just as I am.",
  "I let go of self-judgment.",
  "I choose to move forward with courage.",
  "I find strength in my challenges.",
  "I am a source of light and love.",
  "I am capable of healing and growth.",
  "I am kind to myself and others.",
  "I deserve to feel good about myself.",
  "I am grateful for today’s opportunities.",
  "I embrace my uniqueness.",
  "I am at peace with my journey.",
  "I am strong, even in my struggles.",
  "I celebrate my achievements.",
  "I trust in my ability to persevere.",
];
let affirmationBtns;

let currentAffirmation = ""; // Current affirmation being displayed
let inputText = ""; // Latest recognized input
let feedback=''
function setup() {
  canvas = createCanvas(600, 400);
  background(200);
  canvas.parent("container");
  speech = new p5.Speech();
  speech.started();
  speech.ended();
  affirmationBtns = document.getElementById("affirmation-btns");
  // Initialize SpeechRec
  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true; // Keep listening continuously
  speechRec.interimResults = false; // Only capture finalized results

  // Create buttons for interaction
  let startButton = createButton("Start Practicing");
  startButton.addClass("button-33");
  //   startButton.position(width/2, 350);
  startButton.mousePressed(startListening);
  startButton.parent(affirmationBtns);
  let stopButton = createButton("Stop Listening");
  //   stopButton.position(width/2, 350);
  stopButton.mousePressed(stopListening);
  stopButton.parent(affirmationBtns);
  stopButton.addClass("button-33");

  showRandomAffirmation();

}


function draw() {
  background(listening ? color(180, 255, 180) : 220); // Green when listening

  // Display the current affirmation
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Please repeat:", width / 2, 50);
  text(currentAffirmation, width / 2, 100);

  // Display the user’s spoken text
  textSize(16);
  fill(50, 150, 200);
  text(feedback, width / 2, 230);
}

// Start listening for speech
function startListening() {
    startSpeaking();
    // console.log(currentAffirmation);
}

function startSpeaking() {
  // background('green');
  console.log("Speaking: " + currentAffirmation);
  let voices = speech.voices;
  let voice = voices[1];
  speech.setVoice('SpeechSynthesisVoice');
  speech.setRate(0.3);
  speech.setPitch(1);
  speech.speak(currentAffirmation);
  speech.onEnd= () => {
    // console.log("Speech ended");
    if (!listening) {
        listening = true;
        speechRec.start();
        console.log(currentAffirmation);
    } else{
        currentAffirmation= currentAffirmation
        // console.log("Speech ended, but we are already listening");
    }

  }

}

// Stop listening for speech
function stopListening() {
  listening = false;
  //   speechRec.stop();
}

function gotSpeech() {
  if (speechRec.resultValue) {
    inputText = speechRec.resultString.trim(); // Trim whitespace for accuracy


      const normalizedInput = normalizeInput(inputText);
      const normalizedAffirmation = normalizeInput(currentAffirmation);
    if (isMatch(normalizedInput, normalizedAffirmation)) {
        // startSpeaking(currentAffirmation);
        console.log(currentAffirmation);
      console.log("Affirmation completed!");
      showRandomAffirmation(); // Move to the next affirmation
    } else {
        feedback= 'Try again';
      console.log(
        `Mismatch: Input="${normalizedInput}" vs Affirmation="${normalizedAffirmation}"`
      );
    }
  }
}
function normalizeInput(text) {
    return text
      .toLowerCase()
      .normalize('NFC') // Normalize to NFC form
      .replace(/[.,!?]/g, '');
  }
  
  function isMatch(input, affirmation) {
    const keywords = affirmation.split(" ");
    for (const keyword of keywords) {
      if (input.includes(keyword)) {
        return true;
      }
    }
    return false;
  }
// Show a random affirmation
function showRandomAffirmation() {
  currentAffirmation = random(affirmations);
  console.log("Next Affirmation: " + currentAffirmation);

  // Schedule the speaking of the new affirmation after a short delay
  setTimeout(() => {
    startSpeaking(currentAffirmation);
  }, 500)
//   console.log("Next Affirmation: " + currentAffirmation);
}
