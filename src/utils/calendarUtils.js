/**
 * Generates a Google Calendar event URL.
 * @param {Object} event - The event object from invitation.json
 * @param {Object} graduate - The graduate object for the title
 * @returns {string} The Google Calendar URL
 */
export const generateGoogleCalendarUrl = (event, graduate, t = null) => {
    const title = `${t?.calendarTitle || 'Graduation Ceremony'}: ${graduate.name}`;
    const details = t?.calendarDetails
        ? t.calendarDetails(graduate.name, graduate.university)
        : `Join us to celebrate the graduation of ${graduate.name} from ${graduate.university}.`;
    const location = `${event.location.venue}, ${event.location.address}`;

    // Use isoDate field for reliable parsing across all locales
    const startDate = new Date(event.isoDate);
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
