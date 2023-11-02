import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      setCommentsList([...commentsList, comment]);
      setComment('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Number 1 Home decor designers Kenya</p>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>WESTLANDS</p>
          <p>WESTLANDS BUSINESS CENTER</p>
          <p>Email: homedecorske@gmail.com</p>
          <p>Phone: +254 700123456</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
            <li><a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
            <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
          </ul>
        </div>
        <div className="col">
          <h4>Managerial Staff</h4>
          <h1>CEO's</h1>
          <p>1. MEDRINE MULINDI</p>
          <p>2. WILLIAM NYONGESA</p>
          <p>3. BELZA ACHIENG</p>
          <p>4. HUMPHREY NJUGUNA</p>
        </div>
        <div className="footer-bottom">
          <h4>Secretary</h4>
          <p>ROBERT NJUNG'E</p>
          <p>© 2023 HOME DECOR LTD</p>
        </div>
      </div>
      <div className="comment-section">
        <h3>Leave a Comment</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={handleInputChange}
            placeholder="Write your comment here"
            rows={4}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <div className="comment-list">
          <h3>Comments</h3>
          {commentsList.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {commentsList.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;