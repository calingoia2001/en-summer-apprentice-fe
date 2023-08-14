/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

import { deleteOrderById } from "./apiCalls";

export const createOrderElement = (order) => {
    const { orderID, eventID, orderedAt, ticketCategoryID, numberOfTickets, totalPrice } = order;
    const orderDiv = document.createElement('div');
    orderDiv.id = `order-${orderID}`;
    orderDiv.classList.add('fullOrder');
    const contentMarkup = `
      <div class="orderCard">
        <p class="description">Event id: ${eventID}</p>
        <p class="description">Number of tickets: ${numberOfTickets}</p>
        <p class="description">Ordered At: ${orderedAt}</p>
        <p class="description">Ticket Category: ${ticketCategoryID}</p>
        <p class="description">Total Price: ${totalPrice}</p> 
      </div>
    `;
    orderDiv.innerHTML = contentMarkup;
    const deleteButton = document.createElement('button');
    const updateButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', () => {
      deleteOrderById(orderID);
    })
    updateButton.innerText = 'update';
    updateButton.addEventListener('click', () => {
      // updateOrder(orderID); // to do
    })
    orderDiv.appendChild(deleteButton);
    orderDiv.appendChild(updateButton)
    return orderDiv;
};
