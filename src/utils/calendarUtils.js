/**
 * Generates a Google Calendar event URL.
 * @param {Object} event - The event object from invitation.json
 * @param {Object} graduate - The graduate object for the title
 * @returns {string} The Google Calendar URL
 */
export const generateGoogleCalendarUrl = (event, graduate) => {
    const title = `Graduation Ceremony: ${graduate.name}`;
    const details = `Join us to celebrate the graduation of ${graduate.name} from ${graduate.university}.`;
    const location = `${event.location.venue}, ${event.location.address}`;

    // Parse date and time to ISO string format required by Google Calendar (YYYYMMDDTHHmmss)
    // Input format: "Saturday, May 24, 2026" and "1:30 PM"
    const dateStr = event.date.split(',').slice(1).join(',').trim(); // "May 24, 2026"
    const fullDateString = `${dateStr} ${event.time}`;
    const startDate = new Date(fullDateString);
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Assume 2 hours duration

    const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const dates = `${formatDate(startDate)}/${formatDate(endDate)}`;

    const baseUrl = "https://calendar.google.com/calendar/render";
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: title,
        details: details,
        location: location,
        dates: dates,
    });

    return `${baseUrl}?${params.toString()}`;
};
