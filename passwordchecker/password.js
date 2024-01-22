const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");

// An array of password requirements with corresponding 
// regular expressions and index of the requirement list item
const requirements = [
  { regex: /.{8,}/, index: 0 }, // Minimum of 8 characters
  { regex: /[0-9]/, index: 1 }, // At least one number
  { regex: /[a-z]/, index: 2 }, // At least one lowercase letter
  { regex: /[^A-Za-z0-9]/, index: 3 }, // At least one special character
  { regex: /[A-Z]/, index: 4 }, // At least one uppercase letter
];

passwordInput.addEventListener("keyup", (e) => {
  requirements.forEach(item => {
    // Check if the password matches the requirement regex
    const isValid = item.regex.test(e.target.value);
    const requirementItem = requirementList[item.index];

    // Updating class and icon of requirement item if requirement matched or not
    if (isValid) {
      requirementItem.classList.add("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-check";
    } else {
      requirementItem.classList.remove("valid");
      requirementItem.firstElementChild.className = "fa-solid fa-circle";
    }
  });
});

eyeIcon.addEventListener("click", () => {
  // Toggle the password input type between "password" and "text"
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";

  // Update the eye icon class based on the password input type
  eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});

// script.js

const patternGrid = document.getElementById('pattern-grid');
const patternStrength = document.getElementById('pattern-strength');
let selectedPattern = [];

// Define a set of patterns (each pattern is an array of grid cell indexes)
const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to generate the pattern grid
function generatePatternGrid() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.setAttribute('data-index', i);
    cell.onclick = togglePatternCell;
    patternGrid.appendChild(cell);
  }
}

// Function to handle the cell click event for the pattern
function togglePatternCell(event) {
  const cellIndex = parseInt(event.target.getAttribute('data-index'));
  if (selectedPattern.includes(cellIndex)) {
    selectedPattern = selectedPattern.filter(index => index !== cellIndex);
    event.target.classList.remove('selected');
  } else {
    selectedPattern.push(cellIndex);
    event.target.classList.add('selected');
  }
  updatePatternInfo();
}

// Function to reset the pattern
function resetPattern() {
  selectedPattern = [];
  const patternCells = document.querySelectorAll('.grid-cell');
  patternCells.forEach(cell => {
    cell.classList.remove('selected');
  });
  patternStrength.textContent = 'Pattern Strength: ';
  patternInfo.textContent = 'Pattern not selected';
}

// Function to update the pattern information
function updatePatternInfo() {
  if (selectedPattern.length === 0) {
    patternStrength.textContent = 'Pattern Strength: ';
  } else {
    const patternStrengthValue = calculatePatternStrength(selectedPattern);
    patternStrength.textContent = `Pattern Strength: ${patternStrengthValue}`;
  }
}

// Function to verify the selected pattern
function verifyPattern() {
  const patternStrengthValue = calculatePatternStrength(selectedPattern);
  patternStrength.textContent = `Pattern Strength: ${patternStrengthValue}`;
}

// Function to calculate the pattern strength
function calculatePatternStrength(pattern) {
  // Implement your pattern strength calculation logic here.
  // Consider factors like length, uniqueness, and complexity.

  // Calculate pattern length
  const patternLength = pattern.length;

  // Calculate uniqueness (number of unique cells in the pattern)
  const uniqueCells = new Set(pattern).size;

  // Calculate complexity (e.g., number of different rows and columns used)
  const uniqueRows = new Set(pattern.map(cell => Math.floor(cell / 3))).size;
  const uniqueCols = new Set(pattern.map(cell => cell % 3)).size;

  // You can define your own scoring system based on these factors.
  // This is a simple example:

  let score = 0;

  // Length-based score
  if (patternLength < 3) {
    score += 1;
  } else if (patternLength < 6) {
    score += 2;
  } else {
    score += 3;
  }

  // Uniqueness-based score
  if (uniqueCells < 5) {
    score += 1;
  } else if (uniqueCells < 7) {
    score += 2;
  } else {
    score += 3;
  }

  // Complexity-based score
  if (uniqueRows < 2 || uniqueCols < 2) {
    score += 1;
  } else {
    score += 2;
  }

  // Calculate the overall pattern strength
  if (score <= 3) {
    return 'Weak';
  } else if (score <= 6) {
    return 'Moderate';
  } else {
    return 'Strong';
  }
}

// Additional HTML elements
const resetPatternButton = document.createElement('button');
resetPatternButton.textContent = 'Reset Pattern';
resetPatternButton.id = 'reset-pattern-button';
resetPatternButton.addEventListener('click', resetPattern);
document.body.appendChild(resetPatternButton);

const patternInfo = document.createElement('div');
patternInfo.id = 'pattern-info';
document.body.appendChild(patternInfo);

// Generate the pattern grid
generatePatternGrid();
