import { ChangeEventHandler } from "react"
import { COMPANY, PEOPLE } from "../../utils/constants";
import { generateSelectOptions } from "../../utils/helpers";

interface Props {
  content: String,
  title: string,
  min?: string,
  max?: string,
  type?: string,
  value?: string | number,
  handler?: ChangeEventHandler
}

const TableItem = ({ content, title, type, value, handler, min, max }: Props) => {


  const getColumItem = () => {

    switch (title) {
      case "manager":
        content = PEOPLE.find(person => `${person.CODE}` == content)?.TITLE || content
        break;

      case "company":
        content = Object.values(COMPANY).find(company => `${company.CODE}` == content)?.TITLE || content
        break;
    }

    return <div className="table_body__cell" data-title={title}>{content ? `${content}`.split("-")[0] : "Never"}</div>
  }

  return (

    <>

      {
        type &&
        <>
          {
            type === "input" && <input value={value} onChange={handler} data-title={title}></input>
          }

          {
            type === "datetime" && <input type={"date"} value={value} onChange={handler} data-title={title} min={min} max={max} ></input>
          }

          {
            type === "select" && <select value={value} onChange={handler} data-title={title}>{generateSelectOptions(title)}</select>
          }
        </>
      }

      {
        !type || type === "text" && getColumItem()
      }

    </>

  )
}

export default TableItem