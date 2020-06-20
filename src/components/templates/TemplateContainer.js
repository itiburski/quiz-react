import React, { Component } from 'react';
import TemplateDataService from '../../services/templateDataService'
import { TemplateList } from './TemplateList';
import TemplateForm from './TemplateForm';

const emptyTemplate = {
    description: '',
    status: '',
    templateUid: ''
};

class TemplateContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            template: emptyTemplate,
            listing: true
        };
    }

    componentDidMount() {
        this.getAllTutorials();
    }

    getAllTutorials() {
        TemplateDataService.getAll()
            .then(response => {
                this.setState({ templates: response.data });
            })
            .catch(e => {
                console.error(e);
            });
    }

    refreshList = () => {
        this.getAllTutorials();
        this.setState({
                listing: true
        });
    }

    showList = () => {
        this.setState({listing: true});
    }

    setActiveTemplate = (editTemplate) => {
        this.setState(prevState => ({
            template: editTemplate,
            listing: false
        }));
    }

    deleteTemplate = (templateToDelete) => {
        let confirmDelete = window.confirm('Delete template?');

        if (confirmDelete) {
            TemplateDataService.delete(templateToDelete.templateUid)
                .then(response => {
                    this.refreshList();
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }

    handleNewdButton = (event) => {
        this.setActiveTemplate(emptyTemplate);
    }

    render() {
        return (
            <div>
                <h2 className="subtitle">Manage Templates</h2>

                {this.state.listing ? (
                    <div>
                        <p>{this.state.templates.length} templates found</p>
                        <TemplateList templates = {this.state.templates} editCallback = {this.setActiveTemplate}
                            deleteCallback = {this.deleteTemplate} />
                        <button className="action" onClick={this.handleNewdButton}>New</button>
                    </div>
                ) : (
                    <TemplateForm template={this.state.template} submitCallback = {this.refreshList}
                    cancelCallback = {this.showList}  />
                )}
            </div>
        )
    }
}

export default TemplateContainer;