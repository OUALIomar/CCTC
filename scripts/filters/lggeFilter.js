/**
 * Created by moh on 21/04/17.
 */

app.filter('lggeFilter',function(){

    return	function(input,lgge){
        return lgge==""	?	input:input.filter(function(d){ if(lgge.indexOf(d.Language)!=-1) {return	true;}else {return false;}  });
    };
});
