import { NavBarItem } from "./header.interface";
import { navBarItems } from "./header.variables";

export const footerItems: NavBarItem[] = [
    {
        name: 'Adatvédelem',
        href: 'adatvedelem'
    },
    ...navBarItems.filter(item => item.href)
]