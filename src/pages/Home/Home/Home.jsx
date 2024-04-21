import Banner from '../Banner';
import Category from '../Category';
import PopularMenu from '../PopularMenu';
import Featured from '../Featured'
import Testimonial from '../Testimonial'
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;