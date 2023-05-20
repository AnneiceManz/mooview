import React from 'react';
import { Image, Menu } from 'semantic-ui-react';
import IMAGES from '../../images/IMAGES';

const Footer = () => {
    return (
        <div>
            <Menu inverted color='blue'>
                <Menu.Item>
                    <Image src={IMAGES.mooview_logo3} size='tiny'/>
                </Menu.Item>
            </Menu>
            
        </div>
    );
};

export default Footer;