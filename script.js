// Get references to the HTML element and the two buttons
const html = document.documentElement;
const lightBtn = document.getElementById('light-btn');
const darkBtn = document.getElementById('dark-btn');

// Check saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
} else {
  html.classList.remove('dark');
}

// Light button click event
lightBtn.addEventListener('click', () => {
  html.classList.remove('dark');
  localStorage.setItem('theme', 'light');
});

// Dark button click event
darkBtn.addEventListener('click', () => {
  html.classList.add('dark');
  localStorage.setItem('theme', 'dark');
});
