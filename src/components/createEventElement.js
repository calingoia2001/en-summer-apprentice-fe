/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
import { useStyle } from './styles';

const createEventElement = (eventData) => {
  const addToCartBtnClasses = useStyle('addToCartBtn');
  const inputClasses = useStyle('inputTicket');
  const eventImageMap = { // hardcoded images for events
    1: './src/assets/ec_poster.jpg',
    2: './src/assets/folk_poster.jpeg',
    3: './src/assets/jazz_poster.jpeg',
    6: './src/assets/rockstadt_poster.png',
    7: './src/assets/untold_poster.jpg',
    8: './src/assets/rolling_poster.jpeg',
    9: './src/assets/tomorrowland_poster.jpg'
  };
    const { id, name, description, venue, startDate, endDate /* , ticketCategories */ } = eventData;
    const eventDiv = document.createElement('div');
    const contentMarkup = `
      <div class="card">
        <h2 class="event-title text-2xl font-bold">${name}</h2>
        <img src="${eventImageMap[id]}" alt="${name}" class="event-image w-full height-200 rounded object-cover mb-4">
        <p class="description text-gray-700">Event id: ${id}</p>
        <p class="description text-gray-700">Location: ${venue.locationName} ( Remaining tickets: ${venue.capacity}</p>
        <p class="description text-gray-700">Remaining tickets: ${venue.capacity}</p>
        <p class="description text-gray-700">Date: ${startDate} : ${endDate}</p>
        <p class="description text-gray-700">Description: ${description}</p>
        
      </div>
    `;
    eventDiv.innerHTML = contentMarkup;

    const input = document.createElement('input');
    const addToCart = document.createElement('button');
    // const selectTicketCategory = document.querySelector('#ticketCategories')
    input.classList.add(...inputClasses);
    input.type = 'number';
    input.min = '0';
    input.max = '15';
    input.value = '0';

    addToCart.classList.add(...addToCartBtnClasses);
    addToCart.innerText = 'Add ticket to Cart';
    addToCart.addEventListener('click', () => {
      postOrder(id, /* selectTicketCategory */ input);
      // console.log(selectTicketCategory.value); // not working
    });

    eventDiv.appendChild(input);
    eventDiv.appendChild(addToCart);
    return eventDiv;
}

const postOrder = (id, /* selectTicketCategory, */ input) => {
  const numberOfTickets = input.value; 
  // const ticketCategoryId = selectTicketCategory.value;
  fetch('http://localhost:8080/api/v1/orders', {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      eventID: id, // toFix (always selects eventID 1)
      ticketCategoryID: id, // ticketCategoryId, // todo (implement ticket categories)
      numberOfTickets: +numberOfTickets,
    }),
  }).then((response) => {
    return response.json().then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    });
  })
  .then((data) => {
    input.value = 0;
    console.log('order sent to backend');
  })
  .catch((error) => {
    console.error('error saving purchased event:', error);
  })
}

export const createEvent = (eventData) => {
    const eventElement = createEventElement(eventData);
    return eventElement;
};
