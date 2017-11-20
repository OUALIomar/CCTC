/**
 * Created by moh on 05/04/17.
 */
angular.module('projSemApp').directive('myArticleDirective', function($filter){
  function link(scope, el, attr){
      var canvas=d3.select(el[0]).append('g');

      function draw (data) {
          //clean canvas before redraw it with new data elements
          canvas.select('*').remove();
          var width=600;
          var height=600;
          var chartWidth=200;
          var wordWidth=120;

          var radiusSCL=d3.scaleSqrt().domain([0,100]).range([0,100]);

          var table = canvas.append('table');
          var thead = table.append('thead');
          var	tbody = table.append('tbody');


          // append the header row
          thead.append('tr')
              .selectAll('th')
              .data(['Article'  ,'Pourcentage']).enter()
              .append('th')
              .attr("align","left")
              .text(function (d) { return d; });


          var donnees = tbody.selectAll('tr')
              .data(data);

          var rows = donnees.enter()
              .append('tr')
              .attr("class", "wordweightrow");

          // Creation des containers
          var word = rows.append("td").attr("class", "word").attr("width", wordWidth);
          var chart = rows.append("td").attr("class", "chart").attr("width", chartWidth);
          var barContainer= chart.append("div").attr("class", "barContainer");
          var monSVGrect=barContainer.append("svg").attr("height","15");
          var rectangle= monSVGrect.append("rect").attr("height","10").attr("y","4").attr("fill","royalblue");
          var labels =word.append("text").text(function (d){return d.articleTitle;});
          var bars = rectangle.transition().attr("width",function (d){return radiusSCL(d.Pourcentage);}).duration(1000);
      }

      function filter (data,lgge){
          var d=data[0];
          if (lgge!==undefined)
          {d=$filter('lggeFilter') (d,lgge);}
          return d;
      }


    //injection des données du controller dans la directive
    scope.$watch('[data,lang]', function(data){

      if(!data){ return; }
      // create a row for each object in the data
        data=filter(data,scope.lang);

        draw(data);

    }, true);
  }

  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '=',
      lang: '='}
  };
});
