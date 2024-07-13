import React from 'react'
import image4 from './img/carousel-3.jpg';
import './homepage.css';
import logo from './Images/Logo.png';
import image7 from './img/vacuum-cleaner.svg';
import image8 from './img/car-seat.svg';
import image9 from './img/window-wipe.svg';
import image10 from './img/car-wash.svg';
import image11 from './img/car-wash2.svg';
import image12 from './img/engine.svg';
import image13 from './img/car-wash3.svg';

const Service = () => {
  return (
    <div className='home'>
    <div className="top-bar">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12">
                        <div className="logo">
                            
                                <h1 >Kadi<span>Kazi</span></h1>
                                 <img src={logo} alt="Logo"/> 
                            
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 d-none d-lg-block">
                        <div className="row">
                            <div className="col-4">
                                <div className="top-bar-item">
                                    <div className="top-bar-icon">
                                        <i className="far fa-clock"></i>
                                    </div>
                                    <div className="top-bar-text">
                                        <h3>Opening Hour</h3>
                                        <p>Mon - Fri, 8:00 - 9:00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="top-bar-item">
                                    <div className="top-bar-icon">
                                        <i className="fa fa-phone-alt"></i>
                                    </div>
                                    <div className="top-bar-text">
                                        <h3>Call Us</h3>
                                        <p>077661735</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="top-bar-item">
                                    <div className="top-bar-icon">
                                        <i className="far fa-envelope"></i>
                                    </div>
                                    <div className="top-bar-text">
                                        <h3>Email Us</h3>
                                        <p>kadikazi600@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                 <div className="nav-bar">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <a href="#" className="navbar-brand">MENU</a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto">
                        
                            <a href="/" className="nav-item nav-link active">Home</a>
                            <a href="/about" className="nav-item nav-link">About</a>
                            <a href="/service" className="nav-item nav-link">Service</a>
        
                            <a href="/plans" className="nav-item nav-link">Plans</a>
                        </div>
                        <div className="ml-auto">
                            <a className="btn btn-custom" href="/login">Login</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>  
    <div className="page-header">
    <div className="container">
        <div className="row">
            <div className="col-12">
                <h2>Service</h2>
            </div>
            <div className="col-12">
                <a href="/">Home</a>
                <a href="/service">Service</a>
            </div>
        </div>
    </div>
</div>
<div className="service">
                        <div className="container">
                            <div className="section-header text-center">
                                
                                <h2 style={{color:'white'}}>Premium Washing Services</h2>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        
                                        <h3>Exterior Washing</h3>
                                        <img src={image10}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <i className="flaticon-car-wash"></i>
                                        <h3>Interior Washing</h3>
                                        <img src={image11}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <img src="" alt="" />
                                        <h3>Vacuum Cleaning</h3>
                                        <img src={image7}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <i className="flaticon-seat"></i>
                                        <h3>Seats Washing</h3>
                                        <img src={image8}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <i className="flaticon-car-service"></i>
                                        <h3>Window Wiping</h3>
                                        <img src={image9}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <i className="flaticon-car-service-2"></i>
                                        <h3>Wet Cleaning</h3>
                                        <img src={image13}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <i className="flaticon-car-wash"></i>
                                        <h3>Under Wash</h3>
                                        <img src={image11}alt="" className='icon'/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="service-item">
                                        <i className="flaticon-brush-1"></i>
                                        <h3>Engine Wash</h3>
                                        <img src={image12}alt="" className='icon'/> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="facts" data-parallax="scroll" data-image-src={image4}>
                        <div className="container">
                            <div className="row">
                                
                                <div className="col-lg-3 col-md-6">
                                    <div className="facts-item">
                                        <i className="fa fa-user"></i>
                                        <div className="facts-text">
                                            <h3 data-toggle="counter-up">10+</h3>
                                            <p>Staff</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="facts-item">
                                        <i className="fa fa-users"></i>
                                        <div className="facts-text">
                                            <h3 data-toggle="counter-up">20+</h3>
                                            <p>Happy Clients</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="facts-item">
                                        <i className="fa fa-check"></i>
                                        <div className="facts-text">
                                            <h3 data-toggle="counter-up">10</h3>
                                            <p>Projects Completed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-contact">
                            <h2>Get In Touch</h2>
                            <p><i className="fa fa-map-marker-alt"></i>Embakasi, Nairobi</p>
                            <p><i className="fa fa-phone-alt"></i>0776661735</p>
                            <p><i className="fa fa-envelope"></i>kadikazi600@gmail.com</p>
                            <div className="footer-social">
                                <a className="btn" href=""><i class="fab fa-twitter"></i></a>
                                <a className="btn" href=""><i class="fab fa-facebook-f"></i></a>
                                <a className="btn" href=""><i class="fab fa-youtube"></i></a>
                                <a className="btn" href=""><i class="fab fa-instagram"></i></a>
                                <a className="btn" href=""><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-link">
                            <h2>Popular Links</h2>
                            <a href="/about">About Us</a>
                            <a href="/contact">Contact Us</a>
                            <a href="/service">Our Service</a>
                           
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-link">
                            <h2>Useful Links</h2>
                            <a href="">Terms of use</a>
                            <a href="">Privacy policy</a>
                            <a href="">Cookies</a>
                            <a href="">Help</a>
                            <a href="">FAQs</a>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
</div>
            )}

export default Service