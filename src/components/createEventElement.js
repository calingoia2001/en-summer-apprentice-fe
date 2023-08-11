/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
import { useStyle } from './styles';
import { removeLoader, showLoader } from './removeOrAddLoader';

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
  const { id, name, description, venue, startDate, endDate, ticketCategories } = eventData;
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('fullEvent');
  const contentMarkup = `
      <div class="card">
        <h2 class="event-title text-2xl font-bold">${name}</h2>
        <img src="${eventImageMap[id]}" alt="${name}" class="event-image w-full height-200 rounded object-cover mb-4">
        <p class="description">Event id: ${id}</p>
        <p class="description">Location: ${venue.locationName} ( Remaining tickets: ${venue.capacity})</p>
        <p class="description">Remaining tickets: ${venue.capacity}</p>
        <p class="description">Date: ${startDate} : ${endDate}</p>
        <p class="description">Description: ${description}</p>
        <label for="ticketCategories" class="ticketSelectText">Select a ticket category:</label>
        <select name="ticketCategories" id="ticketCategories-${id}" class="ticketSelect">
        <option value="${ticketCategories[0].id}">${ticketCategories[0].description} (Price: ${ticketCategories[0].price}$)</option>
        <option value="${ticketCategories[1].id}">${ticketCategories[1].description} (Price: ${ticketCategories[1].price}$)</option>
        </select>
      </div>
    `;
  eventDiv.innerHTML = contentMarkup;

  const input = document.createElement('input');
  const addToCart = document.createElement('button');

  input.classList.add(...inputClasses);
  input.type = 'number';
  input.min = '0';
  input.max = '15';
  input.value = '0';

  addToCart.classList.add(...addToCartBtnClasses);
  addToCart.innerText = 'Add ticket to Cart';
  addToCart.addEventListener('click', () => {
    const selectTicketCategory = document.querySelector(`#ticketCategories-${id}`)
    const ticketId = selectTicketCategory.value;
    postOrder(id, ticketId, input);
  });

  eventDiv.appendChild(input);
  eventDiv.appendChild(addToCart);
  return eventDiv;
}

const postOrder = (id, ticketID, input) => {
  const numberOfTickets = input.value;
  console.log(id, ticketID, input.value);
  if (parseInt(numberOfTickets)) {
    showLoader();
    fetch('http://localhost:8080/api/v1/orders', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        eventID: id,
        ticketCategoryID: ticketID,
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
        // eslint-disable-next-line no-undef
        toastr.success('Order succesfully created!');
      })
      .catch((error) => {
        console.error('error saving purchased event:', error);
        // eslint-disable-next-line no-undef
        toastr.error('Error!');
      })
      .finally(() => {
        removeLoader();
      });
  } else {
    // eslint-disable-next-line no-undef
    toastr.error('Please enter a valid number of tickets!');
  }
}

export const createEvent = (eventData) => {
  const eventElement = createEventElement(eventData);
  return eventElement;
};
