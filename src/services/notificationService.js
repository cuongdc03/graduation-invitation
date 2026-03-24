/**
 * Sends a message/RSVP using Formspree.
 * @param {Object} data - The data to send (name, text).
 * @returns {Promise} Resolves when the message is sent.
 */
export const sendMessage = async (data) => {
    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (!formId || formId.includes('your_')) {
        console.warn("Formspree Form ID is missing. Simulating success.");
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    try {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                message: data.text
            })
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('FAILED...', error);
        throw error;
    }
};
