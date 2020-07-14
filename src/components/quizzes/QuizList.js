import React from 'react';

function QuizList(props) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>State</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {props.quizzes.map(quiz => (
                    <tr key={quiz.quizUid}>
                        <td>{quiz.description}</td>
                        <td>{quiz.status}</td>
                        <td>
                            <button onClick={() => props.editFn(quiz) }>Edit</button>&nbsp;
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default QuizList;