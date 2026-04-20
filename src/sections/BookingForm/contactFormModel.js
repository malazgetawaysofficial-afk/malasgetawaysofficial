export const CONTACT_FORM_MODEL = {
    heading: 'Contact Us',
    subheading: 'Send us your details and our team will contact you shortly.',
    submitText: 'Send Message',
    successMessage: 'Thank you! We received your message.',
    errorMessage: 'Unable to send right now. Please try again.',
    fields: [
        {
            name: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Enter your full name',
            required: true,
        },
        {
            name: 'phone',
            label: 'Phone Number',
            type: 'tel',
            placeholder: 'Enter your phone number',
            required: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email address',
            required: false,
        },
        {
            name: 'message',
            label: 'Message',
            type: 'textarea',
            placeholder: 'Tell us your requirement (Hajj/Umrah/Ziyarat)',
            required: true,
        },
    ],
}

