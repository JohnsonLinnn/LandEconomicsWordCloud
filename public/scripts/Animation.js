//initializing the array for texts
var texts=[];
var texts2=[];
var texts3=[];
var texts4=[];
var times=0;
//getting data from firebase collection1
db.collection('submitedText').onSnapshot(snapshot => {
    loadText1(snapshot.docs);
})
const loadText1 =(data) =>{
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

//getting data from firebase collection2
db.collection('submitedText2').onSnapshot(snapshot => {
    loadText2(snapshot.docs);
})
const loadText2 =(data) =>{
    //loading data into array
    if (data.length) {
        let i=0;
        data.forEach(doc => {
          const guide = doc.data();
          texts2[i]=guide;
          i++;
        })
    }
}
//getting data from firebase collection3
db.collection('submitedText3').onSnapshot(snapshot => {
    loadText3(snapshot.docs);
})
const loadText3 =(data) =>{
    //loading data into array
    if (data.length) {
        let i=0;
        data.forEach(doc => {
          const guide = doc.data();
          texts3[i]=guide;
          i++;
        })
    }
}
//getting data from firebase collection4
db.collection('submitedText4').onSnapshot(snapshot => {
    loadText4(snapshot.docs);
})
const loadText4 =(data) =>{
    //loading data into array
    if (data.length) {
        let i=0;
        data.forEach(doc => {
          const guide = doc.data();
          texts4[i]=guide;
          i++;
        })
    }
}

//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(){

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
        update: function(texts) {
            d3.layout.cloud().size([1000, 400])
                .words(texts)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

/*Some sample data - http://en.wikiquote.org/wiki/Opening_lines
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
*/
//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    
    i = times

   var router = i++ %4; 
   console.log(router);
   //words.length;
    //vis.update(getWords(x));
    if(router==0){
        vis.update(texts);
}   else if(router==1){
        vis.update(texts2);
    }else if(router==2){
        vis.update(texts3);
    }else if(router==3){
        vis.update(texts4);
    }
    
    console.log("calling update")
    times++;
    setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud();

//Start cycling through the demo data
showNewWords(myWordCloud);

