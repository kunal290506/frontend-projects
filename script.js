const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

function openDetails(btn) {
  const card = btn.closest('.event-card');
  const details = card.querySelector('.event-details');
  const isOpen = details.style.display === 'block';

  document.querySelectorAll('.event-details').forEach(d => {
    d.style.display = 'none';
  });

  document.querySelectorAll('.btn-book').forEach(b => {
    if (b.textContent === 'Hide Details') {
      b.textContent = 'Book Ticket';
    }
  });

  if (!isOpen) {
    details.style.display = 'block';
    btn.textContent = 'Hide Details';
    card.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }
}

const form = document.getElementById('bookingForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const eventSelect = document.getElementById('eventSelect');
const ticketCount = document.getElementById('ticketCount');
const submitBtn = document.getElementById('submitBtn');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const eventError = document.getElementById('eventError');
const ticketError = document.getElementById('ticketError');

function setError(field, errorElement, message) {
  field.classList.add('invalid');
  errorElement.textContent = message;
}

function clearError(field, errorElement) {
  field.classList.remove('invalid');
  errorElement.textContent = '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
  let isValid = true;

  if (fullName.value.trim().length < 2) {
    setError(fullName, nameError, 'Please enter your full name.');
    isValid = false;
  } else {
    clearError(fullName, nameError);
  }

  if (!isValidEmail(email.value.trim())) {
    setError(email, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(email, emailError);
  }

  if (!eventSelect.value) {
    setError(eventSelect, eventError, 'Please select an event.');
    isValid = false;
  } else {
    clearError(eventSelect, eventError);
  }

  const tickets = parseInt(ticketCount.value, 10);

  if (!ticketCount.value || isNaN(tickets) || tickets < 1 || tickets > 10) {
    setError(ticketCount, ticketError, 'Enter a number between 1 and 10.');
    isValid = false;
  } else {
    clearError(ticketCount, ticketError);
  }

  return isValid;
}

[fullName, email, eventSelect, ticketCount].forEach(field => {
  field.addEventListener('input', () => {
    field.classList.remove('invalid');
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!validateForm()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing…';

  const userName = fullName.value.trim();
  const userEmail = email.value.trim();
  const eventText = eventSelect.options[eventSelect.selectedIndex].text;
  const tickets = ticketCount.value;

  setTimeout(() => {
    showConfirmation(userName, userEmail, eventText, tickets);
  }, 1200);
});

function showConfirmation(name, userEmail, eventText, tickets) {
  document.getElementById('mainSite').style.display = 'none';

  const confirmPage = document.getElementById('confirmPage');
  confirmPage.style.display = 'flex';

  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });

  const firstName = name.split(' ')[0];

  document.getElementById('confirmHeading').textContent =
    `Thanks for booking, ${firstName}! 🎉`;

  document.getElementById('confirmEmail').textContent = userEmail;
  document.getElementById('sumEvent').textContent =
    eventText.split('—')[0].trim();

  document.getElementById('sumTickets').textContent =
    tickets + (tickets == 1 ? ' ticket' : ' tickets');

  const reference =
    'TV-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  document.getElementById('bookingRef').textContent = reference;
}

function goHome() {
  document.getElementById('confirmPage').style.display = 'none';
  document.getElementById('mainSite').style.display = 'block';

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Confirm Booking';
}

function goEvents() {
  document.getElementById('confirmPage').style.display = 'none';
  document.getElementById('mainSite').style.display = 'block';

  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Confirm Booking';

  setTimeout(() => {
    document
      .getElementById('events')
      .scrollIntoView({ behavior: 'smooth' });
  }, 50);
}