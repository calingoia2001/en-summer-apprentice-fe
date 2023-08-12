/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

export const createOrderElement = (order) => {
    const { eventID, orderedAt, ticketCategoryID, numberOfTickets, totalPrice } = order;
    const orderDiv = document.createElement('div');
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
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', () => {
      // deleteOrder(orderID); // to do
    })
    orderDiv.appendChild(deleteButton);
    return orderDiv;
};
