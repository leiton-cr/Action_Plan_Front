export interface PlanDetail{
    id: string
    task: string
    responsible: number | string
    priority: number | string
    status: number | string
    start: string
    end: string
    resources: string
    blockers: string
    stakeholder: number | string
    milestone: string
    notes: string
}