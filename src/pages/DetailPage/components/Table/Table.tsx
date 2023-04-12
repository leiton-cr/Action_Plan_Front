
import useTable from "./useTable";

import "./table.css"
import { TableActions } from "../../../../models/TableActions";
import TableHeader from "../../../../shared/TableHeader/TableHeader";
import TableBody from "../../../../shared/TableBody/TableBody";
import FieldInfo from "../../../../shared/Tables/Interfaces/FieldInfo";

interface Props {
  headerData: Array<FieldInfo>,
  detailsState
  filters?: boolean,
}

const Table = ({ headerData, detailsState = [], filters }: Props) => {

  const { tableData, handleAction, handleField } = useTable(detailsState);

  const actions: Array<TableActions> = [
    {
      title: "Delete",
      handler: handleAction
    }
  ]

  return (

    <>
      <div className="table__count">Your plan currently have: <span>{tableData.length}</span> item{tableData.length !== 1 && "s"}</div>
      <section className='table__container details'>
        <div className="table table_plan" id="tablePlan">
          <TableHeader headerData={headerData} />
          <TableBody handler={handleField} tableData={tableData} actions={actions} />
        </div>
      </section>

    </>

  )
}

export default Table