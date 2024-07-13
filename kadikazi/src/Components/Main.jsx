import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CCarousel } from '@coreui/react'
import { CCarouselCaption } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { CImage} from '@coreui/react'
import Client from './Client';
import Admin2 from './Admin2';
import Staff from './Staff';
import './homepage.css';
import Sidebar from './Sidebar'

import image1 from './img/carousel-1.jpg';
import image2 from './img/carousel-2.jpg';
import image3 from './img/carousel-3.jpg';
import image4 from './img/carousel-3.jpg';

import image6 from './img/about.jpg';
import image7 from './img/vacuum-cleaner.svg';
import image8 from './img/car-seat.svg';
import image9 from './img/window-wipe.svg';
import image10 from './img/car-wash.svg';
import image11 from './img/car-wash2.svg';
import image12 from './img/engine.svg';
import image13 from './img/car-wash3.svg';
import logo from './Images/Logo.png';

function Main() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`http://localhost:8081/`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setRole(res.data.userType);
                    setUserId(res.data.userId);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
                setMessage("An error occurred while fetching data.");
            });
    }, []);

   

    return (
        <div className='home'>
            {auth ? (
                <div>
                    {role === "admin" && <Admin2 />}
                    {role === "client" && <Client />}
                    {role === "staff" && <Staff />}
                </div>
            ) : (
                <>
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

                    
                        
                            
                            
                          
        <div className="carousel">
            <div className="container-fluid">

        <CCarousel className='owl-carousel' controls transition="crossfade">
        <CCarouselItem className='carousel-item'>
            <CImage className="carousel-img" src={image1} alt="slide 1" />
            <CCarouselCaption className="carousel-text">
      
    
                    <h3 >Washing & Detailing</h3>
                    <h1  >Keep your Car Newer</h1>
                    
                    <a class="btn btn-custom" href="/register"style={{}}>Learn More</a>
                    
    </CCarouselCaption>
  </CCarouselItem>
  <CCarouselItem className='carousel-item'>
            <CImage className="carousel-img" src={image2} alt="slide 2" />
            <CCarouselCaption className="carousel-text">
            <h3 >Washing & Detailing</h3>
                    <h1 >Quality service for you</h1>
                    
                    <a class="btn btn-custom" href="/service"style={{}}>Learn More</a>
                    
    </CCarouselCaption>
  </CCarouselItem>
  <CCarouselItem className='carousel-item'>
            <CImage className="carousel-img" src={image3} alt="slide 3" />
            <CCarouselCaption className="carousel-text">
            <h3 >Washing & Detailing</h3>
                    <h1>Exterior & Interior Washing</h1>
                    
                    <a class="btn btn-custom" href="/service"style={{}}>Learn More</a>
                    
    </CCarouselCaption>
  </CCarouselItem>
</CCarousel>
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

            </div>
            <div class="price">
            <div class="container">
                <div class="section-header text-center">
                    <p style={{color:'white'}}>Washing Plan</p>
                    <h2 style={{color:'white'}}>Choose Your Plan</h2>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="price-item">
                            <div class="price-header">
                                <h3>Basic Cleaning</h3>
                                <h2><span>Kes</span><strong>200</strong><span></span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Seats Washing</li>
                                    <li><i class="far fa-check-circle"></i>Vacuum Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Exterior Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Interior Wet Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Window Wiping</li>
                                    <li><i class="far fa-times-circle"></i>Engine Wash</li>
                                <li><i class="far fa-times-circle"></i>Under Wash</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <a class="btn btn-custom" href="/login">Book Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" style={{color:'202C45'}}>
                        <div class="price-item featured-item">
                            <div class="price-header">
                                <h3>Premium Cleaning</h3>
                                <h2><span>Kes</span><strong>300</strong><span></span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Seats Washing</li>
                                    <li><i class="far fa-check-circle"></i>Vacuum Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Exterior Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Interior Wet Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Window Wiping</li>
                                    <li><i class="far fa-check-circle"></i>Engine Wash</li>
                                <li><i class="far fa-times-circle"></i>Under Wash</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <a class="btn btn-custom" href="/login">Book Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="price-item">
                            <div class="price-header">
                                <h3>Complex Cleaning</h3>
                                <h2><span>Kes</span><strong>400</strong><span></span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Seats Washing</li>
                                    <li><i class="far fa-check-circle"></i>Vacuum Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Exterior Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Interior Wet Cleaning</li>
                                    <li><i class="far fa-check-circle"></i>Window Wiping</li>
                                    <li><i class="far fa-check-circle"></i>Engine Wash</li>
                                <li><i class="far fa-check-circle"></i>Under Wash</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <a class="btn btn-custom" href="/login">Book Now</a>
                            </div>
                        </div>
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

                </>
            )}
        </div>
    );
}

export default Main;
