import React from 'react';
import { QuizStatusEnum } from '../../enums/QuizStatusEnum';

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
                            <button onClick={() => props.deleteFn(quiz) }>Delete</button>&nbsp;

                            {quiz.status !== QuizStatusEnum.ENDED ?
                                <button onClick={() => props.updateQuizStatusFn(quiz)}>
                                    {quiz.status === QuizStatusEnum.PENDING ? 'Start' : ''}
                                    {quiz.status === QuizStatusEnum.ACTIVE ? 'End' : ''}
                                </button>
                            : ''}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default QuizList;