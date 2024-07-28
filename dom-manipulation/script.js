document.addEventListener('DOMContentLoaded', function () {
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
      { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
      { text: "Your time is limited, don't waste it living someone else's life.", category: "Motivation" }
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');
    const exportButton = document.getElementById('exportQuotes');
    const importFileInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Function to save quotes to local storage
    function saveQuotes() {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  
    // Function to show a random quote
    function showRandomQuote() {
      const filteredQuotes = getFilteredQuotes();
      if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = 'No quotes available for the selected category.';
        return;
      }
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `${quote.text} - <em>${quote.category}</em>`;
      sessionStorage.setItem('lastQuote', JSON.stringify(quote));
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
      saveQuotes();
      updateCategoryFilter();
  
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
  
    // Function to export quotes to a JSON file
    function exportToJsonFile() {
      const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotes.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  
    // Function to import quotes from a JSON file
    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        updateCategoryFilter();
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    // Function to update the category filter options
    function updateCategoryFilter() {
      const categories = [...new Set(quotes.map(quote => quote.category))];
      categoryFilter.innerHTML = '<option value="all">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
  
    // Function to get quotes based on the selected category
    function getFilteredQuotes() {
      const selectedCategory = categoryFilter.value;
      if (selectedCategory === 'all') {
        return quotes;
      }
      return quotes.filter(quote => quote.category === selectedCategory);
    }
  
    // Function to filter quotes based on the selected category
    function filterQuotes() {
      showRandomQuote();
      localStorage.setItem('selectedCategory', categoryFilter.value);
    }
  
    // 
  