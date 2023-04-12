import useFetch from "../hooks/useFetch"
import { PlanModel } from "../models/PlanModel"
import { BASE_URL } from "../utils/constants"

const usePlanService = () => {

  const url = `${BASE_URL}/plan`

  const {getData, deleteData, postData, putData} = useFetch()

  const getAll = () => {
    return getData(url)
  }

  const getOne = (id) => {
    return getData(`${url}/${id}`)
  }

  const deleteOne = (id) => {
    return deleteData(`${url}/${id}`)
  }

  const createOne = (plan:PlanModel) => {
    return postData(url, {data:{plan:plan, details: plan.details}})
  }

  const updateOne = (plan:PlanModel) => {
    return putData(url, {data:{plan:plan, details: plan.details}})
  }

  return { getAll, getOne, deleteOne, createOne, updateOne }
}

export default usePlanService