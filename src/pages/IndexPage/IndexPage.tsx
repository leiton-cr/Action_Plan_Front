import { Link } from 'react-router-dom'
import Table from './components/Table'
import { useState } from 'react'

const IndexPage = () => {

  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="index__heading">
        <button><Link to={"/create"}>Create Plan</Link></button>
        <div className="table__count">Currently showing: <span>{count}</span> plan{count !== 1 && "s"}</div>
      </div>
      <Table setCount={setCount}></Table>
    </div>
  )
}

export default IndexPage