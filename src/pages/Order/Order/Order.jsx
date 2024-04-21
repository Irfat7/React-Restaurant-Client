import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import FoodCard from '../../../components/FoodCard/FoodCard';


const Order = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')

    console.log(dessert, soup, salad, pizza, drinks)

    return (
        <div>
            <Cover imageURL={orderCover} title='Order Food'></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <div className='grid md:grid-cols-3 gap'>
                        {
                            salad.map(saladItem =>
                                <FoodCard key={saladItem._id} item={saladItem}>
                                </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {
                            pizza.map(saladItem =>
                                <FoodCard key={saladItem._id} item={saladItem}>
                                </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {
                            soup.map(saladItem =>
                                <FoodCard key={saladItem._id} item={saladItem}>
                                </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {
                            dessert.map(saladItem =>
                                <FoodCard key={saladItem._id} item={saladItem}>
                                </FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                <div className='grid md:grid-cols-3 gap-10'>
                        {
                            drinks.map(saladItem =>
                                <FoodCard key={saladItem._id} item={saladItem}>
                                </FoodCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;