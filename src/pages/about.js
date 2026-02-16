import React from 'react';
import AboutUs from '../components/AboutUs/AboutUs';
import './about.css';
import DoctorTeam from "../components/DoctorTeam/DoctorTeam";
import Ratings from '../components/Ratings/Ratings';
import Banner from '../components/Banner/Banner';
import Testimonial from '../components/Testimonial/Testimonial';
const About = () => {
    return (
        <>
        <Banner />
        <AboutUs/>
        <Ratings/>
        <DoctorTeam/>
        <Testimonial/>
        </>
    );
}

export default About;