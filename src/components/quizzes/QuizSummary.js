import React from 'react';
import QuizQuestionSummary from '../quizzes/QuizQuestionSummary';

function QuizSummary(props){
    return(
        <div>
            <div className="row">
                <label className="strong">Quiz: </label> <label>{props.quizDescription}</label><br/>
            </div>
            <div className="row">
                <label className="strong">Status: </label> <label>{props.quizStatus}</label><br/>
            </div>

            <hr/>

            <QuizQuestionSummary quizUid={props.quizUid} />

            <button className="action" onClick={() => props.cancelFn()} >Back</button>
        </div>
    )
}

export default QuizSummary;