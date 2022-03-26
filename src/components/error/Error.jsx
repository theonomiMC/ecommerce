import React from 'react';
import classes from './error.module.scss';

class Error extends React.Component{
    render() {
        return (
            <div className={classes.error}>
               <h1>404</h1>
               <p>Please try again laiter!</p>
            </div>
        )
    }
}

export default Error