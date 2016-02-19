import React from 'react';
import ReactDOM from 'react-dom';

import Column from './column.jsx';
import { store } from '../js/store.js';
import { uniq } from '../js/util.js';
import { addIssue } from '../js/actions.js';

class Root extends React.Component {
    render() {
        let self = this;
        let state = self.state || self.props;
        var boards = state.boards.map(function(board){
            let issues = state.issues.filter(issue => {
                let keyword = issue.keywords
                                   .filter((current, index, array) =>
                                       current.keyword == "column")
                                   .map(keyword => keyword.value)[0]
                    || "Triage"
                return keyword === board.name;
            })
            return <div key={"board-" + board.name} className="col-md-3">
                <Column
                    store={self.props.store}
                    drake={state.drake}

                    issues={issues}
                    name={board.name}/>
            </div>
        });
        return <div>
                {boards}
        </div>
    }

    componentDidMount() {
        /* initialisation function */
        let self = this;
        window.fetch('/problems/open')
              .then(response => response.json())
              .then(issues => issues.map(issue => self.props.store.dispatch(addIssue(issue))));

        self.props.store.subscribe(() => {
            this.setState(self.props.store.getState());
        })
    }
}
Root.defaultProps = Object.assign({}, {store}, store.getState());

ReactDOM.render(<Root/>, document.getElementById('mountNode'));
