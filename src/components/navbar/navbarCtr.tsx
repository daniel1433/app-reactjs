import React from 'react';
import NavBar from './navbar';

interface NavBarProps {
    state: any;
    changeStateSession:any;
}

export default class NavBarCtr extends React.Component<NavBarProps> {

    render = () => {
        return <NavBar {...this} />;
    }
}
