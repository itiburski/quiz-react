import React, { Component } from 'react';
import TemplateDataService from '../../services/templateDataService'
import TemplateList from './TemplateList';
import TemplateForm from './TemplateForm';
import TemplateDetail from './TemplateDetail';
import { ModeEnum } from './../../ModeEnum';

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
            mode: ModeEnum.LISTING,
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
            mode: ModeEnum.LISTING
        });
    }

    showList = () => {
        this.setState({ 
            mode: ModeEnum.LISTING,
            title: 'Template List'
        });
    }

    setEditTemplate = (editTemplate) => {
        this.setState(prevState => ({
            template: editTemplate,
            mode: ModeEnum.EDITING
        }));
    }

    setDetailTemplate = (detailTemplate) => {
        this.setState(prevState => ({
            template: detailTemplate,
            mode: ModeEnum.DETAILING,
            title: 'Template Detail'
        }))
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
        this.setEditTemplate(emptyTemplate);
    }

    setTitle = (newTitle) => {
        this.setState({title: newTitle});
    }

    render() {
        let content;

        if (this.state.mode === ModeEnum.LISTING) {
            content = 
                <div>
                    <p>{this.state.templates.length} templates found</p>
                    <TemplateList templates = {this.state.templates} editCallback = {this.setEditTemplate}
                        deleteCallback = {this.deleteTemplate} detailsCallback = {this.setDetailTemplate} />
                    <button className="action" onClick={this.handleNewdButton}>New</button>
                </div>
        }

        if (this.state.mode === ModeEnum.EDITING){ 
            content = 
                <TemplateForm template={this.state.template} submitCallback = {this.refreshList}
                    cancelCallback = {this.showList} setTitleCallback = {this.setTitle} />
        }

        if (this.state.mode === ModeEnum.DETAILING){ 
            content = <TemplateDetail template={this.state.template} cancelCallback = {this.showList} />
        }

        return (
            <div>
                <h2 className="subtitle">{this.state.title}</h2>
                {content}
            </div>
        )
    }
}

export default TemplateContainer;