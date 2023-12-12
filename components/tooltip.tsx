"use client";
import './scss/tooltip.scss'

interface Props {
    children: JSX.Element
    message: string
}

export default function ToolTip({ children, message }: Props) {
    
    return (
    <>
        <div className={`tooltip-wrapper `}>
            {children}

            <div className='tooltip-wrapper__tooltip'>
                {message}
            </div>
        </div>
    </>
    )
}
