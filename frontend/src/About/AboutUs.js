import React from "react";
import "./AboutUs.css";
import images from "../images/about-bg.png";

const AboutUs = (props) => {
  return (
    <div className={`about-us ${props.theme === 'dark' ? 'dark-mode' : ''}`}>
      <section className={`about-us ${props.theme === 'dark' ? 'dark-mode' : ''}`} style={{fontFamily:"'Poppins', sans-serif"}}>
        <div className="about">
        <img src={images} alt="About Us" className="pic" />
          <div className="text">
             <h5 style={{color: `${props.theme === 'dark' ? '#4169E1' : '#333'}`}}> <span>Trinity Retrieve</span></h5>
            <p className="paratext" style={{color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}`}}>For my independent research project, I really wanted to find an everyday issue that could be solved with a more efficient system. Something that everyone goes through is losing something. Whether it is valuable, or just a little thing, it is annoying to lose things. The lost and found system at Trinity is not very organized. Different items are scattered in different places, and people aren't motivated enough to work that hard to find it, especially if it is something that is not extremely valuable. Jackets, airpods, water bottles, all get lost somewhere in the school, waiting to be found. What if there was a better system, both an organized and efficient one? Well, Trinity Retrieve is the digitized version of the lost and found that makes it very easy to access what you want to find. You can put items you lost, see what's currently in the catalog, and officially request to take the item back.  
            </p>
            <div className="data">
            <a href="/items" className="hire">Try It</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
