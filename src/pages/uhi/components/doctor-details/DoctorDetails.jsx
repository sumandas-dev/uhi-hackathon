// import logo from './logo.svg';
import React from "react";
import "./style.css";

export function DoctorDetails() {
  return (
    <section className="section-div">
      <div className="doc-image-box">
        <img
          src="/assets/images/placeholder.jpg"
          alt="logo"
          className="doc-img"
        />
      </div>
      <div className="main-div">
        <div className="doc-info">
          <div className="info">
            <h5 className="name">Dr Deep Chowdhury</h5>
            <p className="degree">mbbs, sdv ,dndjc</p>
            <p className="occupation">Cardio</p>
            <p className="email">deeploobo@gmail.com</p>
            <p className="language">Hindi/English/Bengali</p>
            <p className="exp">13 Years of exp</p>
          </div>
        </div>
        <div className="teleconsult">
          <p className="tbox-1">
            <span>156</span> teleconsults
          </p>
          <p className="tbox-2">
            <span>80%</span> on time
          </p>
        </div>
        <div className="pricing">
          <div className="pricing-box">
            <h4>
              <span>900</span> Rs
            </h4>
          </div>
          <div className="image-box">
            <img className="image" src="./practo1.jpg" alt="practo" />
          </div>
        </div>
        <div className="date">
          <input type="date" />
        </div>
        <div className="grid">
          <div className="time-schedule">10:00 a.m</div>
          <div className="time-schedule">10:00 a.m</div>
          <div className="time-schedule">10:00 a.m</div>
          <div className="time-schedule">10:00 a.m</div>
        </div>
        <button className="appointment">Book Appointment</button>
      </div>
    </section>
  );
}
