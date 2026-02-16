import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import ImgBlogsOne from '../assets/blog1.jpg';
import ImgBlogsTwo from '../assets/blog2.jpg';
import ImgBlogsThree from '../assets/blog3.jpg';

import DoctorBlogsOne from '../assets/doctor2.jpeg';
import DoctorBlogsTwo from '../assets/doctor3.jpeg';
import DoctorBlogsThree from '../assets/doctor4.jpeg';
import DoctorBlogsFour from '../assets/doctor5.jpeg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import "./Blog.css";
import Banner from '../components/Banner/Banner';

const Blogs = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleBlogClick = (blogKey) => {
        navigate(`/BlogsDetails/${blogKey}`);
    };

    const handleDoctorClick = (doctorName) => {
        navigate(`/BlogDetailsSpicial/${doctorName}`);
    };

    const blogs = [
        {
            img: ImgBlogsOne,
            doctorImg: DoctorBlogsOne,
            doctorName: "John Deo",
            date: "21 July 2021",
            titleKey: "blogTitle1",
            blogKey: "Dental Care"
        },
        {
            img: ImgBlogsTwo,
            doctorImg: DoctorBlogsTwo,
            doctorName: "Peter Packer",
            date: "20 July 2021",
            titleKey: "blogTitle2",
            blogKey: "Special Surgeon"
        },
        {
            img: ImgBlogsThree,
            doctorImg: DoctorBlogsThree,
            doctorName: "Sonar Moyna",
            date: "19 July 2021",
            titleKey: "blogTitle3",
            blogKey: "Skin Surgeon"
        },
        {
            img: ImgBlogsTwo,
            doctorImg: DoctorBlogsFour,
            doctorName: "Kalina",
            date: "18 July 2021",
            titleKey: "blogTitle4",
            blogKey: "Understand Health"
        }
    ];

    return (
        <>
            <Banner />

            <section className="section-area section-sp1">
                <div className="container">
                    <div className="row">

                        {blogs.map((blog, index) => (
                            <div className="col-xl-4 col-md-6" key={index}>
                                <div className="blog-card blog_card mb-30">

                                    <div className="post-media post_media">
                                        <img
                                            src={blog.img}
                                            alt="blog"
                                            onClick={() => handleBlogClick(blog.blogKey)}
                                        />
                                    </div>

                                    <div className="post-info post_info">
                                        <ul className="post-meta post_meta">
                                            <li className="author nameDoctor">
                                                <img
                                                    src={blog.doctorImg}
                                                    alt={blog.doctorName}
                                                    onClick={() => handleDoctorClick(blog.doctorName)}
                                                />
                                                <span onClick={() => handleDoctorClick(blog.doctorName)}>
                                                    {blog.doctorName}
                                                </span>
                                            </li>

                                            <li className="date">
                                                <FontAwesomeIcon icon={faCalendarAlt} /> {blog.date}
                                            </li>
                                        </ul>

                                        <h4
                                            className="post-title post_title"
                                            onClick={() => handleBlogClick(blog.blogKey)}
                                        >
                                            {t(blog.titleKey)}
                                        </h4>

                                        <button
                                            className="btn outline_primary btn-sm"
                                            onClick={() => handleBlogClick(blog.blogKey)}
                                        >
                                            {t("readMore")}
                                            <FontAwesomeIcon className="btn-icon-bx" icon={faChevronRight} />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
};

export default Blogs;