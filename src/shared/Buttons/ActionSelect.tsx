import { TableActions } from "../../models/TableActions"

interface Props{
    id:string
    actions?: Array<TableActions>,
}

const ActionSelect = ({ id, actions }:Props) => {

    const handleClick = (e) => {
        const type = (e.currentTarget.value).toLowerCase()
        const id = (e.currentTarget.closest(".table_body__row")).id

        const action = actions?.find(a => a.title === e.currentTarget.value)

        if (action && id && type){
            action.handler(id, type)
        }

    }

    return (
        <select value="Action"  onChange={handleClick} >
            <option  disabled={true}>Action</option>

            {
                actions?.map((action:TableActions, i:number) => <option key={i} id={id}>{action.title}</option>)
            }

        </select>
    )
}

export default ActionSelect