import { ChangeEventHandler } from "react"

interface Props { 
  content: String, 
  title: string , 
  type?: string , 
  value?: string | number , 
  handler?: ChangeEventHandler
}

const TableItem = ({ content, title, type, value, handler }: Props) => {
  return (

    <>

      {
        type &&
        <>
          {
            type === "input" && <input value={value} onChange={handler} data-title={title}></input>
          }

          {
            type === "datetime" && <input type={"date"} value={value} onChange={handler} data-title={title}></input>
          }

          {
            type === "select" && <select value={value} onChange={handler} data-title={title}></select>
          }
        </>
      }

      {
        !type || type === "text" && <div className="table_body__cell" data-title={title}>{content.split("-")[0]}</div>
      }

    </>

  )
}

export default TableItem