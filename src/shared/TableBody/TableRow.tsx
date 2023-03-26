

import { TableActions } from '../../models/TableActions'
import ActionButton from '../Buttons/ActionSelect'
import { PlanDetail } from '../../models/PlanDetail'
import { PlanModel } from '../../models/PlanModel'
import TableItem from './TableItem'
import { ChangeEventHandler } from 'react'
import ActionSelect from '../Buttons/ActionSelect'

interface Props {
    content: PlanDetail | PlanModel
    actions?: Array<TableActions>,
    handler?: ChangeEventHandler
}

const mapper = {
    id: { type: "text" },
    task: { type: "input" },
    responsible: { type: "select" },
    priority: { type: "select" },
    status: { type: "select" },
    start: { type: "datetime" },
    end: { type: "datetime" },
    resources: { type: "input" },
    bloquers: { type: "input" },
    stakeholder: { type: "select" },
    milestone: { type: "input" },
    notes: { type: "input" },
    project: { type: "text" },
    manager: { type: "text" },
    company: { type: "text" },
    updatedAt: { type: "text" },
    action: { type: "input" }
}


const TableRow = ({ content, actions, handler }: Props) => {

    return (
        <div className="table_body__row  animate__animated animate__slideInLeft" id={content.id}>
         
                <TableItem title={"id"} type={mapper["id"].type} content={content["id"]} handler={handler} value={content["id"]} />

                <div className="table_body__cell">
                    
                       {
                         actions && <ActionSelect id={content.id} actions={actions} ></ActionSelect>
                       }
                    
                </div>

                {
                    Object.keys(content).map((key: string, i: number) => key !== 'id' && <TableItem key={i} title={key} type={mapper[key].type} content={content[key]} handler={handler} value={content[key]} />)
                }

        </div>
    )
}

export default TableRow