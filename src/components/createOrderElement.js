/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
// import { useStyle } from './styles';

export const createOrderElement = (order) => {
    console.log(order);
    const { eventID, orderedAt, ticketCategoryID, numberOfTickets, totalPrice } = order;
    const orderDiv = document.createElement('div');
    const contentMarkup = `
      <div class="card">
        <p class="description text-gray-700">Event id: ${eventID}</p>
        <p class="description text-gray-700">Number of tickets: ${numberOfTickets}</p>
        <p class="description text-gray-700">Ordered At: ${orderedAt}</p>
        <p class="description text-gray-700">Ticket Category: ${ticketCategoryID}</p>
        <p class="description text-gray-700">Total Price: ${totalPrice}</p>
      </div>
    `;
    orderDiv.innerHTML = contentMarkup;
    return orderDiv;
};
