import React from 'react';
import FooterCtr from './footerCtr';

import './footer.css'

const Footer: React.FC<FooterCtr> = (props: FooterCtr) => {
    return <div className="footer-content">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        <h3>Prueba MASSEQ</h3>
                        <span>Copyright © 2011-2021 Laravel LLC.</span>
                    </div>
                </div>
                <div className="col-3 network-item">
                    <i className="fab fa-instagram"></i>
                    <p><a href="#">Instagram</a></p>
                </div>
                <div className="col-3 network-item"><i className="fab fa-facebook-square"></i>
                    <p><a href="#">Facebook</a></p>
                </div>
                <div className="col-3 network-item"><i className="fab fa-youtube-square"></i>
                    <p><a href="#">youtube</a></p>
                </div>
                <div className="col-3 network-item"><i className="fab fa-twitter-square"></i>
                    <p><a href="#">Twitter</a></p></div>
            </div>
        </div>
    </div>;
}

export default Footer;

