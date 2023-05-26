import React from 'react';
import IMAGES from '../images/IMAGES.jsx'

const PageNotFound = () => {
    return (
            <div className='w-100 py-60'>
                <h1 className='text-center text-4xl font-bold '>Uh-oh! Page Not Found</h1>
            <img src={IMAGES.mooview404} alt='404' className='justify-center m-auto w-[80%]' />
            </div>
    );
};

export default PageNotFound;