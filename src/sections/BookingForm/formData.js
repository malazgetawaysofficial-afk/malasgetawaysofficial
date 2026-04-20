export const CUSTOMER_DETAILS_FORM_MODEL = {
    title: 'Travel Details Form',
    subtitle: 'Share your details and our team will prepare the best package for you.',
    submitText: 'Submit Details',
    successMessage: 'Details submitted successfully. Our team will contact you soon.',
    errorMessage: 'Could not submit details right now. Please try again.',
    fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'alternatePhone', label: 'Alternate / WhatsApp Number', type: 'tel', required: false },
        { name: 'email', label: 'Email Address', type: 'email', required: false },
        { name: 'nationality', label: 'Nationality', type: 'text', required: true },
        { name: 'travelDate', label: 'Travel Date', type: 'date', required: true },
        { name: 'returnDate', label: 'Return Date', type: 'date', required: true },
        { name: 'adults', label: 'Adults', type: 'number', required: true, min: 1 },
        { name: 'children', label: 'Children', type: 'number', required: false, min: 0 },
        { name: 'packageType', label: 'Package Type', type: 'text', required: true, placeholder: 'Hajj / Umrah / Ziyarat' },
        { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false, placeholder: 'Special requests, city preference, etc.' },
    ],
}

