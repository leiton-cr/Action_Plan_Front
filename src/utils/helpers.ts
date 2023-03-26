import { v4 as uuid } from 'uuid';
import { PlanDetail } from '../models/PlanDetail';
import { PlanModel } from '../models/PlanModel';
import { TODAY } from './constants';

export const emptyLine: PlanDetail = {
    "id": "",
    "task": "",
    "responsible": "",
    "priority": "",
    "status": "",
    "start": TODAY,
    "end": TODAY,
    "resources": "",
    "bloquers": "",
    "stakeholder": "",
    "milestone": "",
    "notes": "",
}

export const emptyHeader: PlanModel = {
    id: "",
    company:"",
    project:"",
    manager:"",
    updatedAt:"",
    outcome: "",
    goal: "",
    issue: "",
}

export const createEmptyLine = () => {
    const item = { ...emptyLine, id: uuid() }
    return item
}