import React from 'react'
import { useEffect } from 'react'

const UserPanel = ({Title}) => {
    useEffect(() => {
        document.title =Title;
    })
  return (
    <div>
        <div className="h">
        <h1>Panel Użytkownika</h1>
        </div>

    <div className="user-panel">
        <h4>Witaj</h4>
        {/* <p> {{userName}} </p>
        <p> {{email}}</p> */}
        
        <input type="button" className="form__button" value="Zmień Nazwę użytkownika" id="buttonChangeUsername"/>

        <center>
        <form  id="form" className="form" autocomplete="off" action="/auth/userPanel/changeUsername" method="POST" >
            
            <div  className="form__input-container">
                <input
                    aria-label="old_username"
                    className="form__input"
                    type="text"
                    id="old_user"
                    placeholder=" "
                    name="old_username"
                    required
                />
                <label className="form__input-label" htmlhtmlFor="old_username">Obecna Nazwa</label>
            </div>

            <div className="form__input-container">
                <input
                    aria-label="new_username"
                    className="form__input"
                    type="text"
                    id="new_user"
                    placeholder=" "
                    name="new_username"
                    required
                />
                <label className="form__input-label" htmlFor="new_username">Nowa Nazwa</label>
            </div>

            <div className="form__input-container">
                <input
                    aria-label="text"
                    className="form__input"
                    type="text"
                    id="new_username_confirm"
                    placeholder=" "
                    name="new_username_confirm"
                    required
                />
                <label className="form__input-label" htmlFor="new_username_confirm">Powtórz Nową Nazwę</label>
            </div>
            <div className="form__spacer" aria-hidden="true">
            </div>
            <button type="submit" className="form__button" id="buttonSubmit1" >Potwierdź</button>

        </form>
        </center>

        <input type="button" className="form__button" value="Zmień Hasło" id="buttonChangePassword"/>
        <center>
        <form  id="form2" className="form" autocomplete="off" action="/auth/userPanel/changePassword" method="POST" >
            
            <div  className="form__input-container">
                <input
                    aria-label="old_password"
                    className="form__input"
                    type="password"
                    id="old_password"
                    placeholder=" "
                    name="old_password"
                    required
                />
                <label className="form__input-label" htmlFor="old_password">Obecne Hasło</label>
            </div>

            <div className="form__input-container">
                <input
                    aria-label="new_password"
                    className="form__input"
                    type="password"
                    id="new_password"
                    placeholder=" "
                    name="new_password"
                    required
                />
                <label className="form__input-label" htmlFor="new_password">Nowe Hasło</label>
            </div>

            <div className="form__input-container">
                <input
                    aria-label="Password"
                    className="form__input"
                    type="password"
                    id="password"
                    placeholder=" "
                    name="new_password_confirm"
                    required
                />
                <label className="form__input-label" htmlFor="password">Powtórz Nowe Hasło</label>
            </div>
            <div className="form__spacer" aria-hidden="true">
            </div>
            <button type="submit" className="form__button" id="buttonSubmit2" >Potwierdź</button>

        </form>
        </center>

        <input type="button" className="form__button" value="Zmień Email" id="buttonChangeEmail"/>
        <center>
        <form  id="form3" className="form" autocomplete="off" action="/auth/userPanel/changeEmail" method="POST" >
            
            <div  className="form__input-container">
                <input
                    aria-label="old_email"
                    className="form__input"
                    type="email"
                    id="old_email"
                    placeholder=" "
                    name="old_email"
                    required
                />
                <label className="form__input-label" htmlFor="old_email">Obecny Email</label>
            </div>

            <div className="form__input-container">
                <input
                    aria-label="new_email"
                    className="form__input"
                    type="email"
                    id="user"
                    placeholder=" "
                    name="new_email"
                    required
                />
                <label className="form__input-label" htmlFor="new_email">Nowy Email</label>
            </div>

            <div className="form__input-container">
                <input
                    aria-label="new_email_confirm"
                    className="form__input"
                    type="email"
                    id="new_email_confirm"
                    placeholder=" "
                    name="new_email_confirm"
                    required
                />
                <label className="form__input-label" htmlFor="new_email_confirm">Powtórz Nowy Email</label>
            </div>
            <div className="form__spacer" aria-hidden="true">
            </div>
            <button type="submit" className="form__button" id="buttonSubmit3" >Potwierdź</button>
        

        </form>
        </center>

        <div className="alert_container">
                {/* {{#if message }}
        
                    <h4 className="alert_message"> {{message}} </h4>
        
                {{/if}} */}
        </div>

        <div className="form__spacer" aria-hidden="true"></div>
        <a className="form__button" href="/logout">Wyloguj</a>

    </div>

    <script src="/open_form_on_button_click.js"></script>
    </div>
  )
}

export default UserPanel