import React, { Component } from 'react';
import TemplateDataService from './services/templateDataService'

function ListTemplates(props) {
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
                {props.templates.map(template => (
                    <tr key={template.templateUid}>
                        <td>{template.description}</td>
                        <td>{template.status}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

class Templates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            templates: []
        };
    }

    componentDidMount() {
        TemplateDataService.getAll()
            .then(response => {
                this.setState({templates: response.data});
            })
            .catch(e => {
                console.error(e);
            })
    }

    render() {
        return (
            <div>
                <h2 className="subtitle">Manage Templates</h2>

                <div>
                    <ListTemplates templates = {this.state.templates} />
                </div>
            </div>
        )
    }
}

export default Templates;