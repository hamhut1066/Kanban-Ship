function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function and(a) {
    var b = true;
    for (var i = 0; i < a.length; i++) {
        b = b && a[i];
    }
    return b;
}

function or(a) {
    var b = false;
    for (var i = 0; i < a.length; i++) {
        b = b || a[i];
    }
    return b;
}

module.exports = {
    uniq,
    and,
    or
}
