import { createStore } from 'redux';
import kanbanApp from './reducers.js';
var dragula = require('react-dragula');

const initialState = {
    drake: dragula({ draggable: true }),
    boards: [
        {name: "Triage"},
        {name: "Todo"},
        {name: "Doing"},
        {name: "Done"}
    ],
    issues: []
}

let store = createStore(kanbanApp, initialState);

module.exports = {
    store
}
