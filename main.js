/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}
// HTML templates
function getHomePageTemplate() {
  return `
   <div id="content" >
      <!--<img src="./src/assets/crowd.jpg" alt="summer" class="homepage-image">-->
      <div class="events flex items-center justify-center flex-wrap">
      </div>
    </div>
  `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
    </div>
  `;
}

function setupNavigationEvents() {
  const navLinks = document.querySelectorAll('nav a')
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const href = link.getAttribute('href')
      navigateTo(href)
    })
  })
}

function setupMobileMenuEvent() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function setupPopstateEvent() {
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    renderContent(currentUrl);
  });
}

function setupInitialPage() {
  const initialUrl = window.location.pathname;
  renderContent(initialUrl);
}

function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();
  fetchTicketEvents().then((data) => {
    addEvents(data);
  });
}

// Get Events
async function fetchTicketEvents() {
  const response = await fetch('https://localhost:7003/api/Event/GetAll');
  const data = await response.json();
  return data;
}

const addEvents = (events) => {
  const eventsDiv = document.querySelector('.events');
  eventsDiv.innerHTML = 'No events available';

  if (events.length) {
    eventsDiv.innerHTML = '';
    events.forEach((event) => {
      eventsDiv.appendChild(createEvent(event));
    });
  }
}

const createEvent = (eventData) => {
  const eventElement = createEventElement(eventData);
  return eventElement;
};

const createEventElement = (eventData) => {
  const { eventId, eventName, eventDescription } = eventData;
  console.log(eventData);
  const eventDiv = document.createElement('div');
  const contentMarkup = `
    <header>
        <h2 class="event-title text-2xl font-bold">${eventName}</h2>
    </header>
    <div class="content">
    <p class="description text-gray-700">${eventId}</p>
      <p class="description text-gray-700">${eventDescription}</p>
    </div>
  `;
  eventDiv.innerHTML = contentMarkup;
  return eventDiv;
}

function renderOrdersPage(categories) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();
}

// Render content based on URL
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage()
  }
}

// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();