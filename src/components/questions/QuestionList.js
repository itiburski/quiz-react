import React from 'react';

function QuestionList(props) {

    const questionBody = props.questions.map(question => (
        <tr key={question.questionUid}>
            <td>{question.description}</td>
            <td>
                <button onClick={() => props.editCallback(question) }>Edit</button>
                <button onClick={() => props.deleteCallback(question) }>Delete</button>
            </td>
        </tr>
    ));

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {questionBody}
                </tbody>
            </table>

        </div>
    );
}

export default QuestionList;