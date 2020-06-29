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
            listing: true,
            title: 'Template List'
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
        this.setState({ 
            listing: true,
            title: 'Template List'
        });
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

    setTitle = (newTitle) => {
        this.setState({title: newTitle});
    }

    render() {
        return (
            <div>
                <h2 className="subtitle">{this.state.title}</h2>

                {this.state.listing ? (
                    <div>
                        <p>{this.state.templates.length} templates found</p>
                        <TemplateList templates = {this.state.templates} editCallback = {this.setActiveTemplate}
                            deleteCallback = {this.deleteTemplate} />
                        <button className="action" onClick={this.handleNewdButton}>New</button>
                    </div>
                ) : (
                    <TemplateForm template={this.state.template} submitCallback = {this.refreshList}
                    cancelCallback = {this.showList} setTitleCallback = {this.setTitle} />
                )}
            </div>
        )
    }
}

export default TemplateContainer;