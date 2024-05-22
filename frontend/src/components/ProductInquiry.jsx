import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductInquiry = ({ id }) => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);

    const togglePostContent = (postId) => {
        setExpandedPostId((prevId) => (prevId === postId ? null : postId));
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/inquirys/${id}`)
        .then(response => {
            if (Array.isArray(response.data)) {
                setPosts(response.data);
            } else {
                setPosts([]); 
            }
        })
        .catch(error => {
            console.log("문의가 없습니다.");
            // setPosts([]);
        })
    }, []);

    return(
        <div className="inquiry">
            <button className="btn-inquiry" onClick={()=>{navigate(`/inquiry/${id}`)}}>문의하기</button>

            { posts.length === 0? <div style={{color: "#545454"}}>문의가 없습니다.</div> : <div className="line2"/>}

            <div className="post-list">
                {
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className={`post-item ${expandedPostId === post.id ? "expanded" : ""}`}
                            onClick={() => togglePostContent(post.id)}
                        >
                            <div className="post-header">
                                <span className="status">
                                    {post.answer?
                                        <div style={{color: "#377CE6"}}>답변 완료</div> : <div style={{color: "#E94C35"}}>답변 대기</div>
                                    }
                                </span>
                                <div>
                                    <span>상품 관련 문의 입니다.</span>
                                    <span className="post-date">{new Date(post.created_at).toISOString().split('T')[0]}</span>
                                    
                                    <div className="post-part">
                                        <span className="delivery-status">{post.tag}</span>
                                    </div>
                                </div>
                            </div>

                            {expandedPostId === post.id && (
                                <div className="post-toggle">
                                    <span className="post-title">Q. {post.content}</span>
                                    <div className="line3"/>
                                    { post.answer? <div>A. {post.answer}</div> : null }
                                </div>
                            )}

                            {expandedPostId !== post.id && <div className="line2" />}
                        </div>
                    ))}
            </div>

        </div>
    );
}

export default ProductInquiry;