"use client";
import Image from "next/image"
import Link from "next/link"
import { navBarItems } from "./header.variables";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import AvatarElem from "../avatar/avatar";
import { useAuthStore } from "../stores/authStore";
import { NavBarItem } from "./header.interface";

const NavBarElem = ({ item, openSearchBar }: { item: NavBarItem, openSearchBar: () => void }) => {
    const path = usePathname()
    const selected = useMemo(() => path == item.href, [path, item])

    if(item.href != undefined) {
        return <Link href={item.href}>
                    <p className={`text-main text-4xl ${selected ? "font-bold" : ""}`}>
                        {item.name}
                    </p>
                </Link>
    }
        

    return <p onClick={openSearchBar}>
        {item.name}
    </p>
}

const Header = () => {
    const [searchBarOpen, setSearchBarOpen] = useState(false)
    const authStore = useAuthStore()

    useEffect(() => {
        if(!authStore.isLoggedIn) {
            authStore.validate()
        }
    }, [authStore])

    return (
    <header className="bg-secondary m-4 p-2 flex justify-between max-md:flex-col gap-4">
        <div className="flex items-center gap-8 max-md:flex-col">
            <Link href="/">
                <Image 
                    src="/logo.svg"
                    alt='Élményképek.hu'
                    width={70}
                    height={80}
                    priority
                />
            </Link>

            {searchBarOpen ? 
                <div className="bg-primary flex gap-4 items-center px-3">
                    <Image 
                    src="/icons/search.svg"
                    alt="Keresés..."
                    width={50}
                    height={50}
                    />
                    <input className="text-4xl bg-primary border-none" type="text" placeholder="Keresés..." />
                    <p className="cursor-pointer" onClick={() => setSearchBarOpen(false)}> X </p>
                </div> : 
                <>
                    {navBarItems.map(item => 
                        <NavBarElem key={item.name} item={item} openSearchBar={() => setSearchBarOpen(!searchBarOpen)} />
                    )}
                </>
            }
        </div>

        <div className="flex items-center gap-4 max-md:justify-center">
            {authStore.isLoggedIn ? 
                <Link href={"/feltoltes"}>
                    <Image 
                    src="/icons/upload-icon.svg"
                    alt="Új képek feltöltése"
                    width={50}
                    height={50}
                    />
                </Link>
            : null}
            {authStore.isLoggedIn ? 
                <Link href={"/profil"}>
                    <AvatarElem />
                </Link>
            : 
                <Link href={"/profil/bejelentkezes"}>
                    <AvatarElem />
                </Link>
            }
        </div>
    </header>
    )
}

export default Header;