import { useState } from "react";
import Post from "../data/Post";

const ProductInquiry = () => {
    const [posts, setPosts] = useState(Post);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const togglePostContent = (postId) => {
        setExpandedPostId((prevId) => (prevId === postId ? null : postId));
    };

    return(
        <div className="inquiry">
            <button className="btn-inquiry">문의하기</button>
            <div className="line2"/>
            <div className="post-list">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className={`post-item ${expandedPostId === post.id ? "expanded" : ""}`}
                        onClick={() => togglePostContent(post.id)}
                    >
                        <div className="post-header">
                            <span className="status">{post.status}</span>
                            <div>
                                <span>상품 관련 문의 입니다.</span>
                                <span className="post-date">{post.date}</span>
                                
                                <div className="post-part">
                                    <span className="delivery-status">{post.deliveryStatus}</span>
                                    <span className="post-nickname">{post.nickname}</span>
                                </div>
                            </div>
                        </div>

                        {expandedPostId === post.id && (
                            <div className="post-toggle">
                                <span className="post-title">Q. {post.question}</span>
                                <div className="line3"/>
                                <div className="post-content">A. {post.answer}</div>
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