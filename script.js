document.addEventListener("DOMContentLoaded", function () {
  const bingoGrid = document.getElementById("bingoGrid");
  const newGameBtn = document.getElementById("newGameBtn");
  const callWebsiteBtn = document.getElementById("callWebsiteBtn");
  const calledWebsitesDisplay = document.getElementById("calledWebsites");
  const winMessage = document.getElementById("winMessage");
  const placeholder = document.querySelector(".placeholder");

  let calledWebsites = [];

  const size = 5;

  // Curated list of absurd websites
  const absurdWebsites = [
    { name: "The Useless Web", url: "https://theuselessweb.com/" },
    { name: "Pointer Pointer", url: "https://pointerpointer.com/" },
    { name: "Endless Horse", url: "http://endless.horse/" },
    { name: "Staggering Beauty", url: "http://www.staggeringbeauty.com/" },
    { name: "Paper Toilet", url: "https://papertoilet.com/" },
    { name: "Weird or Confusing", url: "https://weirdorconfusing.com/" },
    { name: "The Secret Door", url: "http://thesecretdoor.com/" },
    { name: "Zoom Quilt", url: "https://zoomquilt.org/" },
    { name: "Infinite Sushi", url: "https://chrismckenzie.com/sushi/" },
    { name: "Is It Christmas?", url: "https://isitchristmas.com/" },
    { name: "The Password Game", url: "https://neal.fun/password-game/" },
    { name: "Draw a Stickman", url: "http://www.drawastickman.com/" },
    { name: "Bacon Ipsum", url: "https://baconipsum.com/" },
    { name: "Cat Ipsum", url: "http://www.catipsum.com/" },
    { name: "Zombie Ipsum", url: "http://www.zombieipsum.com/" },
    { name: "Potato or Not", url: "https://potatoornot.com/" },
    { name: "Rainy Mood", url: "https://www.rainymood.com/" },
    { name: "My Noise", url: "https://mynoise.net/" },
    {
      name: "The Quiet Place",
      url: "https://thequietplaceproject.xyz/thequietplace",
    },
    { name: "The Size of Space", url: "https://neal.fun/size-of-space/" },
    { name: "The Deep Sea", url: "https://neal.fun/deep-sea/" },
    { name: "Internet Map", url: "http://internet-map.net/" },
    { name: "The Wiki Game", url: "https://www.thewikigame.com/" },
    { name: "The Evolution of Trust", url: "https://ncase.me/trust/" },
    { name: "Bouncing DVD Logo", url: "https://www.bouncingdvdlogo.com/" },
    { name: "Long Doge Challenge", url: "https://longdogechallenge.com/" },
    { name: "Maze", url: "https://maze.toys/maze/" },
    { name: "The Infinite Adventure", url: "https://infinite-adventure.com/" },
    {
      name: "The Never Ending Reddit",
      url: "https://www.reddit.com/r/AskReddit/comments/2np694/",
    },
    { name: "The Oatmeal", url: "https://theoatmeal.com/" },
    {
      name: "The Most Dangerous Writing App",
      url: "https://www.squibler.io/dangerous-writing-prompt-app",
    },
    {
      name: "The Nicest Place on the Internet",
      url: "https://thenicestplaceontheinter.net/",
    },
    {
      name: "The World's Worst Website",
      url: "https://www.theworldsworstwebsiteever.com/",
    },
    { name: "The Ugly Website", url: "https://theuglywebsite.com/" },
    {
      name: "The Best Page in the Universe",
      url: "https://maddox.xmission.com/",
    },
    {
      name: "The Most Useless Website",
      url: "https://www.themostuselesswebsite.com/",
    },
    {
      name: "The Most Boring Website",
      url: "https://www.themostboringwebsite.com/",
    },
    {
      name: "The Most Pointless Website",
      url: "https://www.themostpointlesswebsite.com/",
    },
    {
      name: "The Most Annoying Website",
      url: "https://www.themostannoyingwebsite.com/",
    },
    {
      name: "The Most Frustrating Website",
      url: "https://www.themostfrustratingwebsite.com/",
    },
    {
      name: "The Most Confusing Website",
      url: "https://www.themostconfusingwebsite.com/",
    },
    {
      name: "The Most Ridiculous Website",
      url: "https://www.themostridiculouswebsite.com/",
    },
    {
      name: "The Most Stupid Website",
      url: "https://www.themoststupidwebsite.com/",
    },
    {
      name: "The Most Silly Website",
      url: "https://www.themostsillywebsite.com/",
    },
    {
      name: "The Most Funny Website",
      url: "https://www.themostfunnywebsite.com/",
    },
    {
      name: "The Most Weird Website",
      url: "https://www.themostweirdwebsite.com/",
    },
    {
      name: "The Most Random Website",
      url: "https://www.themostrandomwebsite.com/",
    },
    {
      name: "The Most Strange Website",
      url: "https://www.themoststrangewebsite.com/",
    },
    { name: "The Most Odd Website", url: "https://www.themostoddwebsite.com/" },
    {
      name: "The Most Quirky Website",
      url: "https://www.themostquirkywebsite.com/",
    },
    {
      name: "The Most Eccentric Website",
      url: "https://www.themosteccentricwebsite.com/",
    },
    {
      name: "The Most Unusual Website",
      url: "https://www.themostunusualwebsite.com/",
    },
    {
      name: "The Most Bizarre Website",
      url: "https://www.themostbizarrewebsite.com/",
    },
  ];

  // Initialize the game
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
