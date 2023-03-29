

import { PlanModel } from '../../models/PlanModel'
import usePlanService from '../../services/usePlanService'
import FieldInfo from '../../shared/Tables/Interfaces/FieldInfo'
import Table from './components/Table'

import HeaderData from './HeaderData.json'

const IndexPage = () => {

  const headerData: Array<FieldInfo> = HeaderData

  const tableData: Array<PlanModel> = []




  return (
    <div>
     
      <Table headerData={headerData} mockData={tableData} filters={true}></Table>

    </div>
  )
}

export default IndexPage
