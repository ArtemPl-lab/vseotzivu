import React, { useState } from 'react'
import { useAPI } from '../../hooks/api.hook';
import {Redirect} from 'react-router';
import { useCookies } from 'react-cookie';
const Register = (props) => {
    const { request } = useAPI();
    const [isValid,setValid] = useState(false);
    const [ redirect, setRedirect ] = useState('');
    const [cookies, setCookie] = useCookies(['jwt']);
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
            await request('/api/auth/register', 'POST', JSON.stringify(formValues));
            setRedirect('/admin');
        }
        setValid(true);
    }
    if(!Boolean(cookies.jwt)) return <Redirect to="/"/>
    if(redirect) return <Redirect to="/admin"/>
    return (
        <div className="card">
            <div className="card-header">
                <h2>Регистрация нового администратора</h2>
            </div>
            <div className="card-body">
                <form className={`needs-validation ${isValid ? "was-validated" : ""}`} noValidate onSubmit={validation}>
                    <div className="form-group">
                        <label htmlFor="login">E-mail</label>
                        <input type="email" className="form-control" id="login" name="login" required onChange={handleChange} value={formValues.login} />
                        <div className="invalid-feedback">
                            Некорректный e-mail
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Придумайте пароль</label>
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
                    <button type="submit" class="btn btn-primary">Зарегистрировать</button>
                </form>
            </div>
        </div>
    )
}

export default Register
