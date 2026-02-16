import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner/Banner';

const ServicesDetails = () => {
    const { serviceType } = useParams();

    // معالجة القيم الافتراضية
    const displayServiceType = serviceType === 'default' ? 'Default Service' : serviceType;

    return (
        <>
            <Banner serviceType={displayServiceType} />
            <div className="service-details-container">
                <h2>Details for {displayServiceType}</h2>
                <p>تفاصيل إضافية عن {displayServiceType}...</p>
            </div>
        </>
    );
}

export default ServicesDetails;
