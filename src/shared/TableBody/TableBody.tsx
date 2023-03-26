import { TableActions } from '../../models/TableActions'
import { PlanDetail } from '../../models/PlanDetail'
import { PlanModel } from '../../models/PlanModel'
import TableRow from './TableRow'
import { ChangeEventHandler } from 'react'

interface Props {
    tableData: Array<PlanModel | PlanDetail>
    actions?: Array<TableActions>
    handler?: ChangeEventHandler
}

const TableBody = ({ tableData, actions, handler }: Props) => {
    return (
        <div className="table_body">

            {
                tableData.length !== 0 ?
                    tableData.map((row: PlanModel | PlanDetail, i: number) => <TableRow key={i} handler={handler} content={row} actions={actions}></TableRow>) :
                    <div className="table_body__row  animate__animated animate__fadeIn">No data to show</div>
            }

        </div>
    )
}

export default TableBody