import React, { Suspense, useEffect, useState } from 'react';
import './Application.scss';
import { icons } from './Icons';


import(/* webpackChunkName: 'mychunk', webpackPrefetch: true */ './Demo')

const Demo = React.lazy(() => import(/* webpackChunkName: 'mychunk', webpackPreload: true*/ './Demo'));

const Application: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);

  /**
   * On component mount
   */
  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }
  }, []);

  /**
   * On Dark theme change
   */
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  /**
   * Toggle Theme
   */
  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <div id='erwt'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>React Webpack Typescript</h1>
        </div>
        <div className='main-teaser'>
          <div>
            Robust boilerplate for Desktop Applications with Electron and
            ReactJS. Hot Reloading is used in this project for fast development
            experience.
            <br />
            If you think the project is useful enough, just spread the word
            around!
          </div>
        </div>
        <div className='versions'>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.erwt} /> ERWT
            </div>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.typescript} /> Typescript
            </div>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.react} /> React
            </div>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.webpack} /> Webpack
            </div>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.chrome} /> Chrome
            </div>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.license} /> License
            </div>
          </div>
        </div>
      </div>

      <div className='footer'>
        <div className='center'>
          <button
            onClick={() => {
              if (counter > 99) return alert('Going too high!!');
              setCounter(counter + 1);
            }}
          >
            Increment {counter != 0 ? counter : ''} <span>{counter}</span>
          </button>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            onClick={() => {
              if (counter == 0) return alert('Oops.. thats not possible!');
              setCounter(counter > 0 ? counter - 1 : 0);
            }}
          >
            Decrement <span>{counter}</span>
          </button>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button onClick={toggleTheme}>
            {darkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </div>

      <Suspense fallback={null}>
        <Demo />
      </Suspense>
    </div>
  );
};

export default Application;
