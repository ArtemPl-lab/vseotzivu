import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { commentReply } from '../../redux/actions';
import { Link } from 'react-scroll';
import { useCookies } from 'react-cookie';
import { useAPI } from '../../hooks/api.hook';

const Card = ({ comment }) => {
    const [cookies, setCookie] = useCookies(['jwt']);
    const [contentEditable, setContentEditable] = useState(false);
    const { request } = useAPI();
    const dispatch = useDispatch();
    const setReply = event => {
        dispatch(commentReply(comment));
    }
    const saveComment = async event => {
        comment.content = event.target.value;
        await request( '/api/posts/edit/comment', 'POST', JSON.stringify(comment) );
        setContentEditable(false);
    }
    if(cookies.jwt && contentEditable) return(
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{comment.name}</h5>
                <textarea onBlur={saveComment} className="w-100" autoFocus>{comment.content}</textarea>
            </div>
        </div>
    );
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{comment.name}</h5>
                <p className="card-text" onClick={()=>setContentEditable(true)}>{comment.content}</p>
                <Link className="card-link" to="commentForm" spy={true} smooth={true} offset={-20} duration={500} onClick={setReply} style={{ cursor: "pointer" }}>
                    Ответить
                </Link>
            </div>
        </div>
    )
}

export default Card;
