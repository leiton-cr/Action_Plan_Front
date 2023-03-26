

import { PlanModel } from '../../models/PlanModel'
import FieldInfo from '../../shared/Tables/Interfaces/FieldInfo'
import Table from './components/Table'

import HeaderData from './HeaderData.json'

const IndexPage = () => {

  const headerData: Array<FieldInfo> = HeaderData

  const tableData: Array<PlanModel> = [
    {
      id: "1",
      project: "DC Changer",
      manager: "Jhon",
      company: "Pizza Hut",
      updatedAt: "13/3/2022",
    },
    {
      id: "2",
      project: "Power Ranger",
      manager: "Adams",
      company: "Papa Jhons",
      updatedAt: "12/3/2022",
    },
    {
      id: "3",
      project: "Other",
      manager: "Zdams",
      company: "Papa Jhons",
      updatedAt: "12/3/2022",
    }
  ]

  return (
    <div>
     

      <Table headerData={headerData} mockData={tableData} filters={true}></Table>

    </div>
  )
}

export default IndexPage
