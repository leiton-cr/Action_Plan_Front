import useHeaderForm from "./useHeaderForm";

const HeaderForm = ({ formState }) => {

    const { inputsTop, inputsBottom } = useHeaderForm(formState)

    return (
        <div className='form__container'>

            <div className='form__section'>
                {inputsTop}
            </div>

            <div className='form__section'>
                {inputsBottom}
            </div>
        </div>
    )
}

export default HeaderForm