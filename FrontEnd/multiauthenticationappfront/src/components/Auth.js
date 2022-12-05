import React from 'react'
import { useEffect } from 'react'

const Auth = ({Title}) => {
    useEffect(() => {
        document.title =Title;
    })
  return (
    <div>
        <h1>Authentication</h1>

    <form className="form" autocomplete="off" action="/auth/userPanel" method="POST" >

    <div className="form__icon" aria-hidden="true"></div>

    <h4>Proszę podać kod z emaila lub aplikacji mobilnej</h4>
    <div className="form__input-container">
        <input
            aria-label="Kod"
            className="form__input"
            type="text"
            id="kod"
            placeholder=" "
            name="kod"
            required
        />
        <label className="form__input-label" htmlFor="kod">Kod Dostępu</label>
    </div>

    <h4>Proszę podać odpowiednie litery hasła uwierzytelniającego</h4>
    {/* <p>Numery liter: {{num1}} {{num2}} {{num3}} {{num4}}</p> */}
    <div className="form__input-container">
        <input
            aria-label="Pin"
            className="form__input"
            type="text"
            id="pin"
            placeholder=" "
            name="pin"
            required
        />
        <label className="form__input-label" htmlFor="pin">Litery Hasła</label>
    </div>

    <h4>Odpowiedz na pytanie weryfikujące</h4>
    
       {/* <p> {{Question}} </p> */}
    
    <div className="form__input-container">
        <input
            aria-label="Answer"
            className="form__input"
            type="text"
            id="answer"
            placeholder=" "
            name="answer"
            required
        />
        <label className="form__input-label" htmlFor="answer">Odpowiedź</label>
    </div>
    
    <div className="form__spacer" aria-hidden="true">
    </div>
    <button type="submit" className="form__button">Zaloguj</button>

    

    <div className="alert_container">
        {/* {{#if message }}

            <h4 className="alert_message"> {{message}} </h4>

        {{/if}} */}
    </div> 

    </form>
    </div>
  )
}

export default Auth