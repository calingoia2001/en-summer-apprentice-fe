/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable semi */

function displayFilters (venueSet, eventTypeSet, filtersContainer) {
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
}

export function testFilterButton (events) {
    const venueSet = new Set(events.map((event) => event.venue.locationName));
    const eventTypeSet = new Set(events.map((event) => event.type));
    const filtersContainer = document.querySelector('#displayFilters');
    displayFilters(venueSet, eventTypeSet, filtersContainer);

    console.log(venueSet, eventTypeSet);
}
