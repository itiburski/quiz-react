import React from 'react';

export function TemplateList(props) {

    const templateBody = props.templates.map(template => (
        <tr key={template.templateUid}>
            <td>{template.description}</td>
            <td>{template.status}</td>
            <td>
                <button onClick={() => props.editCallback(template) }>Edit</button>
                <button onClick={() => props.deleteCallback(template) }>Delete</button>
            </td>
        </tr>
    ))

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>State</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {templateBody}
                </tbody>
            </table>

        </div>
    );
}
