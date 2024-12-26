"use client";

interface Props {
    children: JSX.Element
    message: string
}

export default function ToolTip({ children, message }: Props) {
    
    return (
    <>
        <div className={`[&:hover>div]:opacity-100`}>
            {children}

            <div className='bg-secondary absolute p-1 border-accent border-2 rounded-xl translate-y-2 -translate-x-2/4 text-center  duration-300 opacity-0'>
                {message}
            </div>
        </div>
    </>
    )
}
