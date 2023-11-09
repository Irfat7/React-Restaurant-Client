import React from 'react';
//low lvl jinish pati component folder e button, daisy ui jinish pati

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center md:w-3/12 mx-auto my-8'>
            <p className='text-yellow-600 mb-2'>---{subHeading}---</p>
            <h3 className='text-4xl text-black border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;