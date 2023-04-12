import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import useAlerts from "../../hooks/useAlerts";
import { PlanDetail } from "../../models/PlanDetail";
import { PlanModel } from "../../models/PlanModel";
import usePlanService from "../../services/usePlanService";
import { v4 as uuid } from 'uuid';
import FieldInfo from "../../shared/Tables/Interfaces/FieldInfo";
import { EMPTY_HEADER } from "../../utils/constants";
import { createEmptyLine, parseDate } from "../../utils/helpers"

import HeaderData from './HeaderData.json'

const useDetails = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  let { getOne, createOne, updateOne } = usePlanService();
  let { promiseAlert, toastAlert } = useAlerts();

  const [changes, setChanges] = useState(false)

  const editable = useRef<any>(null)

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

    // Remove the empty line.
    tableData.pop()

    if (tableData.length === 0) {
      return toastAlert("Must include at least one detail", "error")
    }

    let actualId: string;
    if (id && isEdit()) {
      actualId = id
    } else {
      actualId = uuid();
    }

    const planData: PlanModel = { ...formData, id: actualId, details: tableData }

    if (id && isEdit()) {
      // Call service to edit
      updateOne(planData).then(res => {
        console.log(res);
      })

    } else {
      // Call service to create
      createOne(planData).then(res => {
        console.log(res);
      })

    }

    promiseAlert("Succesfully Saved!", "Go back or Stay here.", "Go back", "Stay here")
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/")
        }

        if (transactionType == "create") {
          transactionType = "edit"
          actualId = planData.id
          details.push(createEmptyLine())
          toastAlert("Succesfully created", "success")
          //editable.current = 
        } else if (transactionType == "edit") {
          toastAlert("Succesfully updated", "success")
        }

        const lastRow = editable.current.details[editable.current.details.length - 1];

        if (planData.details) {
          editable.current = JSON.parse(JSON.stringify({
            plan: {
              id: planData.id,
              company: planData.company,
              goal: planData.goal,
              project: planData.project,
              manager: planData.manager,
              issue: planData.issue,
              outcome: planData.outcome,
              updateAt: planData.updateAt
            },
            details: [
              ...planData.details,
              lastRow
            ]
          }))
        }

        setChanges(false)
        planData.details?.push(lastRow)
        
      })
  }

  const handleCancel = () => {
    if (!changes) {
      return navigate(-1)
    }

    promiseAlert("Are you sure?", "Unsaved changes will be lost.")
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          navigate("/")
        }
      })
  }

  const hasEditHeaderChanges = () => {
    if (editable.current && "plan" in editable.current) {
      return JSON.stringify((editable.current as any).plan) != JSON.stringify(formData)
    }

    return false
  }

  const hasEditTableChanges = () => {
    if (editable.current && "details" in editable.current) {

      return JSON.stringify(tableData.slice(0, tableData.length - 1)) !=
        JSON.stringify((editable.current as any).details.slice(0, (editable.current as any).details.length - 1))
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

        if (!(element.data.plan) || !(element.data.details)) {
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