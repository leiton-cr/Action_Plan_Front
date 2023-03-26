import { useEffect, useState } from "react";
import { MainColumnNames } from "./MainColumnNames";
import { PlanModel } from "../../../models/PlanModel";
import { PlanDetail } from "../../../models/PlanDetail";
import useAlerts from "../../../hooks/useAlerts";
import { useNavigate } from "react-router-dom";

const useTable = (mockData: Array<PlanModel | PlanDetail>) => {

    const {promiseAlert} = useAlerts()
   
    const [activeOrderer, setActiveOrderer] = useState({ orderer: "id", isAsc: false });
    const [tableData, setTableData] = useState(mockData)
    const [filters, setFilters] = useState({
        project: "",
        manager: "",
        company: "",
        updatedAt: ""
    })

    const navigate = useNavigate()

    const changeOrderer = (orderer: string, isAsc: boolean) => {

        if (orderer === "id" || orderer === "actions") {
            return;
        }

        setActiveOrderer({ orderer, isAsc })
    }

    const changeFilterer = (orderer: MainColumnNames, filter: string) => {
        filters[orderer] = filter;
        setFilters({ ...filters })
    }

    const handleAction = (id: string, type: string | undefined = "") => {

        if (!id) {
            return
        }

        if (type === "edit") {
            return handleEdit(id)
        }

        if (type === "delete") {
            return handleDelete(id)
        }

    }

    const handleEdit = (id: string) => {
       navigate(`/edit/${id}`)
    }


    const handleDelete = (id: string) => {
        promiseAlert("Are you sure?", "This action is irreversible.")
        .then(({isConfirmed} )=>{

            if(isConfirmed){
                processDelete(id);
            }

        })


       
    }

    const processDelete = (id) => {
        let newStates = tableData
        newStates = newStates.filter(state => state.id !== id)

        setTableData([...newStates])
    }

    useEffect(() => {

        let filteredTable = JSON.parse(JSON.stringify(mockData))

        filteredTable = filteredTable.sort((a: { [x: string]: string; }, b: { [x: string]: string; }) => {
            let textA = a[activeOrderer.orderer].toUpperCase();
            let textB = b[activeOrderer.orderer].toUpperCase();
            return activeOrderer.isAsc ?
                ((textA < textB) ? -1 : (textA > textB) ? 1 : 0) :
                ((textA > textB) ? -1 : (textA < textB) ? 1 : 0);
        }
        )


        Object.keys(filters).map((key: string) => {

            const filter = filters[key as MainColumnNames].trim().toLowerCase()

            filteredTable = filteredTable.filter((item: PlanModel) => {
                if (filter.trim().length === 0) return true
                const data = item[key].trim().toLowerCase()

                return data.includes(filter)

            }
            )

        })


        setTableData(filteredTable)

    }, [activeOrderer, filters])


    return { tableData, changeOrderer, changeFilterer, handleAction }
}

export default useTable