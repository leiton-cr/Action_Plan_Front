import { v4 as uuid } from 'uuid';

import { COMPANY, EMPTY_DETAIL, PEOPLE, PRIORITY, ROL, STATUS } from './constants';




export const createEmptyLine = () => {
  return { ...EMPTY_DETAIL, id: uuid() }
}

export const generateOptions = (collection: any, title: string) => {
  return <>
    <option value="" disabled> Select {title} </option>
    {
      Object.values(collection).map((status: any, i: number) => <option key={i} value={status.CODE} id={status.CODE}> {status.TITLE} </option>)
    }
  </>
}

export const generateSelectOptions = (title:String) => {
    
  let options = <></>;

  switch (title) {
    case "status":
        options = generateOptions(STATUS, "Status")
      break;

      case "priority":
        options = generateOptions(PRIORITY, "Priority")
      break;

      case "company":
        
        options = generateOptions(COMPANY, "Company")
      break;

      case "manager":
        const manager = PEOPLE.filter(person => person.ROL == ROL.PROJECT_MANAGER.CODE)
        options = generateOptions(manager, "Manager")
      break;

      case "responsible":
        const responsible = PEOPLE.filter(person => person.ROL == ROL.COLLABORATOR.CODE)
        options = generateOptions(responsible, "Responsible")
      break;

      case "stakeholder":
        const holder = PEOPLE.filter(person => person.ROL == ROL.STACKEHOLDER.CODE)
        options = generateOptions(holder, "Stakeholder")
      break;
  }
  
  return options
}

export const parseDate = (date:string) => {
  return date.substring(0,10)
}