/**
 * Created by moh on 05/04/17.
 */
'use strict';
angular.module('projSemApp').directive('myWordsDirective', function($filter){
  function link(scope, el, attr){
    //canvas creation
      var canvas=d3.select(el[0]).append('g');

    function draw (data) {
      //clean canvas before redraw it with new data elements
      canvas.select('*').remove();

      var width = 600;
      var height = 600;
      var chartWidth = 200;
      var wordWidth = 120;

      var radiusSCL = d3.scaleSqrt().domain([1, 100]).range([10, 120]);
      var table = canvas.append('table');
      var thead = table.append('thead');
      var tbody = table.append('tbody');

      // append the header row
      thead.append('tr')
        .selectAll('th')
        .data(['Words', 'Frequencies']).enter()
        .append('th')
        .attr("align", "left")
        .text(function (d) {
          return d;
        });


      var donnees = tbody.selectAll('tr')
                        .data(data);

      var rows = donnees.enter()
                        .append('tr')
                        .attr("class", "wordweightrow");

      // Creation des containers
      var word = rows.append("td").attr("class", "word").attr("width", wordWidth);
      var chart = rows.append("td").attr("class", "chart").attr("width", chartWidth);
      var barContainer = chart.append("div").attr("class", "barContainer");
      var monSVGrect = barContainer.append("svg").attr("height", "15");
      var rectangle = monSVGrect.append("rect").attr("height", "10").attr("y", "4").attr("fill", "royalblue");
      var labels = word.append("text").text(function (d) {
        return d.Word;
      });
      var bars = rectangle.transition().attr("width", function (d) {
        return radiusSCL(d.Occurences);
      }).duration(1000);
    }

    //filter function based on selected language
    function filter (data,lgge,word){
      var d=data[0];
      if (lgge!==undefined && word!==undefined)
      {d=$filter('lggeFilter') (d,lgge);
          d=$filter('wordFilter') (d,word);
      }
      return d;
    }


    //injection des données du controller dans la directive
    scope.$watch('[data,lang,search]', function(data){
       if(!data){ return; }

      data=filter(data,scope.lang,scope.search);


      draw(data);
      // create a row for each object in the data

     }, true);
  }
  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '=',
      lang: '=',
      search: '='
    }
  };
});
