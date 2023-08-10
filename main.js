/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import { addEvents } from './src/utils';
import { createOrderElement } from './src/components/createOrderElement';
import { removeLoader, showLoader } from './src/components/removeOrAddLoader';

function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}

// HTML templates
function getHomePageTemplate() {
  return `
   <div id="content" >
      <div class="events flex items-center justify-center flex-wrap space-x-4 space-y-4"">
      </div>
    </div>
  `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center">Purchased Tickets</h1>
      <div class="orders ml-6 mr-6">
      </div>
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

// Get Events
async function fetchTicketEvents() {
  const response = await fetch('http://localhost:8080/api/v1/events');
  const data = await response.json();
  return data;
}

// Get Orders
async function fetchOrders() {
  const response = await fetch('http://localhost:8080/api/v1/orders?customerID=2');
  const data = await response.json();
  return data;
}

function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();
  showLoader();
  fetchTicketEvents().then((data) => {
    setTimeout(() => {
      removeLoader();
    }, 800);
    addEvents(data);
  });
}

function renderOrdersPage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();
  showLoader();
  const purchasesDiv = document.querySelector('.orders');
  if (purchasesDiv) {
    fetchOrders().then((orders) => {
      setTimeout(() => {
        removeLoader();
      }, 800);
      orders.forEach((order) => {
        const newOrder = createOrderElement(order);
        purchasesDiv.appendChild(newOrder);
      });
    })
  }
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
