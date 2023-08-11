/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

// Get Events
export async function fetchTicketEvents () {
    const response = await fetch('http://localhost:8080/api/v1/events');
    const data = await response.json();
    return data;
}

// Get Orders
export async function fetchOrders () {
    const response = await fetch('http://localhost:8080/api/v1/orders?customerID=2');
    const data = await response.json();
    return data;
}
