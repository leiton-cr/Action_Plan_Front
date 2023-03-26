import  { ReactElement } from 'react'
import "./template.css"
import icon from '/app_ico.png'

interface Props {
    title: string
    children: ReactElement
}

const Template = ({ title, children }: Props) => {
    return (
        <>
            <header className='template_header'>
                <h1 className='template_title'>{title}</h1>
                <img src={icon} className='template_image'/>
            </header>
           
            {children}
        </>
    )
}

export default Template