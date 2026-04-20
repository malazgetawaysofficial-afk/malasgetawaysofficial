import { useEffect, useState } from 'react'
import { CUSTOMER_DETAILS_FORM_MODEL } from './formData'
import { TRAVEL_FORM_PREFILL_STORAGE_KEY } from '../../constants/storageKeys'
import { apiManager } from '../../services/apiManager'

const INITIAL_VALUES = {
    fullName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    nationality: '',
    travelDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    packageType: '',
    notes: '',
}

function validate(values) {
    if (!values.fullName.trim()) return 'Please enter full name.'
    if (!values.phone.trim()) return 'Please enter phone number.'
    if (!values.nationality.trim()) return 'Please enter nationality.'
    if (!values.travelDate) return 'Please select travel date.'
    if (!values.returnDate) return 'Please select return date.'
    if (new Date(values.returnDate) < new Date(values.travelDate)) return 'Return date cannot be before travel date.'
    if (!values.packageType.trim()) return 'Please enter package type.'
    return ''
}

export function useCustomerDetailsFormController() {
    const [values, setValues] = useState(INITIAL_VALUES)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [statusType, setStatusType] = useState('idle')

    useEffect(() => {
        try {
            const raw = sessionStorage.getItem(TRAVEL_FORM_PREFILL_STORAGE_KEY)
            if (!raw) return
            const data = JSON.parse(raw)
            if (data.packageType) {
                setValues((prev) => ({ ...prev, packageType: data.packageType }))
            }
            sessionStorage.removeItem(TRAVEL_FORM_PREFILL_STORAGE_KEY)
        } catch (_e) {
            sessionStorage.removeItem(TRAVEL_FORM_PREFILL_STORAGE_KEY)
        }
    }, [])

    const onFieldChange = (event) => {
        const { name, value, type } = event.target
        const nextValue = type === 'number' ? Number(value) : value
        setValues((prev) => ({ ...prev, [name]: nextValue }))
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
            await apiManager.post('/customer-inquiry', values)
            setValues(INITIAL_VALUES)
            setStatusType('success')
            setStatusMessage(CUSTOMER_DETAILS_FORM_MODEL.successMessage)
        } catch (_error) {
            setStatusType('error')
            setStatusMessage(CUSTOMER_DETAILS_FORM_MODEL.errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formModel: CUSTOMER_DETAILS_FORM_MODEL,
        values,
        isSubmitting,
        statusMessage,
        statusType,
        onFieldChange,
        onSubmit,
    }
}

