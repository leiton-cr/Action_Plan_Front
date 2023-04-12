import { PlanDetail } from "./PlanDetail"

export interface PlanModel {
    id: string
    project: string
    manager: number | string
    company: number | string
    outcome?: string
    goal?: string
    issue?: string
    details?:Array<PlanDetail>
    updateAt: string
}