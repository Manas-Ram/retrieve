import React, { useEffect, useRef, useMemo } from 'react';
import './home.css';
import image from './home1.png';
import { Button } from '@mui/material';

import { NavLink } from 'react-router-dom';

const HomePage = (props) => {


  const [text, setText] = React.useState('Find what you lost');
  const taglineArr = useMemo(() => ['Lost something?', 'Retrieve it here.'], []);

  const iRef = useRef(0);

  useEffect(() => {
    document.body.style.background = (props.theme === 'dark' ? '#333' : '#f5f5f5');
    const intervalId = setInterval(() => {
      setText(taglineArr[iRef.current]);
      iRef.current = (iRef.current + 1) % taglineArr.length;
    }, 2500);

    return () => {
      document.body.style.background = null;
      clearInterval(intervalId);
    };
  }, [taglineArr, props.theme]);



  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="container-fluid">
          <div className="row" style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}` }}>
            <div className="col-md-5 ps-5">
              <h1 className="display-3 pt-5 mt-5 ps-5"><span style={{ color: "#9C27B0" }}>Trinity Retrieve </span></h1>
              <p className="ps-5 respo changing-text" style={{ fontSize: "1.7rem", fontWeight: "bold", marginLeft: "80px" }}>{text} </p>
              <p className="ps-5 mt-3" style={{ fontSize: "1rem" }}>Add a lost item to list, or find an item already on the list. </p>
              <div className="d-flex justify-content-center">
                {/* Use the same className for both buttons */}
                <NavLink to="/about" style={{ textDecoration: 'none' }}>
                  <Button
                    className="sign-out-button" // Use the same class name as the "Sign Out" button
                    variant="contained"
                    color="secondary"
                    style={{
                      textTransform: "none",
                      borderRadius: "20px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.1rem"
                    }}
                  >
                    About The Project
                  </Button>
                </NavLink>

              </div>
            </div>
            <div className="col-md-7 pt-5 d-flex flex-column align-items-center">
              <img className="img-fluid" style={{ width: "75%" }} src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
