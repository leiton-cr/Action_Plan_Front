
const HeaderForm = ({formState}) => {

    const [formData, setformData] = formState;

    const handleField = (e) => {
        const value = e.target.value
        const id = e.target.id
        
        formData[id] = value
        setformData({...formData})
    }

    return (
        <div className='form__container'>

            <div className='form__section'>
                <div className='input__container'>
                    <label htmlFor="">Company</label>
                    <input type="text" value={formData.company} id={"company"} onChange={handleField} />
                </div>

                <div className='input__container'>
                    <label htmlFor="">Project</label>
                    <input type="text" value={formData.project} id={"project"} onChange={handleField} />
                </div>

                <div className='input__container'>
                    <label htmlFor="">Manager</label>
                    <select value={formData.manager} id={"manager"} onChange={handleField}> </select>
                </div>
            </div>

            <div className='form__section'>
                <div className='input__container'>
                    <label htmlFor="">Goal</label>
                    <textarea value={formData.goal} id={"goal"} onChange={handleField}></textarea>
                </div>

                <div className='input__container'>
                    <label htmlFor="">Issue</label>
                    <textarea value={formData.issue} id={"issue"} onChange={handleField}></textarea>
                </div>

                <div className='input__container'>
                    <label htmlFor="">Outcome</label>
                    <textarea value={formData.outcome} id={"outcome"} onChange={handleField}></textarea>
                </div>
            </div>
        </div>
    )
}

export default HeaderForm