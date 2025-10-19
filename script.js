document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const lightBtn = document.getElementById('light-btn');
  const darkBtn = document.getElementById('dark-btn');

  if (!lightBtn || !darkBtn) return;

  // Function to update button colors based on theme
  function updateButtonColors() {
    if (html.classList.contains('dark')) {
      // Dark mode → both buttons dark
      lightBtn.style.backgroundColor = '#333';
      darkBtn.style.backgroundColor = '#333';
      lightBtn.style.color = 'white';
      darkBtn.style.color = 'white';
    } else {
      // Light mode → both buttons light
      lightBtn.style.backgroundColor = '#f0f0f0';
      darkBtn.style.backgroundColor = '#f0f0f0';
      lightBtn.style.color = '#000';
      darkBtn.style.color = '#000';
    }
  }

  // Set theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Update button colors immediately
  updateButtonColors();

  // Light button click
  lightBtn.addEventListener('click', () => {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateButtonColors();
  });

  // Dark button click
  darkBtn.addEventListener('click', () => {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateButtonColors();
  });
});

