"use client";
import Image from 'next/image';

export interface Avatar {
    onClick?: () => void
    username?: string
    icon?: string
    width?: number
    height?: number
    iconWidth?: number
    iconHeight?: number
    centerIcon?: boolean
}

export default function AvatarElem({ onClick, username, icon, width, height, iconWidth, iconHeight, centerIcon = false }: Avatar) {
  const iconTrueWidth = (iconWidth ? iconWidth : (width ? (width-30) : 35))
  const iconTrueHeight = (iconHeight ? iconHeight : (height ? (height-30) : 35))


  return (
    <div className={`avatar bg-primary w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center ${centerIcon ? 'items-center' : 'items-end'}`} style={{height: `${height}px`, width: `${width}px`}} onClick={onClick}>
        <Image 
        src={typeof icon == "string" ? icon : "/icons/user-icon.svg"}
        alt={username ?? "Avatár"}
        width={iconTrueWidth}
        height={iconTrueHeight}
        />
    </div>
  )
}
