import React from 'react';

import { NOOP, moveIssue } from '../js/actions.js';

class Card extends React.Component {
    render() {
        let issue = this.props.issue;
        let assignee = issue.assignee || {};
        let milestone = issue.milestone || {};
        let component = milestone.component || {}
        return <div id={"issue-" + issue.identifier} className="panel panel-default">
            <div className="panel-heading clearfix">
                <h3 className="panel-title pull-left">{issue.title}</h3>
                <a className="pull-right" href={"ship://Problems/" + issue.identifier}>{issue.identifier}</a>
            </div>
            <div className="list-group">
                <div className="list-group-item">
                    <p className="list-group-item-text">...</p>
                </div>
            </div>
            <div className="panel-footer">
                <small>
                    <em>{assignee.name}</em>
                    <div className="pull-right">
                        <span className="label label-default">{milestone.name}</span>
                        <span className="label label-primary">{component.name}</span>
                    </div>
                </small>
            </div>
        </div>

    }

    componentDidMount() {
        let self = this;
        self.props.drake.on('drop', function(el, target, source, sibling) {
            let key = +el.children[0].id.split('-')[1];
            let dest_column = target.id.split('-')[1];
            let source_column = source.id.split('-')[1];
            if (dest_column === source_column) return;
            if (self.props.issue.identifier === key) {
                window.fetch('/problems/' + key + '/move/' + dest_column, {
                    method: 'patch'
                })
                      .then(function(response) {
                          if (response.status >= 200 && response.status < 300) {
                              self.props.store.dispatch(moveIssue(key, dest_column));
                          } else {
                              self.props.store.dispatch({type: NOOP});
                          }
                      })
                      .then()
            }
        })
    }
}

module.exports = Card
