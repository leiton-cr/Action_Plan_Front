import useTable from "./useTable";

import { PlanModel } from "../../../models/PlanModel";
import TableBody from "../../../shared/TableBody/TableBody";
import TableFilter from "../../../shared/TableFilter/TableFilter";
import TableHeader from "../../../shared/TableHeader/TableHeader";
import HeaderInfo from "../../../shared/Tables/Interfaces/FieldInfo";
import { TableActions } from "../../../models/TableActions";

import "./table.css"
import { Link } from "react-router-dom";

interface Props {
    headerData: Array<HeaderInfo>,
    mockData: Array<PlanModel>
    filters?: boolean
}

const Table = ({ headerData, filters }: Props) => {

    const { tableData, changeOrderer, changeFilterer, handleAction } = useTable();

    const actions: Array<TableActions> = [
        {
            title: "Delete",
            handler: handleAction
        },
        {
            title: "Edit",
            handler: handleAction
        }
    ]

    return (
        <>
            <div className="index__heading">
                <button><Link to={"/create"}>Create Plan</Link></button>
                <div className="table__count">Currently showing: <span>{tableData.length}</span> plan{tableData.length !== 1 && "s"}</div>
            </div>
            <section className='table__container index'>

                <div className="table table_plan" id="tablePlan">
                    <TableHeader headerData={headerData} changeOrderer={changeOrderer} />
                    {
                        filters && <TableFilter headerData={headerData} changeFilterer={changeFilterer} />
                    }
                    <TableBody tableData={tableData} actions={actions} />
                </div>
            </section>
        </>
    )
}

export default Table