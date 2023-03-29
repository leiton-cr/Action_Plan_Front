import useFetch from "../hooks/useFetch"
import { BASE_URL } from "../utils/constants"

const usePlanService = () => {

  const url = `${BASE_URL}/plan`

  const {getData} = useFetch()

  const getAll = () => {
    return getData(url)
  }

  const getOne = (id) => {
    return getData(`${url}/${id}`)
  }

  return { getAll, getOne }
}

export default usePlanService