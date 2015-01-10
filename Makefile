default: _data/livsforloeb.json

_data:
	mkdir _data

_data/livsforloeb.json: _data
	node scripts/livsforloeb.js > $@
