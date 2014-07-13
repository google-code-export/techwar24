//<![CDATA[


function html2entities(){
var re=/[<>"'&]/g
for (i=0; i<arguments.length; i++)
arguments[i].value=arguments[i].value.replace(re, function(m){return replacechar(m)})
}

function replacechar(match){
if (match=="<")
return "&lt;"
else if (match==">")
return "&gt;"
else if (match=="\"")
return "&quot;"
else if (match=="'")
return "&#039;"
else if (match=="&")
return "&amp;"
}
//]]>
</script>
<script type='text/javascript'>

//<![CDATA[

//Character count script
function countit(what){
formcontent=what.form.charcount.value
what.form.displaycount.value=formcontent.length
}

//]]>