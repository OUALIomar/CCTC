/**
 * Created by moh on 19/06/17.
 */
app.filter('wordFilter',	function(){
    return	function(input,word){
        return word==""	?	input :input.filter(function(d){
            if (d.Word.toLowerCase().indexOf(word.toLowerCase()) >= 0)
            {return	true;}
            else {return false;}  });
    };
});