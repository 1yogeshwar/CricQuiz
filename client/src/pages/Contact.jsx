import { useState } from "react";
import "./contact.css";



const Contact = () => {
  // State for contact form data
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;

    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <section className="section-contact">
      <div className="container grid grid-two-cols">
        {/* Contact image */}
        {/* <div className="contact-img">
          <img
            src="/images/support.png"
            alt="We are always ready to help"
            className="contact-image"
          />
        </div> */}

        {/* Contact form */}
        <section className="section-form">
          <div className="contact-content container">
            <h1 className="main-heading">Contact Us</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                autoComplete="off"
                value={contact.username}
                onChange={handleInput}
                required
                className="form-input"
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={contact.email}
                onChange={handleInput}
                required
                className="form-input"
              />
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message"
                value={contact.message}
                onChange={handleInput}
                required
                cols="30"
                rows="6"
                className="form-textarea"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Contact;
