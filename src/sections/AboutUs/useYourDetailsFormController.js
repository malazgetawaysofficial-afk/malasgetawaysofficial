import { useState } from 'react'
import { YOUR_DETAILS_FORM_MODEL } from './yourDetailsFormModel'
import { TRAVEL_FORM_PREFILL_STORAGE_KEY } from '../../constants/storageKeys'
import { apiManager } from '../../services/apiManager'

const INITIAL = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requirement: '',
    travelType: '',
}

function validate(values) {
    if (!values.firstName.trim()) return 'Please enter your first name.'
    if (!values.lastName.trim()) return 'Please enter your last name.'
    if (!values.email.trim()) return 'Please enter your email.'
    if (!values.phone.trim()) return 'Please enter your contact number.'
    if (!values.requirement.trim()) return 'Please describe your requirement.'
    if (!values.travelType.trim()) return 'Please enter travel type.'
    return ''
}

export function useYourDetailsFormController() {
    const [values, setValues] = useState(INITIAL)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [statusType, setStatusType] = useState('idle')

    const onFieldChange = (event) => {
        const { name, value } = event.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const err = validate(values)
        if (err) {
            setStatusType('error')
            setStatusMessage(err)
            return
        }
        setIsSubmitting(true)
        setStatusMessage('')
        setStatusType('idle')
        try {
            await apiManager.post('/your-details', values)
            setValues(INITIAL)
            setStatusType('success')
            setStatusMessage(YOUR_DETAILS_FORM_MODEL.successMessage)
        } catch (_e) {
            setStatusType('error')
            setStatusMessage(YOUR_DETAILS_FORM_MODEL.errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formModel: YOUR_DETAILS_FORM_MODEL,
        values,
        isSubmitting,
        statusMessage,
        statusType,
        onFieldChange,
        onSubmit,
    }
}
