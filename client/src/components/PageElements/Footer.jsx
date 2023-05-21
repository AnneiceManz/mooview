import React from 'react';
import { Image, Menu } from 'semantic-ui-react';
import IMAGES from '../../images/IMAGES';

const Footer = () => {

    const YearCopyright = () => {
        return (
            <span id='copyright-year'>Copyright@{new Date().getFullYear()}. Developed By: <a href='https://github.com/AnneiceManz'>Anneice Manzanares</a></span>
        )
    }
    return (
        <div>
            <nav className='items-center justify-center flex m-6 bg-white h-auto'>

                    <Image src={IMAGES.mooview_logo3} size='tiny'/>
                    <YearCopyright />
            </nav>
            
        </div>
    );
};

export default Footer;