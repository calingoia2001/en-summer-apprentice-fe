/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

import { addEvents } from './src/components/utils';
import { createOrderElement } from './src/components/createOrderElement';
import { removeLoader, showLoader } from './src/components/removeOrAddLoader';
import { fetchTicketEvents, fetchOrders } from './src/components/apiCalls';
import { setupFilter } from './src/components/searchFunctions';
import { filterEvents } from './src/components/filterFunctions';

function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}

// HTML templates
function getHomePageTemplate() {
  return `
   <div id="content">
      <input type="text" class="searchBar md:w-64 lg:w-96" placeholder="Search by name"/>
      <button class="filterButton text-2xl">Filter Events</button>
      <div class="displayFilters">
      </div>
      <div class="events flex items-center justify-center flex-wrap space-x-4 space-y-4 px-5 py-24">
      </div>
    </div>
  `;
}

function getOrdersPageTemplate() {
  return `
    <div id="content">
    <h1 class="text-2xl mb-4 mt-8 text-center font-bold">Purchased Tickets:</h1>
    <div class="rowTitle ml-6 mr-6">
     <div class="orderCard flex items-center space-x-4 mb-4">
       <ul class="column-titles">
         <li>OrderID</li>
         <li>EventID</li>
         <li>OrderedAt</li>
         <li>NrTickets</li>
         <li>Category</li>
         <li>Price</li>
       </ul>
     </div>
    </div>
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

function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();
  const searchBar = document.querySelector('.searchBar');
  const filterButton = document.querySelector('.filterButton');
  showLoader();
  fetchTicketEvents().then((data) => {
    setTimeout(() => {
      removeLoader();
    }, 800);
    filterButton.addEventListener('click', () => {
      filterButton.classList.toggle('open');
      filterEvents(data);
    })
    if (searchBar) {
      setupFilter(data);
    }
    addEvents(data);
  });
}

function renderOrdersPage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();
  showLoader();
  const ordersDiv = document.querySelector('.orders');
  if (ordersDiv) {
    fetchOrders().then((orders) => {
      setTimeout(() => {
        removeLoader();
      }, 800);
      orders.forEach((order) => {
        const newOrder = createOrderElement(order);
        ordersDiv.appendChild(newOrder);
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
