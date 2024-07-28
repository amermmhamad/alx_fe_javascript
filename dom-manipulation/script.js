document.addEventListener('DOMContentLoaded', function () {
    const quotes = [
      { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
      { text: "Your time is limited, don't waste it living someone else's life.", category: "Motivation" }
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
  
    // Function to show a random quote
    function showRandomQuote() {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      quoteDisplay.innerHTML = `${quote.text} - <em>${quote.category}</em>`;
    }
  
    // Function to add a new quote
    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value.trim();
      const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
      if (newQuoteText === "" || newQuoteCategory === "") {
        alert('Please enter both quote text and category.');
        return;
      }
  
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
  
      // Clear input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      alert('Quote added successfully!');
    }
  
    // Function to create the form for adding a new quote
    function createAddQuoteForm() {
      const formContainer = document.createElement('div');
  
      const inputText = document.createElement('input');
      inputText.id = 'newQuoteText';
      inputText.type = 'text';
      inputText.placeholder = 'Enter a new quote';
      formContainer.appendChild(inputText);
  
      const inputCategory = document.createElement('input');
      inputCategory.id = 'newQuoteCategory';
      inputCategory.type = 'text';
      inputCategory.placeholder = 'Enter quote category';
      formContainer.appendChild(inputCategory);
  
      const addButton = document.createElement('button');
      addButton.id = 'addQuoteBtn';
      addButton.textContent = 'Add Quote';
      addButton.addEventListener('click', addQuote);
      formContainer.appendChild(addButton);
  
      document.body.appendChild(formContainer);
    }
  
    // Attach event listener for showing a new quote
    newQuoteButton.addEventListener('click', showRandomQuote);
  
    // Create the form for adding a new quote
    createAddQuoteForm();
  
    // Show an initial random quote
    showRandomQuote();
  });
  