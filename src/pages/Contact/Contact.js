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
                At EasyMart, we're dedicated to providing exceptional customer
                support and ensuring your satisfaction. If you have any
                questions, need assistance with an order, or simply want to
                share your thoughts, our team is here to assist you.
                <br />
                We value your input and aim to make every interaction as smooth
                as possible. Let us know how we can assist you, and we'll do our
                best to make your experience with EasyMart a positive one.
              </p>
            </div>
            <div className="contact-text">
              <h3>01. Visit Feedback</h3>
              <p>
                We value your opinion and want to hear about your experience.
                Your feedback helps us improve our services and ensures we
                provide the best shopping experience. Whether it's praise or
                constructive criticism, we appreciate your insights.
              </p>
              <h3>03. Billing Inquiries</h3>
              <p>
                If you have any questions or concerns about your billing or
                payments, our support team is here to assist. We can help
                clarify charges, resolve disputes, and ensure your billing
                experience is smooth and transparent.
              </p>
            </div>
            <div className="contact-text">
              <h3>02. Employer Services</h3>
              <p>
                We offer tailored services for employers looking to partner with
                us. From bulk purchasing to corporate discounts, our employer
                services are designed to meet the unique needs of businesses.
                Contact us to explore how we can support your organization.
              </p>
              <h3>04.General Inquiries</h3>
              <p>
                For any other questions or general information about EasyMart,
                our customer service team is ready to help. Whether you’re
                curious about our products, policies, or just need assistance,
                we're here to provide the answers you need.
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
