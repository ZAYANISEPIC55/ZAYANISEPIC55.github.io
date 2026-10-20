// Shared navigation and small interactive features for Just4Fun Castles.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const params = new URLSearchParams(window.location.search);
  const enquiry = params.get('enquiry');
  const enquirySelect = document.querySelector('#enquiry-type');
  if (enquiry && enquirySelect && [...enquirySelect.options].some(option => option.value === enquiry)) {
    enquirySelect.value = enquiry;
  }

  const calculator = document.querySelector('#calculator-form');
  if (calculator) {
    calculator.addEventListener('submit', event => {
      event.preventDefault();
      const days = Number(document.querySelector('#hire-days').value);
      const price = Number(document.querySelector('#base-price').value);
      const result = document.querySelector('#estimate-result');
      if (!Number.isFinite(price) || price < 0) {
        result.textContent = 'Please enter a valid daily price.';
        return;
      }
      result.textContent = `Estimated hire total: £${(days * price).toFixed(2)} (${days} day${days === 1 ? '' : 's'}). Delivery, deposits and extras are not included.`;
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      // IMPORTANT: replace this placeholder with your real business email before publishing.
      const businessEmail = 'REPLACE-WITH-YOUR-EMAIL@example.com';
      if (businessEmail.includes('REPLACE-WITH-YOUR-EMAIL')) {
        document.querySelector('#contact-result').textContent =
          'The form is ready, but the business email has not been set yet. Edit assets/script.js and replace the placeholder email address.';
        return;
      }
      const data = new FormData(contactForm);
      const subject = encodeURIComponent(`Just4Fun Castles — ${data.get('enquiry')} enquiry`);
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nEnquiry: ${data.get('enquiry')}\n\nMessage:\n${data.get('message')}`
      );
      window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
    });
  }
});
