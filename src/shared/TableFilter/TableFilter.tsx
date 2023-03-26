import FieldInfo from "../Tables/Interfaces/FieldInfo"
import FilterItem from "./FilterItem"

interface Props { 
  headerData: Array<FieldInfo>, 
  changeFilterer?: Function 
}

const TableFilter = ({ headerData, changeFilterer }: Props) => {

  return (
    <div className="table_head">
      <div className="table_head__filter">
        {
          Object.values(headerData).map(
            (headerInfo: FieldInfo, i:number) => headerInfo.filter ? 
              <FilterItem key={headerInfo.title} title={headerInfo.title} changeFilterer={changeFilterer} /> : 
              <div className="table_head__cell" key={i}>N/A</div>
          )
        }
      </div>
    </div>
  )
}

export default TableFilter