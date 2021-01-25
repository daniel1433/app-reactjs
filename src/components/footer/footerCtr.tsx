import React from 'react';
import Footer from './footer';

interface FooterProps {

}

export default class FooterCtr extends React.Component<FooterProps>{
    render = () => {
        return <Footer {...this} />;
    }
}