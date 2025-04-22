let images = [];
let glitchImages = [];
let isImageGlitched = [false, false, false, false]; // État individuel de chaque polaroid
let polaroids = [];
let polaroidTexts = ["Hirena", "Emile", "Lily", "Paolina"];
let backgroundImg;
let resetTimers = [0, 0, 0, 0]; // Compteurs de temps pour chaque image

function preload() {
  backgroundImg = loadImage("fond.jpg"); // Chargement du fond

  // Charger les images normales et glitchées
  let normalFiles = ["PERSO1.jpeg", "PERSO3.jpeg", "PERSO5.jpeg", "PERSO7.jpeg"];
  let glitchFiles = ["PERSO2.jpeg", "PERSO4.jpeg", "PERSO6.jpeg", "PERSO8.jpeg"];

  for (let i = 0; i < normalFiles.length; i++) {
    images[i] = loadImage(normalFiles[i]);  
    glitchImages[i] = loadImage(glitchFiles[i]);  
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupPolaroids();
}

function setupPolaroids() {
  let polaroidSize = min(width, height) / 3;

  polaroids = [
    { x: width / 4 - polaroidSize / 2, y: height / 4 - polaroidSize / 2, size: polaroidSize },
    { x: (3 * width) / 4 - polaroidSize / 2, y: height / 4 - polaroidSize / 2, size: polaroidSize },
    { x: width / 4 - polaroidSize / 2, y: (3 * height) / 4 - polaroidSize / 2, size: polaroidSize },
    { x: (3 * width) / 4 - polaroidSize / 2, y: (3 * height) / 4 - polaroidSize / 2, size: polaroidSize }
  ];
}

function draw() {
  // Afficher le fond en plein écran
  image(backgroundImg, 0, 0, width, height);

  for (let i = 0; i < polaroids.length; i++) {
    let p = polaroids[i];

    // Ombre du cadre
    fill(20);
    rect(p.x + 5, p.y + 5, p.size, p.size + 50, 15);

    // Cadre blanc
    fill(240);
    rect(p.x, p.y, p.size, p.size + 50, 10);

    // Choisir l'image à afficher
    if (isImageGlitched[i]) {
      applySubtleGlitchEffect(glitchImages[i], p.x + 10, p.y + 10, p.size - 20, p.size - 20);
    } else {
      image(images[i], p.x + 10, p.y + 10, p.size - 20, p.size - 20);
    }

    // Texte sous l'image
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(polaroidTexts[i], p.x + p.size / 2, p.y + p.size + 25);

    // Si le timer de cette image est écoulé, réactiver le glitch
    if (millis() - resetTimers[i] > 1500 && !isImageGlitched[i]) {
      isImageGlitched[i] = true;
    }
  }
}

// Effet de glitch subtil mais efficace
function applySubtleGlitchEffect(img, x, y, w, h) {
  let offsetX = random(-2, 2); // Décalage horizontal très léger
  let offsetY = random(-2, 2); // Décalage vertical très léger
  let randomSize = random(0.98, 1.02); // Très légère variation de la taille pour ajouter du "bug"

  push();
  translate(offsetX, offsetY); // Appliquer le décalage
  image(img, x, y, w * randomSize, h * randomSize);  // Appliquer une taille légèrement variable
  pop();
}

// Quand on appuie sur ESPACE, toutes les images passent en mode glitché
function keyPressed() {
  if (key === ' ') {
    for (let i = 0; i < isImageGlitched.length; i++) {
      isImageGlitched[i] = true;
    }
  }
}

// Quand on clique sur une image, elle redevient normale
function mousePressed() {
  for (let i = 0; i < polaroids.length; i++) {
    let p = polaroids[i];

    // Vérifier si la souris est dans la zone du polaroid
    if (mouseX > p.x && mouseX < p.x + p.size && mouseY > p.y && mouseY < p.y + p.size) {
      isImageGlitched[i] = false; // Désactiver le glitch sur cette image
      resetTimers[i] = millis(); // Enregistrer l'heure de réinitialisation pour cette image
    }
  }
}

// Adapter la taille du canvas quand la fenêtre est redimensionnée
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupPolaroids();
}
