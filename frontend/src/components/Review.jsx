import { useEffect, useState } from "react";
import menu4 from '../img/menu4.svg';
import axios from "axios";

const Review = ({ id }) => {
  // const [selectedRating, setSelectedRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  const getNickname = async (userId) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
    return response.data.nickname;
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/reviews/${id}`);
        const reviewsWithNickname = await Promise.all(response.data.map(async review => {
          const nickname = await getNickname(review.user);
          return {
            ...review,
            nickname
          };
        }));
        setReviews(reviewsWithNickname);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("후기가 없습니다.");
        }
      }
    }
    fetchReviews();
  }, []);

  // 평균 점수 계산
  const averageRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0) / reviews.length;

  // 각 점수별 리뷰 개수 계산
  const ratingsCount = {};
  reviews.forEach(review => {
    const roundedRating = Math.round(review.rating);
    ratingsCount[roundedRating] = (ratingsCount[roundedRating] || 0) + 1;
});

  const totalReviews = reviews.length;
  const ratingPercentages = {};

  for (let i = 1; i <= 5; i++) {
      ratingPercentages[i] = (ratingsCount[i] || 0) / totalReviews;
  }

  return (
      <div>
        <div className="review">
          <div className="star-rating">
            <span className="star-point">{averageRating? averageRating.toFixed(1) : 0} / 5</span><br/> 
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                className={`star ${star <= Math.floor(averageRating) ? 'filled' : ''}`}>
                {/* &#9733; */}
                ★
              </span>
            ))}
            <div style={{height:"1px"}}/>
            <span className="review-sub">({reviews.length}개의 상품평)</span>
          </div>
          
          <div className="bar-graph">
            {[5, 4, 3, 2, 1].map((points) => (
              <div key={points} className="bar-graph-item">
                <div className="bar-graph-fill">
                  <div style={{
                    position: "absolute",
                    bottom: "0",
                    width: "10px",
                    height: `${ratingPercentages[points] * 80}px`,
                    backgroundColor: "#e94c35"
                  }}/>
                </div>
                <span className="rating-points">
                  {points}<span style={{color:"#e94c35"}}>★</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="line2"/>

        {reviews && reviews.map((review) => (
          <div key={review.id}>
            <div className="review-item">
              <div className="profile">
                <img
                  src={menu4}
                  alt="Profile"
                  className="profile-image"
                />

                <div className="review-part">
                  <span className="nickname">{review.nickname}</span>
                  <span className="review-time">{new Date(review.created_at).toISOString().split('T')[0]}</span>
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
        {
          reviews.length === 0?
            <div style={{color: "#545454"}}>후기가 없습니다.</div> : null
        }
      </div>
  );
};

export default Review;
