
import useAlerts from "../../../../hooks/useAlerts";
import { EMPTY_DETAIL } from "../../../../utils/constants";
import { createEmptyLine } from "../../../../utils/helpers";


const useTable = (detailsState) => {

    const { toastAlert } = useAlerts()

    const [tableData, setTableData] = detailsState

    const handleAction = (id: string, type: string | undefined = "") => {

        if (!id) {
            return
        }

        if (type === "delete") {
            return handleDelete(id)
        }
    }

    const handleDelete = (id: string) => {
        const newData = removeLine(id)

        if (newData.length === 0) {
            return toastAlert("There must be at least one detail in the plan", "error")
        }

        setTableData([...newData])
    }

    const removeLine = (id: string) => {
        return tableData.filter(detail => detail.id !== id)
    }

    const handleField = (e) => {
        const id = e.currentTarget.closest(".table_body__row").id
        const field = e.currentTarget.dataset.title
        let value = e.currentTarget.value

        if (value === " " || !id) {
            return
        }
      
        if (field == "responsible" || field == "priority" || field == "status" || field == "stakeholder"){
            value = parseInt(value)
        }

        let newStates = tableData

        newStates = updateStateValue(newStates, id, field, value)
        newStates = removeEmptiedLine(newStates, id)

        calculateEmptyLines(newStates)
        setTableData([...newStates])
    }

    const updateStateValue = (newStates, id: string, field: string, value: string) => {
        return newStates.map(detail => {
            if (detail.id == id) detail[field] = value
            return detail
        })
    }

    const removeEmptiedLine = (newStates, id: string) => {
        return newStates.filter(data => {
            if (data.id == id) {
                return !(JSON.stringify({ ...data, id: "" }) === JSON.stringify(EMPTY_DETAIL))
            } else {
                return true
            }
        })
    }

    const calculateEmptyLines = (newStates) => {
        let emptyLines = 0;

        newStates.map(data => {
            if (JSON.stringify({ ...data, id: "" }) === JSON.stringify(EMPTY_DETAIL)) {
                emptyLines++
            }
        })

        if (emptyLines == 0) {
            newStates.push(createEmptyLine())
        }
    }

    return { tableData, handleAction, handleField }
}

export default useTable