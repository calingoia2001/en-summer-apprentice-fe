/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

import { removeLoader, showLoader } from "./removeOrAddLoader";

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

// Delete Order by ID 
export async function deleteOrderById (orderID) {
    showLoader();
    fetch(`https://localhost:7003/api/Order/Delete?id=${orderID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Error deleting order');
        }
        if (res.status === 204) {
            return null;
        }
        return res.json();
    })
    .then((data) => {
        const orderToBeRemoved = document.getElementById(`order-${orderID}`);
        orderToBeRemoved.remove();
        toastr.success('Order deleted succesfuly!');
    })
    .catch((error) => {
        toastr.error(error);
    })
    .finally(() => {
        removeLoader();
    });
}

// Update order
export async function updateOrder (orderid, nrOfTickets, ticketCategoryID) {
    return fetch('https://localhost:7003/api/Order/Patch', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderID: orderid,
            numberOfTickets: nrOfTickets,
            ticketCategoryid: ticketCategoryID,
        }),
    }).then((res) => {
        if (res.status === 200) {
            toastr.success('Order succesfully updated!');
            setTimeout(() => {
                location.reload();
            }, 1200);
        } else {
            toastr.error('Error updating the error!');
            setTimeout(() => {
                location.reload();
            }, 1200);
        }
        return res;
    });
}
