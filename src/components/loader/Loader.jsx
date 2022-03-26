import React from 'react';
import classes from './loader.module.scss';

class Loader extends React.Component{
    render() {
        return (
            <div className={classes.loader}>
                <div className={`${classes.line} ${classes.line1}`}></div>
                <div className={`${classes.line} ${classes.line2}`}></div>
                <div className={`${classes.line} ${classes.line3}`}></div>
            </div>
        )
    }
}

export default Loader