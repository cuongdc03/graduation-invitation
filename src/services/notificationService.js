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
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                message: data.text,
                "Will you come?": data.attending ? "Yes" : "No"
            })
        };

        let response = await fetch(`https://formspree.io/f/${formId}`, fetchOptions);

        if (!response.ok) {
            console.warn(`Primary Formspree form failed with status: ${response.status}. Retrying with backup ID...`);
            const backupFormId = 'xwvaoywz';
            response = await fetch(`https://formspree.io/f/${backupFormId}`, fetchOptions);
        }

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
