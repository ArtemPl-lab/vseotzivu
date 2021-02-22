import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { notification } from '../../redux/actions';
import { useAPI } from '../../hooks/api.hook';

const UniversalForm = () => {
    const dispatch = useDispatch();
    const { request } = useAPI();
    const [isValid,setValid] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        content: '',
        organisation: '',
        address: '',
        email: '',
        phone: '',
        site: '',
        tags: '',
    });
    const [popoversTags, setPopoversTags] = useState([]);
    const validation = async (event) =>{
        event.preventDefault();
        if (event.target.checkValidity() === false) event.stopPropagation();
        else{
            dispatch(notification({isShow: true}));
            const response = await request('/api/posts/create', 'POST', JSON.stringify(formValues));
            dispatch(notification({
                title: response.type === "success" ? 'Уведомление' : 'Ошибка',
                content: response.message
            }));
        }
        setValid(true);
    }
    const handleChange = event => {
        setFormValues(formValues => ({
            ...formValues,
            [event.target.name]: event.target.value
        })); 
    }
    const handleTagChange = async event => {
        setFormValues(formValues => ({
            ...formValues,
            [event.target.name]: event.target.value
        }));
        const Tags = event.target.value.trim().split(',')
        const pop = await request(
            '/api/posts/get/tags',
            'POST', 
            JSON.stringify(
                {
                    search: Tags[Tags.length - 1].trim()
                }
            )
        );
        console.log(pop);
        setPopoversTags(pop);
    }
    const setTagsVal = event => {
        event.preventDefault();
        setFormValues(formValues => {
            let tgs = formValues.tags.trim().split(',');
            tgs = tgs.map(tag => tag.trim());
            tgs[tgs.length - 1] = event.target.outerText + ', ';
            setPopoversTags([]);
            return{
                ...formValues,
                tags:  tgs.join(', ')
            }
        });
        console.log({event: event.target.outerText});
    }
    return(
        <div className="card h-100" onClick={()=>setPopoversTags([])}>
            <div className="card-header">
                <h2>Добавить жалобу или отзыв</h2>
            </div>
            <div className="card-body">
                <form className={`needs-validation ${isValid ? "was-validated" : ""}`} noValidate onSubmit={validation}>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="title">Тема</label>
                        <input type="text" className="form-control" id="title" name="title" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Это обязательное поле
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="content">Жалоба, отзыв</label>
                        <textarea type="text" className="form-control" id="content" name="content" required onChange={handleChange}></textarea>
                        <div className="invalid-feedback">
                            Это обязательное поле
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="organisation">Организация</label>
                        <input type="text" className="form-control" id="organisation" name="organisation" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Это обязательное поле
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="address">Адрес</label>
                        <input type="text" className="form-control" id="address" name="address" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Это обязательное поле
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" className="form-control" id="email" name="email" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Некорректный e-mail
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="phone">Телефон</label>
                        <input type="text" className="form-control" id="phone" name="phone" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Обязательное поле
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="site">Сайт</label>
                        <input type="text" className="form-control" id="site" name="site" required onChange={handleChange}/>
                        <div className="invalid-feedback">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="tags">Теги</label>
                        <input type="text" className="form-control" id="tags" name="tags" required onChange={handleTagChange} autoComplete="off" value={formValues.tags} placeholder="Обман, мошенник, жалоба"/>
                        <div class={`dropdown-menu ${popoversTags.length ? 'show' : ''}`}>
                            {popoversTags.map(popover => <a class="dropdown-item" href="#" onClick={setTagsVal}>{popover.tag}</a>)}
                        </div>
                        <div className="invalid-feedback">
                            Укажите ключевые слова, чтобы пользователям было проще найти ваш пост
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="category">Категория</label>
                        <select className="custom-select" id="category" name="category" required onChange={handleChange}>
                            <option selected disabled value="">Выбрать...</option>
                            <option>Жалоба</option>
                            <option>Отзыв</option>
                        </select>
                        <div className="invalid-feedback">
                            Выберите категорию
                        </div>
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
                <button type="submit" className="btn btn-primary mt-2">Отправить</button>
            </form>
            </div>
        </div>
    );
}


export default UniversalForm;