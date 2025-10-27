// Audio files
const tap = new Audio("tap.mp3");
const win = new Audio("win.mp3");

// Lottery gifts array
const lotteryGifts = [
  "Phone",
  "Laptop",
  "Card",
  "Earbuds",
  "Console",
  "Voucher",
  "Bike",
  "Books",
  "Decor",
  "Tracker",
  "Speaker",
  "Watch",
  "Tablet",
  "Camera",
  "Reader",
  "Subscription",
  "Basket",
  "Spa Pass",
  "Jewelry",
  "Coffee Maker",
  "Cookware",
  "Games",
  "Appliance",
  "Tent",
  "Weights",
  "Toolkit",
  "Bag",
  "Pen",
  "Art Kit",
  "Shades",
  "Shoes",
  "Wallet",
  "Perfume",
  "Figure",
  "Toy",
  "Puzzle",
  "Ornament",
  "Gear",
  "Instrument",
  "Wine",
  "Pet Kit",
  "Candles",
  "Tools",
  "Album",
  "Car Mat",
  "Shirt",
  "Mug",
  "Bag",
  "Charm",
  "Crafts",
];

// DOM elements
let btn = document.getElementById("btn");
let container = document.getElementById("container");
let result = document.getElementById("result");

// Add lottery boxes to the container
lotteryGifts.forEach((value, index) => {
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="box" id="${index + 1}">${index + 1}. ${value}</div>`
  );
});

// Button click event
btn.addEventListener("click", function () {
  console.log("Button clicked");
  btn.disabled = true;

  // Clear previous highlights
  for (let i = 1; i <= 50; i++) {
    document.getElementById(i).classList.remove("winbox", "highlightbox");
  }

  // Display "Please Wait!"
  result.textContent = "Please Wait!";

  let secCounter = 0;

  // Random box highlighting with interval
  const interId = setInterval(function () {
    try {
      tap.currentTime = 0;
      tap.play();
    } catch (error) {
      console.error("Tap audio playback error:", error.message);
    }

    secCounter++;
    let randBox = Math.floor(Math.random() * 50) + 1;

    // Highlight the random box
    for (let j = 1; j <= 50; j++) {
      if (j === randBox) {
        document.getElementById(j).classList.add("highlightbox");
      } else {
        document.getElementById(j).classList.remove("highlightbox");
      }
    }

    // Stop the interval after 5 iterations and announce the winner
    if (secCounter === 5) {
      let randN = Math.floor(Math.random() * 50) + 1;
      result.innerHTML = ` Congratulations! You won a ${
        lotteryGifts[randN - 1]
      } at ${randN} `;
      document.getElementById(randBox).classList.remove("highlightbox");
      document.getElementById(randN).classList.add("winbox");

      // Play win audio
      try {
        win.currentTime = 0;
        win.play();
      } catch (error) {
        console.error("Win audio playback error:", error.message);
      }

      clearInterval(interId);
      btn.disabled = false;
    }
  }, 1000);
});
