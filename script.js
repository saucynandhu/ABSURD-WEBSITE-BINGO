document.addEventListener("DOMContentLoaded", function () {
  const bingoGrid = document.getElementById("bingoGrid");
  const newGameBtn = document.getElementById("newGameBtn");
  const callWebsiteBtn = document.getElementById("callWebsiteBtn");
  const calledWebsitesDisplay = document.getElementById("calledWebsites");
  const winMessage = document.getElementById("winMessage");
  const placeholder = document.querySelector(".placeholder");

  let calledWebsites = [];

  const size = 5;

  let absurdWebsites = [];

  fetch("webs.json")
    .then((response) => response.json())
    .then((data) => {
      absurdWebsites = data;

      console.log(absurdWebsites);

      const randomSite =
        absurdWebsites[Math.floor(Math.random() * absurdWebsites.length)];
      console.log(`Open: ${randomSite.name} → ${randomSite.url}`);
    })
    .catch((error) => {
      console.error("Error loading absurd websites:", error);
    });

  newGameBtn.addEventListener("click", startNewGame);
  callWebsiteBtn.addEventListener("click", callWebsite);
  startNewGame();

  function startNewGame() {
    calledWebsites = [];
    calledWebsitesDisplay.innerHTML =
      "Called: <span class='placeholder'>None yet...</span>";
    winMessage.textContent = "";
    generateBingoCard();
  }

  function generateBingoCard() {
    bingoGrid.innerHTML = "";
    bingoCard = [];

    // Shuffle and select 24 websites (25 cells with FREE center)
    const shuffled = [...absurdWebsites].sort(() => 0.5 - Math.random());
    const selectedWebsites = shuffled.slice(0, 24);

    // Create the grid
    let websiteIndex = 0;
    for (let row = 0; row < size; row++) {
      const rowElement = document.createElement("div");
      rowElement.className = "bingo-row";

      for (let col = 0; col < size; col++) {
        const cell = document.createElement("div");
        cell.className = "bingo-cell";

        if (row === 2 && col === 2) {
          cell.textContent = "FREE";
          cell.classList.add("free");
        } else {
          const website = selectedWebsites[websiteIndex++];
          cell.textContent = website.name;
          cell.dataset.url = website.url;
        }

        cell.addEventListener("click", function () {
          if (!cell.classList.contains("free")) {
            cell.classList.toggle("marked");
            checkForWin();
          }
        });

        rowElement.appendChild(cell);
      }

      bingoGrid.appendChild(rowElement);
    }
  }

  function callWebsite() {
    if (calledWebsites.length >= absurdWebsites.length) {
      alert("All weird websites have been called!");
      return;
    }

    let website;
    do {
      website =
        absurdWebsites[Math.floor(Math.random() * absurdWebsites.length)];
    } while (calledWebsites.includes(website.name));

    calledWebsites.push(website.name);
    placeholder?.remove();

    const link = document.createElement("a");
    link.href = website.url;
    link.textContent = website.name;
    link.target = "_blank";
    calledWebsitesDisplay.appendChild(link);
    const gap = document.createElement("span");
    gap.textContent = ", ";
    calledWebsitesDisplay.appendChild(gap);
    calledWebsitesDisplay.appendChild(document.createTextNode(" "));

    // Mark the website on the card if it exists
    document.querySelectorAll(".bingo-cell").forEach((cell) => {
      if (cell.textContent === website.name) {
        cell.classList.add("marked");
        checkForWin();
      }
    });
  }

  function checkForWin() {
    const cells = document.querySelectorAll(".bingo-cell");
    const size = 5;
    let markedCells = Array(size)
      .fill()
      .map(() => Array(size).fill(false));

    // Convert DOM state to 2D array
    let index = 0;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        markedCells[col][row] =
          cells[index].classList.contains("marked") ||
          cells[index].classList.contains("free");
        index++;
      }
    }

    // Check all rows
    for (let row = 0; row < size; row++) {
      if (markedCells.every((col) => col[row])) {
        winMessage.textContent = "BINGO! You've completed a row!";
        return;
      }
    }

    // Check all columns
    for (let col = 0; col < size; col++) {
      if (markedCells[col].every((cell) => cell)) {
        winMessage.textContent = "BINGO! You've completed a column!";
        return;
      }
    }

    // Check diagonals
    if (
      markedCells.every((col, i) => col[i]) ||
      markedCells.every((col, i) => col[size - 1 - i])
    ) {
      winMessage.textContent = "BINGO! Diagonal win!";
    }
  }
});

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved user preference or use system preference
const savedMode = localStorage.getItem("darkMode");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

// Apply dark mode if saved preference exists or system prefers dark
if (savedMode === "enabled" || (!savedMode && systemPrefersDark)) {
  body.classList.add("dark-mode");
  darkModeToggle.textContent = "🌞"; // Sun icon for dark mode
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Update icon and save preference
  if (body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "🤍";
    localStorage.setItem("darkMode", "enabled");
  } else {
    darkModeToggle.textContent = "🖤";
    localStorage.setItem("darkMode", "disabled");
  }
});
