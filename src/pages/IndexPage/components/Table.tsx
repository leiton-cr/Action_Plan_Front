import useTable from "./useTable";

import TableBody from "../../../shared/TableBody/TableBody";
import TableFilter from "../../../shared/TableFilter/TableFilter";
import TableHeader from "../../../shared/TableHeader/TableHeader";
import { TableActions } from "../../../models/TableActions";

import "./table.css"
import FieldInfo from "../../../shared/Tables/Interfaces/FieldInfo";
import HeaderData from '../HeaderData.json'
const Table = ({setCount}:{setCount: Function}) => {

    const { tableData, changeOrderer, changeFilterer, handleAction } = useTable();

    setCount(tableData.length)

    const headerData: Array<FieldInfo> = HeaderData

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
            <section className='table__container index'>

                <div className="table table_plan" id="tablePlan">
                    <TableHeader headerData={headerData} changeOrderer={changeOrderer} />
                   
                        <TableFilter headerData={headerData} changeFilterer={changeFilterer} />
                   
                    <TableBody tableData={tableData} actions={actions} />
                </div>
            </section>
        </>
    )
}

export default Table