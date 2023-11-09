import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section className="mb-4">
            <SectionTitle
                subHeading='Popular Items'
                heading='From Our Menu'
            ></SectionTitle>
            <div className="grid gap-6 md:grid-cols-2">
                {
                    popular.map(item => <MenuItem
                        key={item.id}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;