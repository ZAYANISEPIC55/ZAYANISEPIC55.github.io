document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  if (!lightBtn || !darkBtn) return;

  // Function to update active button style
  function updateActiveButton() {
    if (html.classList.contains('dark')) {
      darkBtn.style.backgroundColor = '#555'; // active
      darkBtn.style.color = 'white';
      lightBtn.style.backgroundColor = '#f0f0f0'; // inactive
      lightBtn.style.color = '#000';
    } else {
      lightBtn.style.backgroundColor = '#ffd700'; // active
      lightBtn.style.color = '#000';
      darkBtn.style.backgroundColor = '#f0f0f0'; // inactive
      darkBtn.style.color = '#000';
    }
  }

  // Load saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Update button styles on load
  updateActiveButton();

  // Light button click
  lightBtn.addEventListener('click', () => {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateActiveButton(); // only light button highlighted
  });

  // Dark button click
  darkBtn.addEventListener('click', () => {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateActiveButton(); // only dark button highlighted
  });
});
