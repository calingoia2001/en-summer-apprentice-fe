/* eslint-disable indent */
/* eslint-disable semi */
const createEventElement = (eventData) => {
  const eventImageMap = {
    1: './src/assets/ec_poster.jpg',
    2: './src/assets/folk_poster.jpeg',
    3: './src/assets/jazz_poster.jpeg',
    6: './src/assets/rockstadt_poster.png',
    7: './src/assets/untold_poster.jpg'
    // Add more entries as needed
};
    const { id, name, description } = eventData;
    console.log(eventData);
    const eventDiv = document.createElement('div');
    const contentMarkup = `
      <header>
          <h2 class="event-title text-2xl font-bold">${name}</h2>
      </header>
      <div class="content">
        <img src="${eventImageMap[id]}" alt="${name}" class="event-image w-full height-200 rounded object-cover mb-4">
        <p class="description text-gray-700">${id}</p>
        <p class="description text-gray-700">${description}</p>
      </div>
    `;
    eventDiv.innerHTML = contentMarkup;
    return eventDiv;
}

export const createEvent = (eventData) => {
    const eventElement = createEventElement(eventData);
    return eventElement;
};
