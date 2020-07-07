import React from 'react';
import { TemplateStatusEnum } from '../../enums/TemplateStatusEnum';

function TemplateList(props) {

    const templateBody = props.templates.map(template => (
        <tr key={template.templateUid}>
            <td>{template.description}</td>
            <td>{template.status}</td>
            <td>
                <button onClick={() => props.editFn(template) }>Edit</button>&nbsp;
                <button onClick={() => props.deleteFn(template) }>Delete</button>&nbsp;
                <button onClick={() => props.detailFn(template) }>Questions</button>&nbsp;

                {template.status !== TemplateStatusEnum.INACTIVE ?
                    <button onClick={() => props.updateTemplateStatusFn(template)}>
                        { template.status === TemplateStatusEnum.PENDING ? 'Activate': '' }
                        { template.status === TemplateStatusEnum.ACTIVE ? 'Inactivate' : '' }
                    </button>
                : '' }
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

export default TemplateList;