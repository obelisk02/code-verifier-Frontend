import React from 'react';

import './App.css';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">
     {/*Render login form*/}
     {/* <LoginForm></LoginForm> */}
     <RegisterForm></RegisterForm>
    </div>
  );
}

export default App;
