"use client";
import Image from "next/image"
import Link from "next/link"
import { navBarItems } from "./header.variables";
import { NavBarItem } from "./header.interface";
import { useState } from "react";
import { usePathname } from "next/navigation";
import AvatarElem from "../avatar/avatar";
import { useAuthStore } from "../stores/authStore";

const NavBarElem = ({ item, openSearchBar }: { item: NavBarItem, openSearchBar: () => void }) => {
    const path = usePathname()

    if(item.href != undefined) {
        return <Link href={item.href}>
                    <p className={path == item.href ? "font-bold" : ""}>
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

    return (
    <header>
        <div>
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
                <div className="searchBar">
                    <Image 
                    src="/icons/search.svg"
                    alt="Keresés..."
                    width={50}
                    height={50}
                    />
                    <input type="text" placeholder="Keresés..." />
                    <p onClick={() => setSearchBarOpen(false)}> X </p>
                </div> : 
                <>
                    {navBarItems.map(item => 
                        <NavBarElem key={item.name} item={item} openSearchBar={() => setSearchBarOpen(!searchBarOpen)} />
                    )}
                </>
            }
        </div>

        <div>
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