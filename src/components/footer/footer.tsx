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
                    <p><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i> <br/><span>Instagram</span></a></p>
                </div>
                <div className="col-3 network-item">
                    <p><a href="https://www.facebook.com/"><i className="fab fa-facebook-square"></i><br/><span>Facebook</span></a></p>
                </div>
                <div className="col-3 network-item">
                    <p><a href="https://www.youtube.com/"><i className="fab fa-youtube-square"></i><br/><span>youtube</span></a></p>
                </div>
                <div className="col-3 network-item">
                    <p><a href="https://twitter.com/"><i className="fab fa-twitter-square"></i><br/><span>Twitter</span></a></p></div>
            </div>
        </div>
    </div>;
}

export default Footer;

