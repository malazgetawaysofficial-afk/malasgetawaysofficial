/**
 * Generates a WhatsApp link with a pre-filled, nicely formatted message.
 * 
 * @param {string} phone - The target phone number (with country code, no + or spaces)
 * @param {Object} data - The form data object
 * @param {string} title - The header for the message
 * @returns {string} The formatted wa.me link
 */
export function generateWhatsAppLink(phone, data, title = "New Inquiry from Website") {
    let message = `*${title}*\n\n`;

    const labels = {
        firstName: "First Name",
        lastName: "Last Name",
        fullName: "Full Name",
        email: "Email",
        phone: "Phone Number",
        requirement: "Requirement",
        travelType: "Travel Type",
        packageType: "Package",
        travelDate: "Travel Date",
        returnDate: "Return Date",
        adults: "Adults",
        children: "Children",
        notes: "Notes"
    };

    Object.keys(data).forEach(key => {
        if (data[key] && labels[key]) {
            message += `*${labels[key]}:* ${data[key]}\n`;
        }
    });

    message += `\n_Sent from Arabian Overseas Website_`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
}
