file = '../data/samples.json'

function init(){
    d3.json(file).then(function(data){
        // console.log("Hello world")
        console.log(data)
        
        ids = []
        let drop_menu = d3.select('#selDataset'); 
        for(let i = 0; i < data.samples.length; i++){
            ids.push(data.samples[i].id); 
        }

        ids.forEach(function (ids) {
            drop_menu.append("option").text(ids);
        });

        // console.log(ids)
        var cur_id = ids[0]
        var sample_values = []
        var otu_labels = []
        var otu_ids = []


        var filteredData = data.samples.filter(function(d) {
            return d.id == cur_id;
        });

        var len = 0

        if(filteredData[0].sample_values.length < 10){
            len = filteredData[0].sample_values.length
        } else {
            len = 10
        }

        for(let i = 0; i < len; i++){
             sample_values.push(filteredData[0].sample_values[i])
             otu_labels.push(filteredData[0].otu_labels[i])
             otu_ids.push('OTU '+filteredData[0].otu_ids[i]) 
        }


        // y is OTU 
        // x is 
        var bg = [{
            type: 'bar', 
            x: sample_values, 
            y: otu_ids, 
            text: otu_labels,
            orientation: 'h'
        }]

        var layout = {
            yaxis: {
                autorange: "reversed"
            }
        }

        var filteredDemo = data.metadata.filter(function(d) {
            return d.id == cur_id;
        });

        bubbleChart(cur_id)
        Plotly.newPlot('bar', bg, layout);
    }); 
};


init()

function optionChanged(selected_value){
    d3.json(file).then(function(data){

        // console.log(ids)
        var cur_id = selected_value
        var sample_values = []
        var otu_labels = []
        var otu_ids = []


        var filteredData = data.samples.filter(function(d) {
            return d.id == cur_id;
        });

        var len = 0

        if(filteredData[0].sample_values.length < 10){
            len = filteredData[0].sample_values.length
        } else {
            len = 10
        }

        for(let i = 0; i < len; i++){
             sample_values.push(filteredData[0].sample_values[i])
             otu_labels.push(filteredData[0].otu_labels[i])
             otu_ids.push('OTU '+filteredData[0].otu_ids[i]) 
        }

        // console.log(filteredData[0])

        // y is OTU 
        // x is 
        var bg = [{
            type: 'bar', 
            x: sample_values, 
            y: otu_ids, 
            text: otu_labels,
            orientation: 'h'
        }]

        var layout = {
            yaxis: {
                autorange: "reversed"
            }
        }

        bubbleChart(selected_value)
        Plotly.newPlot('bar', bg, layout);
    });
};

function bubbleChart(selected_value){
    d3.json(file).then(function(data){

        // console.log(ids)
        var cur_id = selected_value
        var sample_values = []
        var otu_labels = []
        var otu_ids = []


        var filteredData = data.samples.filter(function(d) {
            return d.id == cur_id;
        });

        var len = 0

       
        len = filteredData[0].sample_values.length
       

        for(let i = 0; i < len; i++){
             sample_values.push(filteredData[0].sample_values[i])
             otu_labels.push(filteredData[0].otu_labels[i])
             otu_ids.push(filteredData[0].otu_ids[i]) 
        }

        
        // console.log(filteredData[0])

        // y is OTU 
        // x is 
        var bc = [{
            mode: 'markers', 
            x: otu_ids, 
            y: sample_values, 
            text: otu_labels,
            marker: {
                color: otu_ids, 
                size: sample_values
            }
        }]

        var layout = {
            xaxis: {
                title: "OTU ID"
            }
        }

        Plotly.newPlot('bubble', bc, layout);
    });
};