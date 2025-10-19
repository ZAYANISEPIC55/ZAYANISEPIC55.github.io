// Wait until the page has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the HTML element and the two buttons
  const html = document.documentElement;
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  // Safety check: stop if buttons aren't found
  if (!lightBtn || !darkBtn) return;

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
});
