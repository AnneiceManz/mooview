import React from 'react';
import { Header } from 'semantic-ui-react';
import IMAGES from '../images/IMAGES';
import { Outlet } from 'react-router-dom';

const Tagline = () => {
    return (
        <div>
            <Header textAlign='center' as='h3'>
                Convince this cow to watch your show!
            </Header>

        </div>
    );
};

export default Tagline;