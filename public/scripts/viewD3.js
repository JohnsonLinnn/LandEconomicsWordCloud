var texts=[];
var isSvg =false;

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
    //wiping out existing canvas
    if(isSvg){
      removeExistCanvas();
    };

    // set the dimensions and margins of the graph
    var margin = {top: 180, right: 20, bottom: 90, left: 20},
        width = 1460- margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","canvasForText")
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    console.log(typeof svg);

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
      .size([width, height])
      .words(texts.map(function(d) { return {text: d.text, size:d.size}; }))
      .padding(5)        //space between words
      .rotate(function() { return ~~(Math.random() * 1) * 60; })
      .fontSize(function(d) { return d.size; })      // font size of words
      .on("end", draw);
    layout.start();
    console.log("nice");
    // This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here

//Open
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#b3ab75")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .style("font-weight", "Bold")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

  isSvg =true;
    }
function removeExistCanvas() {
      // Removes an element from the document
      var element = document.getElementById("canvasForText");
      element.parentNode.removeChild(element);
  }
};
}
