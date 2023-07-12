"use client";
import Image from "next/image"
import Link from "next/link"
import { navBarItems } from "./header.variables";
import { NavBarItem } from "./header.interface";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { footerItems } from "./footer.variables";

const Footer = () => {
    const path = usePathname()


    return (
    <footer>
        <div className="sponsor">
            <div className="sponsor__logo-wrapper">
                <Link href={"https://hostops.hu"}>
                    <Image 
                        src="/icons/sponsor-logo.svg"
                        alt='HostOps.hu'
                        width={150}
                        height={133}
                    />
                </Link>
                <div className="sponsor__logo-wrapper__social">
                    <Link href={"https://www.facebook.com/HostOps.hu"}>
                        <Image 
                            src="/icons/facebook.svg"
                            alt='HostOps.hu facebook'
                            width={50}
                            height={50}
                        />
                    </Link>
                    <Link href={"https://twitter.com/HostOps_hu"}>
                        <Image 
                            src="/icons/twitter.svg"
                            alt='HostOps.hu twitter'
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>
            </div>
            <p>
                által nyújtott szolgáltatás
            </p>
        </div>
        <div className="text-part">
            <h2>
                Az ElmenyKepek.hu egyik játékszerverrel sem áll kapcsolatban és az itt megosztott képekért nem vállal felelősséget. 
            </h2>
            <p>
                Szerzői jog © 2023 ElmenyKepek.hu. Minden Jog Fenntartva.
            </p>
            <p>
                Az oldal sütiket használ, az oldal használatával beleegyezik ezek használatába.
            </p>
        </div>
        <div className="buttons">
            {footerItems.map(item => 
                <Link key={item.name} href={item.href ?? ''}>
                    <p className={path == item.href ? 'font-bold' : ''}>{item.name}</p>
                </Link>
            )}
        </div>
    </footer>
    )
}

export default Footer;