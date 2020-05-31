import React, { Component } from 'react';

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

    async componentDidMount() {    
        const url = 'http://localhost:8080/quiz/templates';

        try {
            const res = await fetch(url);
            const data = await res.json();
            this.setState({templates: data});
        } catch (err) {
            console.error(err);
        }
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