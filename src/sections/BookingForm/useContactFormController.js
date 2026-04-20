import { useState } from 'react'
import { CONTACT_FORM_MODEL } from './contactFormModel'
import { apiManager } from '../../services/apiManager'

const INITIAL_FORM_VALUES = {
    name: '',
    phone: '',
    email: '',
    message: '',
}

function validate(values) {
    if (!values.name.trim()) return 'Please enter your name.'
    if (!values.phone.trim()) return 'Please enter your phone number.'
    if (!values.message.trim()) return 'Please enter your message.'
    return ''
}

export function useContactFormController() {
    const [values, setValues] = useState(INITIAL_FORM_VALUES)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [statusType, setStatusType] = useState('idle')

    const onFieldChange = (event) => {
        const { name, value } = event.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const validationError = validate(values)
        if (validationError) {
            setStatusType('error')
            setStatusMessage(validationError)
            return
        }

        setIsSubmitting(true)
        setStatusType('idle')
        setStatusMessage('')

        try {
            await apiManager.post('/contact', values)
            setStatusType('success')
            setStatusMessage(CONTACT_FORM_MODEL.successMessage)
            setValues(INITIAL_FORM_VALUES)
        } catch (_error) {
            setStatusType('error')
            setStatusMessage(CONTACT_FORM_MODEL.errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formModel: CONTACT_FORM_MODEL,
        values,
        isSubmitting,
        statusMessage,
        statusType,
        onFieldChange,
        onSubmit,
    }
}

