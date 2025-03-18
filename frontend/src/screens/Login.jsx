import React, { useState } from 'react'

const Login = ({ handleLogin, handleRegister }) => {
    const [toggleLogin, setToggleLogin] = useState(true);

    return (
        <div className="login-screen-main" style={styles.container}>
            {toggleLogin ? 
                <Signin handleLogin={handleLogin} setToggleLogin={setToggleLogin} /> : 
                <Signup setToggleLogin={setToggleLogin} handleRegister={handleRegister} />
            }
        </div>
    )
}

export default Login

const Signin = ({ handleLogin, setToggleLogin }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = (e) => {
        e.preventDefault();
        handleLogin(username, password);
    }

    return (
        <div className="signin-container" style={styles.formContainer}>
            <h2 style={styles.title}>Login</h2>
            <form style={styles.form}>
                <input style={styles.input} type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <div className="buttonGroup" style={styles.buttonGroup}>
                    <button style={styles.button} onClick={(e) => handleSignin(e)}>Login</button>
                    <button style={styles.button} onClick={() => setToggleLogin(false)}>Signup</button>
                </div>
            </form>
        </div>
    )
}

const Signup = ({ setToggleLogin, handleRegister }) => {
    const [role, setRole] = useState('customer')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(username, password, role)
        handleRegister(username, password, role);
    }

    return (
        <div className="signup-container" style={styles.formContainer}>
            <h2 style={styles.title}>Signup</h2>
            <form onSubmit={handleSignup} style={styles.form}>
                <input style={styles.input} type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <select style={styles.select} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                </select>
                <div className="buttonGroup" style={styles.buttonGroup}>
                    <button style={styles.button} type="submit">Signup</button>
                    <button style={styles.button} onClick={() => setToggleLogin(true)}>Login</button>
                </div>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f8ff',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    select: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        backgroundColor: 'white',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    button: {
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
}
