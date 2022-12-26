import React from 'react'
import { AppRouter } from './router';
import { AppTheme } from './theme';
import './index.css'

const App = () => {
    return (
      <AppTheme>
        <AppRouter />
      </AppTheme>
    )
}

export default App;