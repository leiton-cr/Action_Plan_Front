import { MouseEventHandler } from "react"

export interface TableActions {
    title: "Edit" | "Delete" | "Details"
    handler: Function
}
