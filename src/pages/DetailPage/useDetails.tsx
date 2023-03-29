import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import useAlerts from "../../hooks/useAlerts";
import { PlanDetail } from "../../models/PlanDetail";
import usePlanService from "../../services/usePlanService";

import FieldInfo from "../../shared/Tables/Interfaces/FieldInfo";
import { EMPTY_HEADER } from "../../utils/constants";
import { createEmptyLine, parseDate } from "../../utils/helpers"

import HeaderData from './HeaderData.json'

const useDetails = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  let { getOne } = usePlanService();
  let { promiseAlert, toastAlert } = useAlerts();

  const [changes, setChanges] = useState(false)

  const editable = useRef(null)

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

  if (details.length === 0) {
    details.push(createEmptyLine())
  }

  const [tableData, setTableData] = useState(details)
  const [formData, setformData] = useState(JSON.parse(JSON.stringify(EMPTY_HEADER)))

  const handleSave = () => {

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
    if (editable.current && "plan" in editable.current){
      return JSON.stringify((editable.current as any).plan) != JSON.stringify(formData)
    }

    return false
  }

  const hasEditTableChanges = () => {
    if (editable.current && "details" in editable.current){

      return  JSON.stringify(tableData.slice(0, tableData.length-1)) != 
              JSON.stringify((editable.current as any).details.slice(0, (editable.current as any).details.length-1))
    }
      
    return false
  }


  const hasCreateHeaderChanges = () => {
    return JSON.stringify(EMPTY_HEADER) != JSON.stringify(formData)
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

  useEffect(() => {
    if (isEdit()) {
      getOne(id).then(element => {

        if (!(element.data.plan) || !(element.data.details)  ){
          navigate("/")
          return toastAlert(`Id not found: [${id}]`, "error");
        }
        
        element.data.details = element.data.details.map(detail => {
          detail.start = parseDate(detail.start)
          detail.end = parseDate(detail.end)
          return detail
        });
        
        element.data.details.push(createEmptyLine())

        editable.current = JSON.parse(JSON.stringify(element.data))

        setTableData(element.data.details)
        setformData(element.data.plan)
      });
    }
  }, [])

  return { changes, handleSave, handleCancel, headerData, detailsState: [tableData, setTableData], formState: [formData, setformData] }
}

export default useDetails