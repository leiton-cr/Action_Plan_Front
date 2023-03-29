export interface PlanModel {
    id: string
    project: string
    manager: number | string
    company: number | string
    outcome?: string
    goal?: string
    issue?: string
    updatedAt: string
}