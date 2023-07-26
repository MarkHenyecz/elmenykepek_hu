"use client";
import Image from 'next/image';
import '../../components/scss/avatar.scss'
import { useState } from 'react';

export interface Avatar {
    onClick?: () => void
    username?: string
    icon?: string
    width?: number
    height?: number
    iconWidht?: number
    iconHeight?: number
    centerIcon?: boolean
}

export default function AvatarElem({ onClick, username, icon, width, height, iconWidht, iconHeight, centerIcon = false }: Avatar) {
  const iconTrueWidth = (iconWidht ? iconWidht : (width ? (width-30) : 35))
  const iconTrueHeight = (iconHeight ? iconHeight : (height ? (height-30) : 35))


  return (
    <div className={`avatar ${centerIcon ? 'centerIcon' : ''}`} style={{height: `${height}px`, width: `${width}px`}} onClick={onClick}>
        <Image 
        src={typeof icon == "string" ? icon : "/icons/user-icon.svg"}
        alt={username ?? "Avatár"}
        width={iconTrueWidth}
        height={iconTrueHeight}
        />
    </div>
  )
}
