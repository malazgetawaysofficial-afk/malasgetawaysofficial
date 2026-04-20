export const YOUR_DETAILS_FORM_MODEL = {
    title: 'Your Details',
    subtitle: 'Let us know how to get back to you.',
    submitText: 'SEND MESSAGE',
    successMessage: 'Thank you! We will contact you shortly.',
    errorMessage: 'Something went wrong. Please try again.',
    fields: [
        {
            name: 'firstName',
            label: 'First Name',
            placeholder: 'Your name',
            helper: 'Enter your first name here',
            required: true,
        },
        {
            name: 'lastName',
            label: 'Last Name',
            placeholder: 'Your last name',
            helper: 'Enter your last name here',
            required: true,
        },
        {
            name: 'email',
            label: 'Email Address',
            placeholder: 'Add email',
            helper: 'Example: user@website.com',
            type: 'email',
            required: true,
        },
        {
            name: 'phone',
            label: 'Contact Number',
            placeholder: 'Your phone number',
            required: true,
        },
        {
            name: 'requirement',
            label: 'Your Requirement',
            placeholder: 'Describe your travel needs',
            required: true,
        },
        {
            name: 'travelType',
            label: 'Travel Type',
            placeholder: '(Hajj / Umrah / Ziy)',
            required: true,
        },
    ],
}
