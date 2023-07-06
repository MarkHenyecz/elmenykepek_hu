"use client";
import Image from 'next/image';
import '../../components/scss/avatar.scss'

export interface Avatar {
    username?: string
    icon?: string
    width?: number
    height?: number
}

export default function AvatarElem({ username, icon, width, height }: Avatar) {

  return (
    <div className="avatar" style={{height: `${height}px`, width: `${width}px`}}>
        <Image 
        src={icon ?? "/icons/user-icon.svg"}
        alt={username ?? "Avatár"}
        width={width ? (width-30) : 35}
        height={height ? (height-30) : 35}
        />
    </div>
  )
}
