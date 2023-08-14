/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */
import { addEvents } from './utils';

function liveSearch (events) {
    const searchBar = document.querySelector('.searchBar');
    if (searchBar) {
      const searchValue = searchBar.value;
      if (searchValue !== undefined) {
        const filteredEvents = events.filter((event) => event.name.toLowerCase().includes(searchValue.toLowerCase()));
        addEvents(filteredEvents);
      }
    }
}
  
export function setupFilter (data) {
    const searchBar = document.querySelector('.searchBar');
    if (searchBar) {
      searchBar.addEventListener('keyup', () => {
        setTimeout(liveSearch(data), 500);
      })
    }
}
