// Load the service-data.csv and traffic.csv files using d3.js
d3.csv("service-data.csv").then(function (serviceData) {
    d3.csv("traffic.csv").then(function (trafficData) {
        displayData(serviceData, trafficData);
    }).catch(function (error) {
        console.error("Error loading traffic.csv:", error);
    });
}).catch(function (error) {
    console.error("Error loading service-data.csv:", error);
});

const serviceDataMap = new Map();
function displayData(serviceData, trafficData) {
    // Add unknown default to serviceData
    serviceData.push({
        'Service': 'Unknown',
        'IP Address': 'Unknown',
        'x': 0,
        'y': 0
    });

    // Display the serviceData and trafficData in the console
    console.log("Service Data:", serviceData);
    console.log("Traffic Data:", trafficData);

    serviceData.forEach(function (d) {
        serviceDataMap.set(d['IP Address'], d);
    });

    const force = d3.forceSimulation();
    force.nodes(serviceData)
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(0, 0))
        .force('collision', d3.forceCollide().radius(10))
        .on('tick', function () {
            d3.selectAll('circle')
                .attr('cx', function (d) {
                    // Save the x and y coordinates of the service data
                    serviceDataMap.get(d['IP Address'])['x'] = d.x;
                    return d.x;
                })
                .attr('cy', function (d) { 
                    serviceDataMap.get(d['IP Address'])['y'] = d.y;
                    return d.y;
                });
            d3.selectAll('text')
                .attr('x', function (d) { return d.x + 10; })
                .attr('y', function (d) { return d.y + 3; });
            
            d3.selectAll('line')
                .attr('x1', function (d) { return serviceDataMap.get(d['Source IP']) ? serviceDataMap.get(d['Source IP'])['x'] : serviceDataMap.get('Unknown')['x']; })
                .attr('y1', function (d) { return serviceDataMap.get(d['Source IP']) ? serviceDataMap.get(d['Source IP'])['y'] : serviceDataMap.get('Unknown')['y']; })
                .attr('x2', function (d) { return serviceDataMap.get(d['Destination IP']) ? serviceDataMap.get(d['Destination IP'])['x'] : serviceDataMap.get('Unknown')['x']; })
                .attr('y2', function (d) { return serviceDataMap.get(d['Destination IP']) ? serviceDataMap.get(d['Destination IP'])['y'] : serviceDataMap.get('Unknown')['y']; });
        });
    
    const container = d3.select('#display');
    const width = 800;
    const height = 500;
    const svg = container.append('svg')
        .attr('id', 'service-map-svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('width', width)
        .attr('height', height)
        .attr('style', 'max-width: 100%; height: auto; font: 12px sans-serif;');

    const node = svg.selectAll('g')
        .data(serviceData)
        .enter()
        .append('g')
        .attr('fill', 'none');
    
    node.append('circle')
        .attr('r', 5)
        .attr('fill', 'blue');

    node.append('text')
        .attr('stroke', 'black')
        .text(function (d) { console.log(d); return d['Service']; });

    const link = svg.selectAll('line')
        .data(trafficData)
        .enter()
        .append('line')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);
}

document.getElementById('export-svg-button').onclick = () => {
    const DOMURL = window.URL || window.webkitURL || window;
    const svg = document.getElementById("service-map-svg");
    const data = (new XMLSerializer()).serializeToString(svg);
    const svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = DOMURL.createObjectURL(svgBlob);
    const a = document.body.appendChild(document.createElement("a"));
    a.setAttribute('download', 'service-map.svg');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.click();
  }