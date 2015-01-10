var mongojs = require('mongojs');

var db = mongojs('read:123456@128.199.33.21/virk', ['cvr']);

var start = [];
var end = [];

db.cvr.find({}, { 'livsforloeb.livsforloeb': 1 })
    .limit(0)
    .on('data', function (result) {
        var l = result.livsforloeb.livsforloeb;

        if (l.startdato) {
            start.push(l.startdato.split('-').reverse().join('-'));
        }

        if (l.ophoersdato) {
            end.push(l.ophoersdato.split('-').reverse().join('-'));
        }
    })
    .on('end', function () {
        process.stdout.write(JSON.stringify({ start: start, end: end }));

        db.close();
    });
