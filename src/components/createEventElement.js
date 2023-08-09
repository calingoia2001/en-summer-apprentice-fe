/* eslint-disable indent */
/* eslint-disable semi */
const createEventElement = (eventData) => {
    const { eventId, eventName, eventDescription } = eventData;
    console.log(eventData);
    const eventDiv = document.createElement('div');
    const contentMarkup = `
      <header>
          <h2 class="event-title text-2xl font-bold">${eventName}</h2>
      </header>
      <div class="content">
      <p class="description text-gray-700">${eventId}</p>
        <p class="description text-gray-700">${eventDescription}</p>
      </div>
    `;
    eventDiv.innerHTML = contentMarkup;
    return eventDiv;
}

export const createEvent = (eventData) => {
    const eventElement = createEventElement(eventData);
    return eventElement;
};
