document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        "The only way to do great work is to love what you do.",
        "Start where you are. Use what you have. Do what you can.",
        "Don't wait. The time will never be just right.",
        "Done is better than perfect.",
        "You don't have to be great to start, but you have to start to be great.",
        "The future depends on what you do today.",
        "Small progress is still progress.",
        "Focus on being productive instead of busy.",
        "Your time is limited, don't waste it living someone else's life.",
        "The best way to predict the future is to create it."
    ];

    const quoteElement = document.getElementById('random-quote');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    function updateQuote() {
        quoteElement.textContent = getRandomQuote();
    }

    newQuoteBtn.addEventListener('click', updateQuote);
    updateQuote(); // Show initial quote
}); 