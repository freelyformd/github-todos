import "jest";
import parseData from "../../src/lib/parser";

const data = {
    "type": "file",
    "encoding": "base64",
    "size": 5362,
    "name": "README.md",
    "path": "README.md",
    "content": `const barChart = () => {
        const xScale = new Plottable.Scales.Category();
        const yScale = new Plottable.Scales.Linear();
        const xAxis = new Plottable.Axes.Category(xScale, 'bottom');
        const yAxis = new Plottable.Axes.Numeric(yScale, 'left');

        const plot = new Plottable.Plots.Bar()
            .x(d => d.x, xScale)
            .y(d => d.y, yScale)
            .addDataset(new Plottable.Dataset(data))
            //TODO: @aleku399 look into why this was causing bars not to show
            //.animated(true)
            .renderTo('#barChart');
            //FIXME: alex testing 1 on the 2s
        // const title = new Plottable.Components.Label('Population of Countries (millions)');
    `
};

describe("parsed data tests", () => {
    it.only("should return modified parsed data", () => {
      const _data = parseData(data);
      expect(_data).toMatchSnapshot();
    });
});

