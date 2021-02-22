import React, { useState } from 'react'
import { useAPI } from '../../hooks/api.hook';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { notification } from '../../redux/actions';
import { Redirect } from 'react-router';
const Auth = () => {
    const dispatch = useDispatch();
    const { request } = useAPI();
    const [isValid,setValid] = useState(false);
    const [cookies, setCookie] = useCookies(['jwt']);
    const [redirect, setRedirect] = useState('');
    console.log(cookies.jwt);
    const [formValues, setFormValues] = useState({
        login: '',
        password: ''
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
            const response = await request('/api/auth/comein', 'POST', JSON.stringify(formValues));
            if(response.type === "error"){
                dispatch(notification({
                    isShow: true,
                    title: 'Ошибка',
                    content: response.message
                }));
            }
            else{
                setCookie('jwt', response.token, { path: '/' });
                setRedirect('/');
            }
            
        }
        setValid(true);
    }
    // if(redirect) return <Redirect to={redirect}/>
    if(cookies.jwt){
        return(
        <div className="card">
            <div className="card-header">
                <h2>Панель администратора</h2>
            </div>
            <div className="card-body">
                <a href="/register" className="btn btn-primary mr-2 mb-2">Зарегистрировать администратора</a>
                <button class="btn btn-danger mb-2" onClick={()=>{console.log(cookies.jwt);setCookie('jwt', '', { path: '/' });console.log(cookies.jwt);}}>Выйти</button>
            </div>
        </div>
        );
    }
    return (
        <div className="card">
            <div className="card-header">
                <h2>Авторизация</h2>
            </div>
            <div className="card-body">
                <form className={`needs-validation ${isValid ? "was-validated" : ""}`} noValidate onSubmit={validation}>
                    <div className="form-group">
                        <label htmlFor="login">Ваш E-mail</label>
                        <input type="email" className="form-control" id="login" name="login" required onChange={handleChange} value={formValues.login} />
                        <div className="invalid-feedback">
                            Некорректный e-mail
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Пароль</label>
                        <input type="password" class="form-control" id="password" name="password" onChange={handleChange} required value={formValues.password} />
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
                    <button type="submit" class="btn btn-primary">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Auth
