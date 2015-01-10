/*global d3, Plottable*/
d3.json('data/livsforloeb.json', function (error, data) {
    var parseDate = d3.time.format('%Y-%m-%d').parse;

    var companies = Object.keys(data).map(function (key) {
        return data[key].filter(function (item, idx) {
            return !(idx % 10000);
        }).map(function (point) {
            return {
                date: parseDate(point.date),
                value: point.value,
                name: key
            };
        });
    });

    console.log(companies);

    var xScale     = new Plottable.Scale.Time();
    var yScale     = new Plottable.Scale.Linear();
    var colorScale = new Plottable.Scale.Color('10');

    var xAxis  = new Plottable.Axis.Time(xScale, 'bottom');
    var yAxis  = new Plottable.Axis.Numeric(yScale, 'left');
    var yLabel = new Plottable.Component.Label('Amount', 'left');
    var legend = new Plottable.Component.Legend(colorScale);

    var plots = companies.map(function (point) {
        return new Plottable.Plot.Line(xScale, yScale)
          .addDataset(point)
          .project('x', 'date', xScale)
          .project('y', 'value', yScale)
          .project('stroke', colorScale.scale(point[0].name))
          .project('stroke-width', 1);
    });

    var gridlines = new Plottable.Component.Gridlines(xScale, yScale);
    var center    = new Plottable.Component.Group(plots).merge(gridlines).merge(legend);
    var table     = new Plottable.Component.Table([[yLabel, yAxis, center], [null, null, xAxis]]).renderTo(d3.select('svg#livsforloeb'));
    var panZoom   = new Plottable.Interaction.PanZoom(xScale, null);
    center.registerInteraction(panZoom);
});

