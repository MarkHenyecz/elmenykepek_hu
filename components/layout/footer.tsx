"use client";
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { footerItems } from "./footer.variables";

const Footer = () => {
    const path = usePathname()
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
    <footer className="bg-secondary mt-4 p-2 sm:flex items-center justify-center gap-4">
        <div className="flex flex-col justify-around text-center max-sm:mb-4">
            <div className="flex justify-around">
                <Link href={"https://hostops.eu"}>
                    <Image 
                        src="/icons/sponsor-logo.svg"
                        alt='HostOps.eu'
                        width={150}
                        height={133}
                    />
                    <p>
                        által nyújtott szolgáltatás
                    </p>
                </Link>
                <div className="flex flex-col justify-around">
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
        </div>
        <div className="text-center">
            <h2>
                Az ElmenyKepek.hu egyik játékszerverrel sem áll kapcsolatban és az itt megosztott képekért nem vállal felelősséget. 
            </h2>
            <p>
                Szerzői jog © {year} ElmenyKepek.hu. Minden Jog Fenntartva.
            </p>
            <p>
                Az oldal sütiket használ, az oldal használatával beleegyezik ezek használatába.
            </p>
        </div>
        <div className="flex sm:flex-col items-center justify-center text-center gap-4 max-sm:mt-2">
            {footerItems.map(item => 
                <Link key={item.name} href={item.href ?? ''}>
                    <p className={`text-2xl ${path == item.href ? 'font-bold' : ''}`}>{item.name}</p>
                </Link>
            )}
        </div>
    </footer>
    )
}

export default Footer;