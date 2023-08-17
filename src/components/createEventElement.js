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
    1: './src/assets/untold_poster.jpg',
    2: './src/assets/rockstadt_poster.png',
    3: './src/assets/footbal_poster.jpg',
    11: './src/assets/theatre_poster.jpg',
    12: './src/assets/tenis_poster.png',
    13: './src/assets/ec_poster.jpg',
    14: './src/assets/jazz_poster.jpeg'
  };
  const { id, name, description, venue, startDate, endDate, ticketCategories } = eventData;
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('fullEvent');
  const contentMarkup = `
      <div class="card">
       <div class="image-container">
        <img src="${eventImageMap[id]}" alt="${name}" class="event-image lg:h-96 md:h-48 w-full object-fill object-top">
        <div class="description-overlay p-6">
        <p class="text-base font-medium text-indigo-300 mb-1">${startDate} : ${endDate}</p>
        <h2 class="event-title text-3xl font-semibold mb-3 text-center">${name}</h2>
        <p>Location: ${venue.locationName}</p>
        <p>Remaining tickets: ${venue.capacity}</p>
        <p>Description: ${description}</p>
        </div>
       </div>
        <button type="button" class="buyButton" id="buybutton-${id}"></button> 
        <label for="ticketCategories" class="ticketSelectText text-xl" id="ticketText-${id}">Select a ticket category:</label>
        <select name="ticketCategories" id="ticketCategories-${id}" class="ticketSelect">
        <option value="${ticketCategories[0].id}">${ticketCategories[0].description} (Price: ${ticketCategories[0].price}$)</option>
        <option value="${ticketCategories[1].id}">${ticketCategories[1].description} (Price: ${ticketCategories[1].price}$)</option>
        </select>
      </div>
    `;
  eventDiv.innerHTML = contentMarkup;

  const buyButton = eventDiv.querySelector(`#buybutton-${id}`)
  const buyIcon = document.createElement('i');
  buyIcon.classList.add('fa-solid', 'fa-cart-shopping'); 
  buyButton.appendChild(buyIcon);

  const input = document.createElement('input');
  const addToCart = document.createElement('button');
  const selectTicketCategory = eventDiv.querySelector(`#ticketCategories-${id}`)
  const selectText = eventDiv.querySelector(`#ticketText-${id}`)

  input.classList.add(...inputClasses);
  input.classList.add('ticketDropdown')
  input.type = 'number';
  input.min = '0';
  input.max = '15';
  input.value = '0';

  addToCart.classList.add(...addToCartBtnClasses);
  addToCart.classList.add('ticketDropdown');
  addToCart.innerText = 'Add ticket to Cart';

  buyButton.addEventListener('click', () => {
    buyButton.style.display = 'none';
    selectTicketCategory.style.display = 'block';
    selectText.style.display = 'block';
    addToCart.style.display = 'block';
    input.style.display = 'block';
  })

  addToCart.addEventListener('click', () => {
    const ticketId = selectTicketCategory.value;
    buyButton.style.display = 'block';
    selectTicketCategory.style.display = 'none';
    selectText.style.display = 'none';
    addToCart.style.display = 'none';
    input.style.display = 'none';
    postOrder(id, ticketId, input);
  });

  eventDiv.appendChild(buyButton);
  eventDiv.appendChild(input);
  eventDiv.appendChild(addToCart);

  return eventDiv;
}

const postOrder = (id, ticketID, input) => {
  const numberOfTickets = input.value;
  if (parseInt(numberOfTickets) && parseInt(numberOfTickets) < 16) {
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
