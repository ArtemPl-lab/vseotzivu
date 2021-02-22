import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentReply, notification } from '../../redux/actions';
import { useAPI } from '../../hooks/api.hook';

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const replay = useSelector(state => state.comments.commentReply);
    const [isValid,setValid] = useState(false);
    const { request } = useAPI();
    const [formValues, setFormValues] = useState({
        name: '',
        content: ''
    });
    const validation = async (event) =>{
        event.preventDefault();
        setValid(true);
        if (event.target.checkValidity() === false) event.stopPropagation();
        else{
            dispatch(notification({isShow: true}));
            const response = await request('/api/posts/add/comment', 'POST', JSON.stringify({ ...formValues, postId: post._id, replay: replay._id}));
            dispatch(notification({
                title: response.type === "success" ? 'Уведомление' : 'Ошибка',
                content: response.message
            }));
            setValid(false);
            setFormValues({
                name: '',
                content: ''
            });
            dispatch(deleteCommentReply());
        }
    }
    const handleChange = event => {
        setFormValues(formValues => ({
            ...formValues,
            [event.target.name]: event.target.value
        })); 
    }
    const closeAlert = event => {
        event.preventDefault();
        dispatch(deleteCommentReply());
    }
    return (
        <div className="card mt-4" name="commentForm">
            <h5 className="card-header">Оставить комментарий</h5>
            <div className="card-body">
            {
                replay && (
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        <strong>Ответ на комментарий: </strong> "{replay.content.slice(0, 20)}..."
                        <button type="button" className="close" onClick={closeAlert}>
                            <span>&times;</span>
                        </button>
                    </div>)
            }
            <form className={`needs-validation ${isValid ? "was-validated" : ""}`} noValidate onSubmit={validation}>
                <div className="form-group">
                    <label htmlFor="name">Ваше имя</label>
                    <input type="text" className="form-control" id="name" name="name" required onChange={ handleChange } value={formValues.name}/>
                    <small id="emailHelp" className="form-text text-muted">Будет отображаться рядом с комментарием</small>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Комментарий</label>
                    <textarea className="form-control" id="content" name="content" required onChange={ handleChange } value={formValues.content}/>
                </div>
                <div className="form-group mt-2">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Я согласен с <a href="/rules">правилами сайта</a>
                        </label>
                        <div className="invalid-feedback">
                            Вы должны согласиться с условиями, чтобы отправить форму
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Отправить</button>
            </form>
            </div>
        </div>
    )
}

export default CommentForm;
