import { combineReducers } from 'redux';
import { MOVE_ISSUE, ADD_ISSUE } from './actions.js';
import { or } from './util.js';

function addIssueAction(state, new_issue) {
    if (or(state.map(issue => issue.identifier === new_issue.identifier))) {
        return state;
    } else {
        return state.concat(new_issue);
    }
}


function issues(state = [], action) {
    switch (action.type) {
    case MOVE_ISSUE:
        return state.map((issue) => {
            if (issue.id === action.id) {
                return Object.assign({}, issue, {
                    column: action.column
                });
            } else {
                return issue;
            }
        });
    case ADD_ISSUE:
        return addIssueAction(state, action.issue);
    default:
        return state;
    }
};

function drake(state, action) {
    return state || {};
}

let boards = drake;

const kanbanApp = combineReducers({
    issues,
    drake,
    boards
});

module.exports = kanbanApp;
