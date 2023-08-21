/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

import { deleteOrderById, updateOrder } from "./apiCalls";

export const createOrderElement = (order) => {
  const { orderID, eventID, orderedAt, ticketCategoryID, numberOfTickets, totalPrice } = order;
  const orderDiv = document.createElement('div');
  orderDiv.id = `order-${orderID}`;
  orderDiv.classList.add('fullOrder');

  const contentMarkup = `
      <div class="orderCard flex items-center space-x-4 mb-4">
      <ul class="flex space-x-16">
       <li class="flex-1">${orderID}</li>
       <li class="flex-1">${eventID}</li>
       <li class="flex-1">${orderedAt}</li>
       <li class="flex-1">
         <input type="number" id="numberOfTicketsInput-${orderID}" class="input-field" value="${numberOfTickets}" min="1" max="15" disabled>
       </li>
       <li class="flex-1">
        <input type="number" id="ticketCategoryInput-${orderID}" class="input-field" value="${ticketCategoryID}" min="0" max="15" disabled>
       </li>
       <li class="flex-1">${totalPrice}</li>
      </ul>
      </div>
    `;
  orderDiv.innerHTML = contentMarkup;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container', 'flex', 'space-x-2', 'mt-2');

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash-alt'); 
  deleteButton.appendChild(deleteIcon);

  const updateButton = document.createElement('button');
  const updateIcon = document.createElement('i');
  updateIcon.classList.add('fa-solid', 'fa-pencil'); 
  updateButton.appendChild(updateIcon);

  const saveButton = document.createElement('button');
  const saveIcon = document.createElement('i');
  saveIcon.classList.add('fa-regular', 'fa-floppy-disk');
  saveButton.appendChild(saveIcon);

  const cancelButton = document.createElement('button');
  const cancelIcon = document.createElement('i');
  cancelIcon.classList.add('fa-regular', 'fa-circle-xmark');
  cancelButton.appendChild(cancelIcon);

  const numberOfTicketsInput = orderDiv.querySelector(`#numberOfTicketsInput-${orderID}`);
  const ticketCategoryInput = orderDiv.querySelector(`#ticketCategoryInput-${orderID}`);

  deleteButton.classList.add('deleteButton');
  updateButton.classList.add('updateButton');
  saveButton.classList.add('saveButton');
  cancelButton.classList.add('cancelButton');

  deleteButton.addEventListener('click', () => {
    deleteOrderById(orderID);
  })

  updateButton.addEventListener('click', () => {
    numberOfTicketsInput.disabled = false;
    ticketCategoryInput.disabled = false;
    updateButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
  })

  saveButton.style.display = 'none'; 
  saveButton.addEventListener('click', () => {
    if (numberOfTicketsInput.value > 0 && numberOfTicketsInput.value < 16 && ticketCategoryInput.value > 0 && ticketCategoryInput.value < 16) {
      updateOrder(orderID, numberOfTicketsInput.value, ticketCategoryInput.value);
      saveButton.style.display = 'none';
      cancelButton.style.display = 'none';
      numberOfTicketsInput.disabled = true;
      ticketCategoryInput.disabled = true;
      updateButton.style.display = 'inline-block';
    } else {
      // eslint-disable-next-line no-undef
      toastr.error("Enter a valid number of tickets!");
      setTimeout(() => {
        location.reload();
      }, 1200);
    }
  });

  cancelButton.style.display = 'none'; 
  cancelButton.addEventListener('click', () => {
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    updateButton.style.display = 'inline-block';
    numberOfTicketsInput.value = numberOfTickets;
    ticketCategoryInput.value = ticketCategoryID;
    numberOfTicketsInput.disabled = true;
    ticketCategoryInput.disabled = true;
  });

  buttonsContainer.appendChild(deleteButton);
  buttonsContainer.appendChild(updateButton);
  buttonsContainer.appendChild(saveButton);
  buttonsContainer.appendChild(cancelButton);
  orderDiv.appendChild(buttonsContainer);

  return orderDiv;
};
