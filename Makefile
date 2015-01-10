default: app/data/livsforloeb.json

_data, app/data:
	mkdir $@

_data/livsforloeb.json: _data
	node scripts/livsforloeb.js > $@

app/data/livsforloeb.json: scripts/clean-livsforloeb.js _data/livsforloeb.json app/data
	node $< > $@
