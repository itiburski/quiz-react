import React from 'react';

function AnswerList(props) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Quiz Description</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {props.quizzes.map(quiz => (
                    <tr key={quiz.quizUid}>
                        <td>{quiz.description}</td>
                        <td>
                            <button onClick={() => props.answerFn(quiz) }>Answer it</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AnswerList;