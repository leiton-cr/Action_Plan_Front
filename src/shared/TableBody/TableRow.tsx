

import { TableActions } from '../../models/TableActions'
import ActionButton from '../Buttons/ActionSelect'
import { PlanDetail } from '../../models/PlanDetail'
import { PlanModel } from '../../models/PlanModel'
import TableItem from './TableItem'
import { ChangeEventHandler } from 'react'
import ActionSelect from '../Buttons/ActionSelect'
import { INPUT_MAPPER } from '../../utils/constants'

interface Props {
    content: PlanDetail | PlanModel
    actions?: Array<TableActions>,
    handler?: ChangeEventHandler
}

const TableRow = ({ content, actions, handler }: Props) => {

    const generateTableItem = (key: string, i: number) => {
        const itemOptions = { key: i, title: key, type: INPUT_MAPPER[key].type, content: content[key], handler: handler, value: content[key] }

        if (key === "start") {
            itemOptions["max"] = content['end']
        }

        if (key === "end") {
            itemOptions["min"] = content['start']
        }

        return <TableItem {...itemOptions} />
    }

    return (
        <div className="table_body__row  animate__animated animate__slideInLeft" id={content.id}>

            <TableItem title={"id"} type={INPUT_MAPPER["id"].type} content={content["id"]} handler={handler} value={content["id"]} />

            <div className="table_body__cell">

                {
                    actions && <ActionSelect id={content.id} actions={actions} ></ActionSelect>
                }

            </div>

            {
                Object.keys(content).map((key: string, i: number) => {
                    return key !== 'id' && generateTableItem(key, i)
                })
            }

        </div>
    )
}

export default TableRow