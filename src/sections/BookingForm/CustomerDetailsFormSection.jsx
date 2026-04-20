import { useCustomerDetailsFormController } from './useCustomerDetailsFormController'
import './CustomerDetailsFormSection.css'

function CustomerDetailsFormSection() {
    const {
        formModel,
        values,
        isSubmitting,
        statusMessage,
        statusType,
        onFieldChange,
        onSubmit,
    } = useCustomerDetailsFormController()

    return (
        <section className="customer-form" id="booking-form">
            <div className="section-container">
                <div className="customer-form__header">
                    <span className="customer-form__label">Customer Details</span>
                    <h2>{formModel.title}</h2>
                    <p>{formModel.subtitle}</p>
                </div>

                <form className="customer-form__grid" onSubmit={onSubmit}>
                    {formModel.fields.map((field) => (
                        <label
                            key={field.name}
                            className={`customer-form__field ${field.type === 'textarea' ? 'customer-form__field--full' : ''}`}
                        >
                            <span>{field.label}</span>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={values[field.name]}
                                    onChange={onFieldChange}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    rows={4}
                                />
                            ) : (
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={values[field.name]}
                                    onChange={onFieldChange}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    min={field.min}
                                />
                            )}
                        </label>
                    ))}

                    <button className="customer-form__submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : formModel.submitText}
                    </button>

                    {statusMessage ? (
                        <p className={`customer-form__status customer-form__status--${statusType}`}>
                            {statusMessage}
                        </p>
                    ) : null}
                </form>
            </div>
        </section>
    )
}

export default CustomerDetailsFormSection

