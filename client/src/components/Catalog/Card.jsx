import React from 'react';

const Card = ({ post }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.slice(0,100)}</p>
                <a href={`/post/${post.url}`} className="btn btn-primary">Подробнее</a>
            </div>
        </div>
    )
}

export default Card;
