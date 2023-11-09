import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImage from '../../../assets/menu/pizza-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import dessertImage from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImage from '../../../assets/menu/pizza-bg.jpg'
import soupImage from '../../../assets/menu/soup-bg.jpg'
import saladImage from '../../../assets/menu/salad-bg.jpg'

//note
const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    
    return (
        <div>
            <Helmet>
                <title>Menu</title>
            </Helmet>

            <Cover imageURL={menuImage} title='Our Menu'></Cover>
            <SectionTitle subHeading="Don't miss" heading="Today's Offer"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            <Cover imageURL={dessertImage} title='Desserts'></Cover>
            <MenuCategory items={dessert}></MenuCategory>

            <Cover imageURL={pizzaImage} title='Pizza'></Cover>
            <MenuCategory items={pizza}></MenuCategory>
            
            <Cover imageURL={soupImage} title='Soup'></Cover>
            <MenuCategory items={soup}></MenuCategory>
            
            <Cover imageURL={saladImage} title='Salad'></Cover>
            <MenuCategory items={salad}></MenuCategory>
            
        </div>
    );
};

export default Menu;