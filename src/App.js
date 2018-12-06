import React, {Component} from 'react';
import classes from './App.module.css';
import Courses from './components/Courses/Courses';
import Add from './components/Add/Add';

class App extends Component {
    state = {
        courses: [],
        leftCourses: 0,
        checkedAll: false,
        show: 'all'
    }

    addCourse = (event) => {
        event.preventDefault();
        let coursses = [...this.state.courses];
        const newCourse = event.target.value;
        if (event.key === "Enter" && event.target.value.length > 2) {
            coursses.push({
                id: coursses.length + 1,
                title: newCourse,
                done: false
            });

            this.setState({
                courses: coursses
            }, () => this.unfinishedCourses());
            event.target.value = '';
        }
    }

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

        this.setState({
            leftCourses: left
        });
    }

    changeChecked = (index) => {
        const course = this.state.courses[index];
        const courses = [...this.state.courses];
        courses.map(item => {
            if (item === course) {
                return item.done = !item.done;
            }
            return item;
        });

        this.setState({
            courses: courses
        }, () => this.unfinishedCourses());
    }

    checkAll = () => {
        this.setState((prev, next) => {
            return {
                checkedAll: !prev.checkedAll,
                leftCourses: 0
            };
        }, () => this.unfinishedCourses());
    }

    clearCourses = () => {
        this.setState((prev, next) => {
            return {courses: [], show: 'all'}
        }, () => this.unfinishedCourses());
    }

    changeShow = (show) => {
        this.setState({
            show: show
        }, () => console.log(this.state));
    }

    removeCourse = (index) => {
        const course = index;
        console.log(course);
        const courses = [...this.state.courses];
        courses.map((item, i) => {
            if (item === course) {
              console.log(item)
                return courses.splice(i, 1);
            }
            return item;
        })
        this.setState({
            courses: courses
        }, () => this.unfinishedCourses());
    }

    render() {
        return (
            <div className={classes.App}>
                <h1>React To-Do App</h1>

                <Add click={(event) => this.addCourse(event)}/>

                <Courses
                    courses={this.state.courses}
                    show={this.state.show}
                    remove={this.removeCourse}
                    checkedAll={this.state.checkedAll}
                    click={this.changeChecked}/>

                <div className={classes.CheckAll}>
                    <section>
                        <input type="checkbox" name="" id="" onClick={this.checkAll}/>
                        <label htmlFor="">Check All</label>
                    </section>
                    <section>{this.state.leftCourses}
                        items left</section>
                </div>
                <div className={classes.Buttons}>
                    <section>
                        <button onClick={() => this.changeShow('all')}>All</button>

                        <button onClick={() => this.changeShow('active')}>Active</button>

                        <button onClick={() => this.changeShow('completed')}>Completed</button>
                    </section>
                    <section>
                        <button onClick={this.clearCourses}>Clear Completed</button>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;
