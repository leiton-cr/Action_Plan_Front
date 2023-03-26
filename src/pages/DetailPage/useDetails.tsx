import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import useAlerts from "../../hooks/useAlerts";
import { PlanDetail } from "../../models/PlanDetail";

import FieldInfo from "../../shared/Tables/Interfaces/FieldInfo";
import { createEmptyLine, emptyHeader } from "../../utils/helpers"

import HeaderData from './HeaderData.json'

const useDetails = () => {

  let { id } = useParams();
  let { promiseAlert, toastAlert } = useAlerts();
  let navigate = useNavigate();
  const [changes, setChanges] = useState(false)

  let transactionType = "create"

  if (id) {
    transactionType = "edit"
  }

  const isCreate = () => {
    return transactionType == "create"
  }

  const isEdit = () => {
    return transactionType == "edit"
  }

  let details: Array<PlanDetail> = [];
  let header = JSON.parse(JSON.stringify(emptyHeader))


  if (isEdit()) {

  }




  if (details.length === 0) {
    details.push(createEmptyLine())
  }

  const [tableData, setTableData] = useState(details)
  const [formData, setformData] = useState(header)

  const handleSave = () => {
    console.table(tableData);
    console.table(formData);

    if (!changes) {
      return toastAlert("No changes to save", "warning")
    }

    promiseAlert("Succesfully Saved!", "Go back or Stay here.", "Go back", "Stay here")
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/")
        }
      })

  }

  const handleCancel = () => {
    if (!changes) {
      return navigate("/")
    }

    promiseAlert("Are you sure?", "Unsaved changes will be lost.")
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          navigate("/")
        }
      })
  }

  const hasEditHeaderChanges = () => {
    return JSON.stringify(header) != JSON.stringify(details)
  }

  const hasEditTableChanges = () => {
    return JSON.stringify(tableData) != JSON.stringify(tableData)
  }

  const hasCreateHeaderChanges = () => {
    return JSON.stringify(emptyHeader) != JSON.stringify(formData)
  }

  const hasCreateTableChanges = () => {
    return tableData.length > 1
  }

  const hasChanges = () => {

    if (isCreate()) {
      setChanges(hasCreateHeaderChanges() || hasCreateTableChanges())
    }

    if (isEdit()) {
      setChanges(hasEditHeaderChanges() || hasEditTableChanges())
    }
  }

  const headerData: Array<FieldInfo> = HeaderData;

  useEffect(() => {
    hasChanges();
  }, [tableData, formData])

  return { changes, handleSave, handleCancel, headerData, detailsState: [tableData, setTableData], formState: [formData, setformData] }
}

export default useDetails