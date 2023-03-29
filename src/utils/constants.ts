import { PlanDetail } from "../models/PlanDetail"
import { PlanModel } from "../models/PlanModel"

const getToday = () => {
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-" + (day);
}

export const TODAY = getToday()

export const BASE_URL = "http://localhost:9000/api/v1"

export const ROL = {
    "STACKEHOLDER": { TITLE: "Stackeholder", CODE: 1000 },
    "PROJECT_MANAGER": { TITLE: "Project Manager", CODE: 1001 },
    "COLLABORATOR": { TITLE: "Collaborator", CODE: 1002 }
}

export const STATUS = {
    "TO_DO": { TITLE: "To-Do", CODE: 1000 },
    "IN_PROCESS": { TITLE: "In Process", CODE: 1001 },
    "BLOCKED": { TITLE: "Blocked", CODE: 1002 },
    "DONE": { TITLE: "Done", CODE: 1003 }
}

export const PRIORITY = {
    "LOW": { TITLE: "Low", CODE: 1000 },
    "MID": { TITLE: "Medium", CODE: 1001 },
    "HIGH": { TITLE: "High", CODE: 1002 },
    "URGENT": { TITLE: "Urgent", CODE: 1003 }
}

export const COMPANY = {
    "FACEBOOK": { TITLE: "Facebook", CODE: 1000 },
    "SAMSUNG": { TITLE: "Samsung", CODE: 1001 },
    "ASUS": { TITLE: "Asus", CODE: 1002 },
    "OTHER": { TITLE: "Other", CODE: 1003 }
}

export const PEOPLE = [
    { TITLE: "James", CODE: 10000, ROL: 1001 },
    { TITLE: "Jhon", CODE: 10001, ROL: 1002 },
    { TITLE: "Joe", CODE: 10002, ROL: 1000 },
    { TITLE: "Adam", CODE: 10003, ROL: 1000 },
    { TITLE: "Carles", CODE: 10004, ROL: 1001 },
    { TITLE: "Stefany", CODE: 10005, ROL: 1002 },
    { TITLE: "Amalia", CODE: 10006, ROL: 1000 },
    { TITLE: "Briene", CODE: 10007, ROL: 1000 },
    { TITLE: "Pablo", CODE: 10008, ROL: 1001 },
    { TITLE: "Ana", CODE: 10009, ROL: 1002 },
    { TITLE: "Maria", CODE: 10010, ROL: 1000 },
    { TITLE: "Felix", CODE: 10011, ROL: 1000 },
    { TITLE: "Felicia", CODE: 10012, ROL: 1001 },
    { TITLE: "Yang", CODE: 10013, ROL: 1002 },
    { TITLE: "Grey", CODE: 10014, ROL: 1000 },
    { TITLE: "Cooper", CODE: 10015, ROL: 1000 }
]

export const EMPTY_DETAIL: PlanDetail = {
    "id": "",
    "task": "",
    "responsible": "",
    "priority": "",
    "status": "",
    "start": TODAY,
    "end": TODAY,
    "resources": "",
    "blockers": "",
    "stakeholder": "",
    "milestone": "",
    "notes": "",
}

export const EMPTY_HEADER: PlanModel = {
    "id": "",
    "company": "",
    "project": "",
    "manager": "",
    "updatedAt": "",
    "outcome": "",
    "goal": "",
    "issue": "",
}

export const INPUT_MAPPER = {
    id: { type: "text" },
    task: { type: "input" },
    responsible: { type: "select" },
    priority: { type: "select" },
    status: { type: "select" },
    start: { type: "datetime" },
    end: { type: "datetime" },
    resources: { type: "input" },
    blockers: { type: "input" },
    stakeholder: { type: "select" },
    milestone: { type: "input" },
    notes: { type: "input" },
    project: { type: "text" },
    manager: { type: "text" },
    company: { type: "text" },
    updateAt: { type: "text" },
    action: { type: "input" }
}