import React, {Component} from 'react';
import classes from './Courses.module.css';

class Courses extends Component {
    shouldComponentUpdate() {
        return true;
    }

    mountComponent = (course,check,index) => {
        return(
            <li className={classes.LI} key={course.id}>
            <div className={check ? classes.ArticlE : classes.Article}>
                <section>
                    <input
                        type="checkbox"
                        checked={check}
                        onChange={() => this.props.click(index)}/>
                </section>
                <section>{course.title}</section>
                <section onClick={() => this.props.remove(course)}>&#x2716;</section>
            </div>
        </li>
        );
    }

    render() {
        const courses = this
            .props
            .courses
            .map((course, index) => {
                let check = false;
                if (course.done || this.props.checkedAll) {
                    check = true;
                }
                if(this.props.show === 'active' && (course.done === false && !this.props.checkedAll)){
                    return this.mountComponent(course,check,index);
                }
                else if(this.props.show === 'completed' && (course.done === true || this.props.checkedAll)){
                    return this.mountComponent(course,check,index);
                }
                else if(this.props.show === 'all') {
                    return this.mountComponent(course,check,index);
                }

                return(null)
            });

        return (
            <div className={classes.Courses}>
                <ul className={classes.UL}>
                    {courses}
                </ul>
            </div>
        );
    }
}

export default Courses;