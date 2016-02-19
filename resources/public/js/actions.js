export const MOVE_ISSUE = 'MOVE_ISSUE';
export const ADD_ISSUE = 'ADD_ISSUE';
export const NOOP = 'NOOP';

export function moveIssue(id, column) {
    return { type: MOVE_ISSUE, id: id, column: column};
};

export function addIssue(issue) {
    return {
        type: ADD_ISSUE,
        issue: issue
    };
}
