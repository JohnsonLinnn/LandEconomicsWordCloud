var texts=[];
//getting data from firebase
db.collection('submitedText').onSnapshot(snapshot => {
    loadText(snapshot.docs);
})
const loadText =(data) =>{
    //loading data into array
    if (data.length) {
        let i=0;
        data.forEach(doc => {
          const guide = doc.data();
          texts[i]=guide;
          i++;
        })
    }
}
//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(){
    console.log("calling wordcloud");
    var fill = d3.scale.category20();

    // set the dimensions and margins of the graph
    var margin = {top: 180, right: 20, bottom: 90, left: 20},
        width = 1460- margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    //Construct the word cloud's SVG element
    var svg = d3.select("div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(900,300)");

    console.log(svg);
    //Draw the word cloud
    function draw(texts) {
        var cloud = svg.selectAll("g text")
                        .data(texts, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", "#b3ab75")
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });
        //function(d, i) { return fill(i); }
        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([1000, 400])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines
var words = [
    "Paragraph1 Paragraph1 Paragraph1 Paragraph1.",
    "Paragraph2 Paragraph2 Paragraph2 Paragraph2.",
    "Paragraph3 Paragraph3 Paragraph3 Paragraph3.",
    "Paragraph4 Paragraph4 Paragraph4 Paragraph4."
]

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {

    return words[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};                
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    
    i = i || 0;

   var x =i++ % words.length;
    //vis.update(getWords(x));
    vis.update(texts);
    console.log("calling update")
    setTimeout(function() { showNewWords(vis, i + 1)}, 8000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud();

//Start cycling through the demo data
showNewWords(myWordCloud);

