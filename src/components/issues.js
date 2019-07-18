import React, {Component} from 'react';
import Services from './../lib/services';



export default class Issues extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: []
        };



        this.render();

    }

    componentDidMount() {
        console.log("componentDidMount");
        console.log(this.props);
        this._fetchIssues(this.props.repos);
    }


    render() {
        console.log("render");
        console.log(this.state);
        if(!this.state.issues) return;

        const listRepos = this.state.issues.map((repoIssues, i) =>
            <li className="list-group-item" key={i}>
                <h5>{repoIssues.repo}</h5>
                {this._renderIssues(repoIssues.issues)}
            </li>
        );
        return (
            <div>
                <ul className="list-group list-group-flush">{listRepos}</ul>
            </div>
        );
    }

    _renderIssues(repoIssues) {
        if(!repoIssues) return;

        const listIssues = repoIssues.map((issue, i) =>
            <li className="list-group-item" key={i}>{issue}</li>
        );
        return (
            <div>
                <ul className="list-group list-group-flush">{listIssues}</ul>
            </div>
        );
    }



    _setIssues(arr) {
        this.setState({issues: arr})
    }




    _fetchIssues(repos) {

        if(!repos) return;

        for(let key in repos) {
            let repo = repos[key];
            let has_issues = repo.has_issues;
            console.log(has_issues);
            if (!has_issues) continue;

            let issues_url = repo.issues_url.replace("{/number}", "");
            Services.fetch(issues_url)
                .then(data => {
                    if (!data.length) return;

                    let issues = this.state.issues;
                    let issue = {
                        "repo": repo.name,
                        "issues": data.map((issue) => issue.title)
                    };
                    issues.push(issue);

                    this._setIssues(issues);
                });
        }
    }



}