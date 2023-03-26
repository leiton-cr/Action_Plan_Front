import { TableActions } from "../../models/TableActions"
import FieldInfo from "../Tables/Interfaces/FieldInfo"

import HeaderItem from "./HeaderItem"

interface Props {
  headerData: Array<FieldInfo>,
  changeOrderer?: Function
}

const TableHeader = ({ headerData, changeOrderer }: Props) => {

  return (
    <div className="table_head">
      <div className="table_head__row">
        {
          Object.values(headerData).map((headerInfo: FieldInfo) => <HeaderItem key={headerInfo.title} title={headerInfo.title} column={headerInfo.name} changeOrderer={changeOrderer} />)
        }
      </div>
    </div>
  )
}

export default TableHeader