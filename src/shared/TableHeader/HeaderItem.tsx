import { useState } from "react"

interface Props {
  title: String,
  column: String,
  changeOrderer?: Function
}

const HeaderItem = ({ title, column, changeOrderer }: Props) => {

  const [isAsc, setIsAsc] = useState(false)

  const toggleOrder = () => {
    if (changeOrderer) {
      changeOrderer(title, (!isAsc))
    }

    setIsAsc(!isAsc)
  }

  const hasFilter = () => {
    return column !== "Id" && column !== "Actions";
  }

  return (
    <div className="table_head__cell" onClick={toggleOrder}>

      <div>{column} </div>

      {hasFilter() && changeOrderer &&
        <>{isAsc ?
          <span className="material-symbols-outlined">arrow_drop_up</span> :
          <span className="material-symbols-outlined">arrow_drop_down</span>
        }
        </>
      }
    </div>
  )
}

export default HeaderItem