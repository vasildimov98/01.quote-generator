const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

function showLoadingSpinner() {
  loader.style.display = "block";
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.style.display = "none";
}

function getNewQuote() {
  showLoadingSpinner();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author || "Unknown";
  hideLoadingSpinner();
}

async function getGuotesFromApi() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    getNewQuote();
  } catch {}
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent}. - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

getGuotesFromApi();
