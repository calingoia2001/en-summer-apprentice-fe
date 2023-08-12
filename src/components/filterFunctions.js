/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

import { addEvents } from "./utils";

export function filterEvents (events) {
    const venueSet = new Set(events.map((event) => event.venue.locationName));
    const eventTypeSet = new Set(events.map((event) => event.type));
    const filtersContainer = document.querySelector('#displayFilters');
    
    const venueCheckboxes = Array.from(venueSet).map(venue => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'venue';
        checkbox.value = venue;
        const label = document.createElement('label');
        label.textContent = venue;
        label.appendChild(checkbox);
        return label;
    });

    const eventTypeCheckboxes = Array.from(eventTypeSet).map(eventType => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'eventType';
        checkbox.value = eventType;
        const label = document.createElement('label');
        label.textContent = eventType;
        label.appendChild(checkbox);
        return label;
    });

    filtersContainer.innerHTML = ''; // Clear previous content

    venueCheckboxes.forEach(checkbox => {
        filtersContainer.appendChild(checkbox);
    });

    filtersContainer.appendChild(document.createElement('br'));

    eventTypeCheckboxes.forEach(checkbox => {
        filtersContainer.appendChild(checkbox);
    });

    filtersContainer.addEventListener('change', () => {
        const selectedVenues = Array.from(filtersContainer.querySelectorAll('input[name="venue"]:checked')).map(checkbox => checkbox.value);
        const selectedEventTypes = Array.from(filtersContainer.querySelectorAll('input[name="eventType"]:checked')).map(checkbox => checkbox.value);
        const filteredEvents = events.filter(event => {
            return (selectedVenues.length === 0 || selectedVenues.includes(event.venue.locationName)) &&
                   (selectedEventTypes.length === 0 || selectedEventTypes.includes(event.type));
          });
        addEvents(filteredEvents);
    })
}
