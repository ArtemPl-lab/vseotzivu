import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { notification } from '../../redux/actions';
import { useAPI } from '../../hooks/api.hook';

const Remove = (props) => {
    const dispatch = useDispatch();
    const { request } = useAPI();
    const [isValid,setValid] = useState(false);
    const [formValues, setFormValues] = useState({
        url: props.match.params.url,
        email: '',
        reason: ''
    });
    const handleChange = event => {
        setFormValues(formValues => ({
            ...formValues,
            [event.target.name]: event.target.value
        })); 
    }
    const validation = async (event) =>{
        event.preventDefault();
        if (event.target.checkValidity() === false) event.stopPropagation();
        else{
            dispatch(notification({isShow: true}));
            const response = await request('/api/posts/remove', 'POST', JSON.stringify(formValues));
            dispatch(notification({
                title: response.type === "success" ? 'Уведомление' : 'Ошибка',
                content: response.message
            }));
        }
        setValid(true);
    }
    return (
        <div className="card h-100">
            <div className="card-header">
                <h2>Удаление записи</h2>
            </div>
            <div className="card-body">
                <form className={`needs-validation ${isValid ? "was-validated" : ""}`} noValidate onSubmit={validation}>
                    <div className="form-group">
                        <label htmlFor="email">Ваш E-mail</label>
                        <input type="text" className="form-control" id="email" name="email" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Некорректный e-mail
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="reason">Причина удаления</label>
                        <textarea type="text" class="form-control" id="reason" name="reason" onChange={handleChange} required style={{ height: "340px" }}/>
                        <div className="invalid-feedback">
                            Обязательное поле
                        </div>
                    </div>
                    <div className="form-group mt-2">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    Я согласен с <a href="/rules">правилами сайта</a>
                                </label>
                                <div className="invalid-feedback">
                                    Вы должны согласиться с условиями, чтобы отправить форму
                                </div>
                            </div>
                        </div>
                    <button type="submit" class="btn btn-danger">Удалить</button>
                </form>
            </div>
        </div>
    )
}

export default Remove
