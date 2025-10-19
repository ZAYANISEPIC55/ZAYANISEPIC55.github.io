const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
  toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  if (html.classList.contains('dark')) {
    toggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    toggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});
