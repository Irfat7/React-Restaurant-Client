import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import featuredImage from '../../assets/home/featured.jpg'
import './featured.css'

const Featured = () => {
    return (
        <section className='featured-item bg-fixed text-white pt-10 my-20'>
            <SectionTitle
                subHeading='check it out'
                heading='Featured Item'
            ></SectionTitle>
            <div className='md:flex justify-center items-center bg-slate-500 bg-opacity-70 py-20 px-36'>
                <div>
                    <img src={featuredImage} />
                </div>
                <div className='md:ml-10'>
                    <p>August 20, 2023</p>
                    <p className='uppercase'>WHERE CAN I GET SOME?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex odit deleniti sit ducimus laboriosam, animi voluptates! Dicta corporis officia repellat? Iure asperiores autem, eum qui odio dolorem numquam, expedita repellendus, quasi corporis iusto repellat? Vero esse dignissimos veniam totam reiciendis. Fuga inventore perspiciatis officiis molestias consectetur, ad voluptatum quos tempore!</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white">Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;