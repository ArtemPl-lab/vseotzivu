import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const RecomendedCard = () => {
    const reviews = useSelector(state => state.posts.reviews);
    const complaints = useSelector(state => state.posts.complaints);
    return(
    <div className="col">
        <Card title="Отзывы" posts={reviews.data.slice(-5)}/>
        <Card title="Жалобы" posts={complaints.data.slice(-5)}/>
      </div>
    );
}

export default RecomendedCard;