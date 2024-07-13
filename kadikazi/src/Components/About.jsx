import React from 'react'
import './homepage.css';
import image6 from './img/about.jpg';
import logo from './Images/Logo.png';
import image4 from './img/carousel-3.jpg';
const About = () => {
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
                <h2>About</h2>
            </div>
            <div className="col-12">
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
        </div>
    </div>
</div> 
<div class="about">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="about-img">
                            <img src={image6} alt="Image"/>
                        </div>
                    </div>
                    <div class="col-lg-6">
                    
                        <div class="section-header text-left">
                        <p>About Us</p>
                            <h2 style={{color:'white'}}>car washing and detailing</h2>
                        </div>
                        <div class="about-content">
                            <p>
                                We are a car wash and detailing company located in Embakasi Nairobi. We offer the best service to our consumers. For to us, our customers come first. We have state of the art equipment which ensures that you as a customer get the very best. Need a wash? Come to our car wash today.
                            </p>
                            <ul>
                                <li><i class="far fa-check-circle"></i>Seats washing</li>
                                <li><i class="far fa-check-circle"></i>Vacuum cleaning</li>
                                <li><i class="far fa-check-circle"></i>Exterior wet cleaning</li>
                                <li><i class="far fa-check-circle"></i>Interior wet cleaning</li>
                                <li><i class="far fa-check-circle"></i>Window wiping</li>
                                <li><i class="far fa-check-circle"></i>Engine Wash</li>
                                <li><i class="far fa-check-circle"></i>Under Wash</li>
                            </ul>
                            <a class="btn btn-custom" href="/about">Learn More</a>
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
 

export default About