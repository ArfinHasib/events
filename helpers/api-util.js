export async function getAllEvents(params) {
  const res = await fetch(
    'https://nextjs-course-88914-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
  );
  const data = await res.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvennts = await getAllEvents();
  return allEvennts.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvennts = await getAllEvents();
  return allEvennts.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvennts = await getAllEvents();

  let filteredEvents = allEvennts.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
