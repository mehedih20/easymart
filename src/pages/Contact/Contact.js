import React from "react";
import "./Contact.css";
import Title from "../../components/Title/Title";
import contactMap from "../../assets/Contact/contact-map.webp";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <Title text="Contact" />
      <div className="contact-container">
        <div className="contact-map">
          <img src={contactMap} alt="contact-map" />
        </div>
        <div>
          <h2 className="contact-text-title">How can we help you?</h2>
          <div className="contact-text-container">
            <div className="contact-text">
              <h2>Let us know how we can help you</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                harum eius ad sequi similique exercitationem amet minus, id odit
                unde.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                molestiae. Amet, perspiciatis possimus dolorem ex error iure
                facilis sit vel.
              </p>
            </div>
            <div className="contact-text">
              <h3>01. Visit Feedback</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                harum eius ad sequi similique exercitationem amet minus, id odit
                unde.
              </p>
              <h3>03. Billing Inquiries</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                harum eius ad sequi similique exercitationem amet minus, id odit
                unde.
              </p>
            </div>
            <div className="contact-text">
              <h3>02. Employer Services</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                harum eius ad sequi similique exercitationem amet minus, id odit
                unde.
              </p>
              <h3>04.General Inquiries</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                harum eius ad sequi similique exercitationem amet minus, id odit
                unde.
              </p>
            </div>
          </div>
        </div>
        <div className="contact-form-container">
          <h3>Contact Us</h3>
          <h2>Drop Us a Line</h2>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Email" />
            <input type="text" placeholder="Your Phone" />
            <input type="text" placeholder="Subject" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="20"
              placeholder="Message..."
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
