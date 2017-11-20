/**
 * Created by moh on 21/04/17.
 */
'use strict';
angular.module('projSemApp').directive('myTopicDirective', function(){
    function link(scope, el, attr){
        var posy=67;
        var rayon = 60;
        var posx = 0 ;
        var offset=20;
        var radiusSCL=d3.scaleSqrt().domain([500,15000]).range([100,300]);

        var canvas = d3.select(el[0])
            .append("svg");


    scope.$watch('data', function(data){

        if(!data){ return; }

        var width = 1067;
        // var j= d3.max( data, function(d){return d.id;});
        // var m= d3.mean( data, function(d){return d.size;});
        // var lines=m*j/width;
        var height=0;

        canvas.attr("width", width);


        var max=0;
        var offset_y=0;
        var saut=false;

        var groupe = canvas.selectAll(".topic")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "topic")
            .attr("transform",  function(d)
                {

                    if ((offset+2*radiusSCL(d.size))>=width){
                        saut=true;
                    }

                    if (saut==false){
                        if (max<(2*radiusSCL(d.size))){
                            max=2*radiusSCL(d.size);
                        }
                    }
                    else{
                        height+=max+10;
                        offset_y+=max+10;
                        offset=20;
                        max=2*radiusSCL(d.size);
                        saut=false;
                    }

                    posx=offset+radiusSCL(d.size);
                    offset+=radiusSCL(d.size)*2+20;
                    posy=offset_y+radiusSCL(d.size)+10;
                    return "translate ("+posx+","+posy+")";
                }
            )
            .attr("width",function (d){return radiusSCL(d.size)*2;})
            .attr("height",function (d){return radiusSCL(d.size)*2;})
            .append("a")
            .attr("xlink:href",function (d) {return  "#!/words/"+d.id;});

        height+=max+10;
        canvas.attr("height",height);

        var pie = d3.pie()
            .value(function (d) { return d["NumberOfWords"]; })
            .sort(null);

        var arcs = groupe.selectAll(".arc")
            .data(function(d) { return pie(d.details); } )
            .enter().append("g")
            .attr("class", "arc");



        var colour = d3.scaleOrdinal(d3.schemeCategory20);

        var arcOut=d3.arc()
            .innerRadius(function () {var inrad= radiusSCL(this.parentNode.parentNode.__data__.size);
                return inrad*0.8;
            } )
            .outerRadius(function () {var outrad=radiusSCL(this.parentNode.parentNode.__data__.size) ;
                return outrad;
            } );

        var arcOver=d3.arc()
            .innerRadius(function () {var inrad= radiusSCL(this.parentNode.parentNode.__data__.size);
                return inrad*0.83;
            } )
            .outerRadius(function () {var outrad=radiusSCL(this.parentNode.parentNode.__data__.size) ;
                return outrad*1.04;
            } );

        var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip");

        var paths=arcs.append("path")
            .attr("d",arcOut)
            .attr("fill", function(d, i) {
                return colour(i);
            })

            .on("mousemove",function (d) {
              var lggeName='';
              switch(d.data.Language){
                case "en":lggeName='English';break;
                case "pt":lggeName='Portuguese';break;
                case "it":lggeName='Italian';break;
                case "fr":lggeName='French';break;
                case "de":lggeName='German';break;
                case "es":lggeName='Spanish';break;
                case "fi":lggeName='Finnish';break;
                case "el":lggeName='Greek';break;
                case "fa":lggeName='Persian';break;
                case "he":lggeName='Hebrew';break;
                case "pl":lggeName='Polish';break;
                case "ru":lggeName='Russian';break;
                case "ar":lggeName='Arabic';break;
                case "tk":lggeName='Turkmen';break;
                case "cy":lggeName='Welsh';break;
              }
                var mouseVal = d3.mouse(this);
                div.transition()
                    .duration(1000).style("opacity", 1);
                div
                    .html("Language: "+lggeName+"</br>"+"In this topic: "+d.data.NumberOfWords+" Words")
                    .style("left", (d3.event.pageX+12) + "px")
                    .style("top", (d3.event.pageY-10) + "px")
                    .style("opacity", .0001)
                    .style("display","block");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("d", arcOver)
            })
            .on("mouseout",function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);


                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("d", arcOut)
            })
            .on("click",function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                }
            );

        var circle=groupe.append("circle")
            .attr("r", function (d) { return radiusSCL(d.size)*0.7;})
            .attr("fill", "#DCDCDC")
            .on("mouseover",function (d) {
                d3.select(this)
                    .transition()
                    .duration(800)
                    .attr("r", radiusSCL(d.size)*0.78);

            })
            .on("mouseout",function (d) {
                d3.select(this)
                    .transition()
                    .attr("r", radiusSCL(d.size)*0.7);
            });

        var titles=circle.append("svg:title").text(function (d) {
          return 'Topic '+d.id+' contains ' +d.size+' Words';
        });

        var k=0;

        for (var i=-40;i<=40;i=i+18){
                var labels = groupe.append("text")
                    .attr("class", "word")
                    .attr("text-anchor", "middle")
                    .text(function (d) {
                        if ( Math.abs(((radiusSCL(this.parentNode.__data__.size) * 2) / i)) > 6) {
                            return d.topwords[k];
                        }
                    })
                    .attr("y", function () {
                        return i;
                    })
                    .attr("fill", "#000000")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "14px");
                k++;
        }


    }, true);
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            data: '='}
    };
});
