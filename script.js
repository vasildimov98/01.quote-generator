const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

// Show Loading
function loading() {
  loader.style.display = "block";
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.style.display = "none";
}

// Show New Quote
function getNewQuote() {
  loading();
  // Pick Random quote from quotes
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Populate text and author

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author || "Unknown";
  complete();
}

// Get Guotes From API
async function getGuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    getNewQuote();
  } catch {}
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent}. - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", getNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getGuotes();
