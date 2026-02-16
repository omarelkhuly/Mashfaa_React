import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner/Banner';

const BlogsDetails = () => {
    const { blogType } = useParams();
    const displayBlogType = blogType === 'default' ? 'Default Blog' : blogType;
    return (
        <>
            <Banner blogType={displayBlogType} />
            <div className="blog-details-container">
                <h2>Details for {blogType}</h2>
                <p>تفاصيل إضافية عن {blogType}...</p>
            </div>
        </>
    );
};

export default BlogsDetails;
