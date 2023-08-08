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
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    });
  });
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
  // Sample hardcoded event data
  const eventData = [
    {
      id: 1,
      description: 'Festival de muzica electronica',
      img: './src/assets/untold_poster.jpg',
      name: 'Untold',
      ticketCategories: [
        { id: 1, description: 'General Admission' },
        { id: 2, description: 'VIP' },
      ],
    },
    {
      id: 2,
      description: 'Festival de muzica rock',
      img: './src/assets/rockstadt_poster.png',
      name: 'Rockstadt',
      ticketCategories: [
        { id: 1, description: 'General Admission' },
        { id: 2, description: 'VIP' },
      ],
    },
    {
      id: 3,
      description: 'Festival de jazz',
      img: './src/assets/jazz_poster.jpeg',
      name: 'Jazz in the Park',
      ticketCategories: [
        { id: 1, description: 'General Admission' },
        { id: 2, description: 'VIP' },
      ],
    }
  ]

  // Create the event card element
  const eventCard = document.createElement('div');
  eventCard.classList.add('event-card');
  // Create the event content markup
  const contentMarkup = `
    <header>
      <h2 class="event-title text-2xl font-bold">${eventData[0].name}</h2>
    </header>
    <div class="content">
      <img src="${eventData[0].img}" alt="${eventData[0].name}" class="event-image w-full height-200 rounded object-cover mb-4">
      <p class="description text-gray-700">${eventData[0].description}</p>
    </div>
    <header>
      <h2 class="event-title text-2xl font-bold">${eventData[1].name}</h2>
    </header>
    <div class="content">
      <img src="${eventData[1].img}" alt="${eventData[1].name}" class="event-image w-full height-200 rounded object-cover mb-4">
      <p class="description text-gray-700">${eventData[1].description}</p>
    </div>
    <header>
      <h2 class="event-title text-2xl font-bold">${eventData[2].name}</h2>
    </header>
    <div class="content">
      <img src="${eventData[2].img}" alt="${eventData[2].name}" class="event-image w-full height-200 rounded object-cover mb-4">
      <p class="description text-gray-700">${eventData[2].description}</p>
    </div>
  `;
  eventCard.innerHTML = contentMarkup;
  const eventsContainer = document.querySelector('.events');
  // Append the event card to the events container
  eventsContainer.appendChild(eventCard);
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
