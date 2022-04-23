import React from "react";
import "./footer.css"
import logo from './../../Assets/image/Logo_footer_img.png';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { useLocation, Link } from "react-router-dom";

const FooterPage = () => {
    let location = useLocation();

    if (location.pathname === '/login') return null;
    return (
        <MDBFooter className="container-footer">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="4">
                        <Link to="/dashboard"><img src={logo} className="img-footer"/></Link>
                        <p className="text-footer subtitle">Ranwildimal from FPT Can Tho University</p>
                        
                    </MDBCol>
                    <MDBCol md="8">
                        <h5 className="title">Links</h5>
                        <ul>
                            <p className="text-footer information-footer"> Adress: 600 Nguyen Van Cu, An Binh, Ninh Kieu, Can Tho</p>
                            <p className="text-footer information-footer"> Phone number: <a href = "tel:02927303636">0292 7303 636</a></p>
                            <p className="text-footer information-footer">Email: <a href = "mailto:fptu.cantho@fe.edu.vn">fptu.cantho@fe.edu.vn</a></p>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="pt-5 pb-1">
                <MDBContainer fluid>
                <p className="text-footer subtitle"> &copy; {new Date().getFullYear()} Copyright:  Ranwildimal Team</p>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPage;