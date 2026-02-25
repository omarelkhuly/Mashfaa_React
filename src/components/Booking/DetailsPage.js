// src/components/Booking/DetailsPage.js
import React from "react";
import { useLocation } from "react-router-dom";
import Banner from "../Banner/Banner";
import "./Appointment.css";

const Details = () => {
  const location = useLocation();
  const { department, doctor, name, phone, date, country, city } = location.state || {};

  return (
    <>
      <Banner />
      <section className="details-section">
        <div className="container">
          <h2 className="text-center mb-4">Appointment Details</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Country</th>
                  <td>{country || "N/A"}</td>
                </tr>

                <tr>
                  <th scope="row">City</th>
                  <td>{city || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Department</th>
                  <td>{department || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Doctor</th>
                  <td>{doctor || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Name</th>
                  <td>{name || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>{phone || "N/A"}</td>
                </tr>
                <tr>
                  <th scope="row">Appointment Date</th>
                  <td>{date || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
