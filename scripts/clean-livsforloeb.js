var json = require('../_data/livsforloeb.json');

var start = json.start.sort().map(function (date, idx) {
    return {
        date: date,
        value: idx
    };
});

var end = json.end.sort().map(function (date, idx) {
    return {
        date: date,
        value: idx
    };
});

process.stdout.write(JSON.stringify({ Startet: start, Ophørt: end }));
