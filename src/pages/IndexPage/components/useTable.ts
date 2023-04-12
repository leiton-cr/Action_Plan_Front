import { useEffect, useRef, useState } from "react";
import { MainColumnNames } from "./MainColumnNames";
import { PlanModel } from "../../../models/PlanModel";
import useAlerts from "../../../hooks/useAlerts";
import { useNavigate } from "react-router-dom";
import usePlanService from "../../../services/usePlanService";
import { findCompany, findPerson } from "../../../utils/helpers";

const useTable = () => {
    const { deleteOne } = usePlanService()
    const { toastAlert, promiseAlert } = useAlerts()

    const [activeOrderer, setActiveOrderer] = useState({ orderer: "id", isAsc: false });
    const [tableData, setTableData] = useState([])
    const [filters, setFilters] = useState({
        project: "",
        manager: "",
        company: "",
        updateAt: ""
    })

    const navigate = useNavigate()
    const mockData = useRef([])

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
            .then(({ isConfirmed }) => {

                if (isConfirmed) {
                    processDelete(id);
                }
            })
    }

    const processDelete = (id) => {
        let newStates = tableData

        deleteOne(id).then((data => {
            console.log(data);

            toastAlert("Successfully deleted", "success")

            newStates = newStates.filter((state: PlanModel) => state.id !== id)
            mockData.current = newStates
            setTableData([...newStates])
        }))

    }

    const { getAll } = usePlanService()

  

    useEffect(() => {

        let filteredTable = JSON.parse(JSON.stringify(mockData.current))

        filteredTable = filteredTable.sort((a: { [x: string]: string; }, b: { [x: string]: string; }) => {
            let textA = a[activeOrderer.orderer].toUpperCase();
            let textB = b[activeOrderer.orderer].toUpperCase();
            return activeOrderer.isAsc ?
                ((textA < textB) ? -1 : (textA > textB) ? 1 : 0) :
                ((textA > textB) ? -1 : (textA < textB) ? 1 : 0);
        }
        )

        Object.keys(filters).map((key: string) => {

            const filter = filters[key as MainColumnNames].toLowerCase()

            filteredTable = filteredTable.filter((item: PlanModel) => {

                if (!item[key] || filter.trim().length === 0) return true

                let data = (item[key]).toString()

                switch (key) {
                    case "manager":
                        data = findPerson(data) || ""
                        break;
                    case "company":
                        data = findCompany(data) || ""
                        break;
                }

                data = data.trim().toLowerCase()
                console.log(data);

                return data.includes(filter)

            }
            )
           
        })

        setTableData(filteredTable)

    }, [activeOrderer, filters])

    useEffect(() => {
        setTableData(mockData.current)
    }, [mockData])

    useEffect(() => {
        getAll().then((res) => {
    
            if (typeof(res.data) == "string"){
                toastAlert("Can't connect to the server.", "error")
                mockData.current = []
                return setTableData([])
            };
            
            mockData.current = res.data
            setTableData(res.data)
        })
    }, [])

    return { tableData, changeOrderer, changeFilterer, handleAction }
}

export default useTable