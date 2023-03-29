import { generateSelectOptions } from "../../../../utils/helpers";

const useHeaderForm = (formState) => {

    const [formData, setformData] = formState;

    const handleField = (e) => {
        let value = e.target.value
        const id = e.target.id

        if (id == "manager" || id == "company"){
            value = parseInt(value)
        }


        if (value === " " || value === "\n") {
            return
        }

        formData[id] = value
        setformData({ ...formData })
    }

    const generateField = (id, type) => {
        return <div className='input__container' key={id}>
            <label htmlFor={id}>{id}</label>
            { type == "input" && generateInput(id) }
            { type == "textField" && generateTextField(id) }
            { type == "select" && generateSelect(id) }
        </div>
    }

    const generateInput = (id:string) => <input type="text" value={formData[id]} id={id} onChange={handleField} />

    const generateTextField = (id:string) => <textarea value={formData[id]} id={id} onChange={handleField} />
    
    const generateSelect = (id:string) => <select value={formData[id]} id={id} onChange={handleField}>{generateSelectOptions(id)}</select>
    

    const inputsTop = [
        generateField("company", "select"),
        generateField("project", "input"),
        generateField("manager", "select")
    ]

    const inputsBottom = [
        generateField("goal", "textField"),
        generateField("issue", "textField"),
        generateField("outcome", "textField")
    ]

    return { inputsTop, inputsBottom }
}

export default useHeaderForm