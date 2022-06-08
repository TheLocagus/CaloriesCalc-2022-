import React, {SyntheticEvent, useEffect, useState} from 'react';

export const ChangePassword = () => {

    const [data, setData] = useState({
        password: '',
        repeatedPassword: ''
    });


    const token = localStorage.getItem('token') ?? ''

    if (token.length === 0) {
        window.location.href = "http://localhost:3000/signin";
        return (
            <div>Redirecting to login...</div>
        )
    }


    const changeValue = (key: string, value: any) => {
        setData(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendData = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3002/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: data.password,
                repeatedPassword: data.repeatedPassword,
                token: localStorage.getItem('token')
            })
        })
        const datas = await res.json()

    }

    return (
        <div className="change-password-form-wrapper">
            <h1>Change password</h1>
            <form onSubmit={sendData} className="change-password-form">
                <label>Password
                    <input value={data.password} onChange={e => changeValue('password', e.target.value)}
                           type="password"/>
                </label>
                <label>Repeat password
                    <input value={data.repeatedPassword} onChange={e => changeValue('repeatedPassword', e.target.value)}
                           type="password"/>
                </label>
                <button>Change</button>
            </form>
        </div>
    )
}