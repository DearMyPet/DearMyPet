import { useState } from "react";
import menu4 from '../img/menu4.svg';
import ReviewData from "../data/ReviewData";

const Review = () => {
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviews, setReviews] = useState(ReviewData);

  return (
      <div>
        <div className="review">
          <div className="star-rating">
            <span className="star-point">4.8 / 5</span><br/>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                className={`star ${star <= selectedRating ? 'filled' : ''}`}>
                {/* &#9733; */}
                ★
              </span>
            ))}
            <div style={{height:"1px"}}/>
            <span className="review-sub">(12개의 상품평)</span>
          </div>
          
          <div className="bar-graph">
            {[5, 4, 3, 2, 1].map((points) => (
              <div key={points} className="bar-graph-item">
                <div className="bar-graph-fill"></div>
                <span className="rating-points">
                  {points}<span style={{color:"#e94c35"}}>★</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="line2"/>

        {reviews.map((review) => (
          <div>
            <div key={review.id} className="review-item">
              <div className="profile">
                <img
                  src={menu4}
                  alt="Profile"
                  className="profile-image"
                />

                <div className="review-part">
                  <span className="nickname">{review.nickname}</span>
                  <div className="rating"> 
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${star <= review.rating ? 'filled' : ''}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                 
                </div>
                <span className="time">{review.time}</span>
              </div>

              <div style={{textAlign:"left"}}>
                <span className="review-content">{review.content}</span>
              </div>

            </div>
            <div className="line2"/>
          </div>
        ))}
      </div>
  );
};

export default Review;
