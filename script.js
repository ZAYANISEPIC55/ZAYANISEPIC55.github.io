document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  if (!lightBtn || !darkBtn) return;

  // Function to update button styles
  function updateActiveButton() {
    if (html.classList.contains('dark')) {
      // Dark mode active
      darkBtn.style.backgroundColor = '#555'; // subtle highlight
      lightBtn.style.backgroundColor = '#f0f0f0'; // neutral
    } else {
      // Light mode active
      lightBtn.style.backgroundColor = '#ddd'; // subtle highlight
      darkBtn.style.backgroundColor = '#f0f0f0'; // neutral
    }
    // Keep emoji colors normal
    lightBtn.style.color = '#000';
    darkBtn.style.color = '#000';
  }

  // Load saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Update buttons immediately
  updateActiveButton();

  // Light button click
  lightBtn.addEventListener('click', () => {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateActiveButton();
  });

  // Dark button click
  darkBtn.addEventListener('click', () => {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateActiveButton();
  });
});
