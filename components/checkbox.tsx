import './scss/checkbox.scss'

interface Props {
    label?: string
    checked?: boolean
    disabled?: boolean
    onChange?: () => void
}

const CheckBox = ({label, checked, disabled, onChange}: Props) => {

    const handleChange = () => {
        if(onChange)
            onChange()
    }

    return (
        <label 
        className={`checkBox ${disabled ? 'cursor-not-allowed' : ''}`}>
            {label}
            <input type="checkbox" defaultChecked={checked} onChange={handleChange} />
            <span className="checkmark"></span>
        </label>
    )
}

export default CheckBox;