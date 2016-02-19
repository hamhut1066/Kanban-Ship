import React from 'react';
import ReactDOM from 'react-dom';
import dragula from 'react-dragula';

import Card from './card.jsx';

class Column extends React.Component {
    render() {
        var self = this;
        var issues = this.props.issues.map(function(issue) {
            return <li key={"wrapper-issue" + issue.identifier}>
                <Card store={self.props.store} drake={self.props.drake} issue={issue} />
            </li>
                    });
        return <div className="panel panel-primary">
            <div className="panel-heading"><h4>{self.props.name}</h4></div>
        <ul id={"list-" + self.props.name} className="panel-body list-unstyled">
                {issues}
            </ul>
        </div>
    }

    componentDidMount() {
        let self = this;
        var container = document.querySelector("#list-" + self.props.name);
        self.props.drake.containers.push(container);
    }
}

module.exports = Column
