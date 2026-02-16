import React from "react";
import { useParams} from "react-router-dom";
import Banner from "../components/Banner/Banner";

const BlogDetailsSpicial = () => {
    const { doctorName } = useParams();
    const displayDoctorName = doctorName === "default" ? "Doctor Name" : doctorName;


    return (
        <>
            <Banner doctorName={displayDoctorName} />
            <div className="doctor-details">
                <h1>Doctor: {decodeURIComponent(doctorName)}</h1>
                
            </div>
        </>
    );
};

export default BlogDetailsSpicial;
