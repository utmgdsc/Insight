import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiList from "../lib/apiList";
import "../job-connect.css";

// Importing the SVG icon (ensure you have this file in your assets directory)
import ProfileIcon from '../images/profile4.svg';

const Navbar = () => {
  const [type, setType] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const getData = () => {
      axios
        .get(apiList.user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setId(response.data._id);
        })
        .catch((err) => {
          console.log(err.response?.data);
        });
    };

    getData();
    setType(localStorage.getItem("type"));
  }, [type, id]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            JobConnect
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {type && (
                <li className="nav-item">
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                </li>
              )}
              {type && (
                <li className="nav-item">
                  <Link to="/assets" className="nav-link">
                    Assets
                  </Link>
                </li>
              )}
              {type && (
                <li className="nav-item">
                  <Link to="/events" className="nav-link">
                    Events
                  </Link>
                </li>
              )}
              {type && type === "applicant" && (
                <li className="nav-item">
                  <Link to={`/applicant-dashboard/${id}`} className="nav-link">
                    Dashboard
                  </Link>
                </li>
              )}
              {type && type === "employer" && (
                <li className="nav-item">
                  <Link to={`/employer-dashboard/${id}`} className="nav-link">
                    Dashboard
                  </Link>
                </li>
              )}
              {type && type === "employer" && (
                <li className="nav-item">
                  <Link to={`/manage-postings/${id}`} className="nav-link">
                    Manage Postings
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <a href="/#questions" className="nav-link">
                  FAQ
                </a>
              </li>
              {!type && (
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              )}
              {!type && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
              {type && (
                <li className="nav-item">
                  <Link to={type === "employer" ? `/employer/${id}` : `/user/${id}`} className="nav-link">
                    <img src={ProfileIcon} alt="Settings" className="icon-custom-size" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
