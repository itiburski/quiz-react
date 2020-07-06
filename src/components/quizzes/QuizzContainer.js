import React, { Component } from 'react';
import QuizDataService from '../../services/quizDataService';
import QuizList from './QuizList';

class QuizzContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        };
    }

    componentDidMount() {
        QuizDataService.getAll()
            .then(response => {
                this.setState({quizzes: response.data});
            })
            .catch(e =>{
                console.error(e)
            })
    }

    render() {
        return (
            <div>
                <h2 className="subtitle">Manage Quizzes</h2>

                <div>
                    <QuizList quizzes = {this.state.quizzes} />
                </div>
            </div>
        )
    }
}

export default QuizzContainer;