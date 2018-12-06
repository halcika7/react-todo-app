import React from 'react';
import classes from './Add.module.css';

const add = (props) => (
    <div className={classes.Add}>
        <input type="text" name="" id="" 
            onKeyUp={props.click}
            placeholder="Add Course"/>
    </div>
);

export default add;