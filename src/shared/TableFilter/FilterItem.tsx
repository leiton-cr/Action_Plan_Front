import { ChangeEvent, useState } from "react"

interface Props {
  title:string,
  changeFilterer?: Function
}

const FilterItem = ({title, changeFilterer }: Props) => {

  const [filter, setFilter] = useState("")

  const onFilter = (e:ChangeEvent<HTMLInputElement>) => {
    
    if(changeFilterer){
      changeFilterer(title, e.target.value)
    }
    
    setFilter(e.target.value)
  }

  return (
    <div className="table_head__cell">

      <input onChange={onFilter} value={filter}></input>

    </div>

  )
}

export default FilterItem