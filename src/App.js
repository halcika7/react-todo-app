import React, {Component} from 'react';
import classes from './App.module.css';
import Courses from './components/Courses/Courses';
import Add from './components/Add/Add';
import logo from './logo.svg';

class App extends Component {
    state = {
        courses: [],
        leftCourses: 0,
        checkedAll: false,
        show: 'all'
    }

    addCourse = (event) => {
        const coursses = [...this.state.courses];
        const newCourse = event.target.value;
        if (event.key === "Enter" && event.target.value.length > 2) {
            const courseId = Math.random() * Date.now();
            coursses.push({
                id: courseId,
                title: newCourse,
                done: false
            });

            this.setState({
                courses: coursses,
                checkedAll:false
            }, () => {
                this.unfinishedCourses();
                this.changeShow('all');
            });
            event.target.value = '';

        }
    }

    // sidojasidjosa

    unfinishedCourses = () => {
        let courses = [...this.state.courses];
        let left = 0;
        if (this.state.checkedAll) {
            this.setState({leftCourses: left});
            return;
        }
        courses.forEach(item => {
            if (item.done === false) {
                left++;
            }
        });

        this.setState({leftCourses: left});
    }

    changeChecked = (index) => {
        const courses = [...this.state.courses];
        courses[index].done = !courses[index].done;
        if (courses[index].done === false) {
            return this.setState({
                courses: courses,
                checkedAll: false
            }, () => this.unfinishedCourses());
        }

        this.setState({
            courses: courses
        }, () => this.unfinishedCourses());
    }

    checkAll = () => {
        const courses = [...this.state.courses];
        if (courses.length !== 0) {
            if (this.state.checkedAll === false) {
                courses.map(course => {
                    return course.done = true;
                });

                this.setState({
                    courses: courses,
                    checkedAll: true
                }, () => this.unfinishedCourses());
            }else{
                courses.map(course => {
                    return course.done = false;
                });

                this.setState({
                    courses: courses,
                    checkedAll: false
                }, () => this.unfinishedCourses());
            }
        }
    }

    clearCoursesCompleted = () => {
        const courses = [...this.state.courses];
        let newCourses = [];
        courses.map(course => {
            if(course.done !== true){
                return newCourses.push(course);
            }
            return null;
        });

        this.setState({
            courses: newCourses,
            show: 'all',
            checkedAll: false
        }, () => this.unfinishedCourses());
    }

    changeShow = (show) => {
        this.setState({show: show});
    }

    removeCourse = (id) => {
        
        const index = this
            .state
            .courses
            .findIndex(course => course.id === id);
        const courses = [...this.state.courses];
        courses.splice(index, 1);
        this.setState({
            courses: courses
        }, () => {
            this.unfinishedCourses();
            if (this.state.courses.length === 0) {
                this.setState({checkedAll: false});
            }
        });
    }

    render() {
        return (
            <div className={classes.App}>
                <h1>React To-Do App
                    <img src={logo} alt="Logo"/></h1>

                <Add click={(event) => this.addCourse(event)}/>

                <Courses
                    courses={this.state.courses}
                    show={this.state.show}
                    remove={this.removeCourse}
                    checkedAll={this.state.checkedAll}
                    click={this.changeChecked}/>

                <div className={classes.CheckAll}>
                    <section>
                        <input
                            type="checkbox"
                            checked={this.state.checkedAll}
                            onChange={this.checkAll}/>
                        <label>Check All</label>
                    </section>
                    <section>{this.state.leftCourses}
                        items left</section>
                </div>
                <div className={classes.Buttons}>
                    <section>
                        <button
                            className={classes.Button + ' ' + classes.All}
                            onClick={() => this.changeShow('all')}>All</button>

                        <button
                            className={classes.Button + ' ' + classes.Active}
                            onClick={() => this.changeShow('active')}>Active</button>

                        <button
                            className={classes.Button + ' ' + classes.Completed}
                            onClick={() => this.changeShow('completed')}>Completed</button>
                    </section>
                    <section>
                        <button
                            className={classes.Button + ' ' + classes.Clear}
                            onClick={this.clearCoursesCompleted}>Clear Completed</button>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;
