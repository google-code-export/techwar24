// <![CDATA[
var speed=33; // lower number for faster
var flakes=100;
var colour="#ffffff";
var slush=20; // set to '0' for no slush or otherwise set to height at which slush melts
var over_or_under="over"; // set to "over" for snow to always be on top, or "under" to allow it to float behind other objects

/***************************\
*     Snow Fall Widgets   *
*   http://www.thetechwar.com   *
* DON'T EDIT BELOW THIS BOX *
\***************************/
var flks=new Array();
var flkx=new Array();
var flky=new Array();
var fldy=new Array();
var slss=new Array();
var slsh=new Array();
var swide, shigh, boddie;

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(baby_its_cold_outside);

function baby_its_cold_outside() { if (document.getElementById) {
  var i;
  boddie=document.createElement("div");
  i=boddie.style;
  i.position="fixed";
  i.top="0px";
  i.left="0px";
  i.overflow="visible";
  i.width="1px";
  i.height="1px";
  i.backgroundColor="transparent";
  document.body.appendChild(boddie);
  set_width();
  for (var i=0; i<flakes; i++) {
    flks[i]=createDiv(3, 3, colour);
    flkx[i]=3*Math.floor(Math.random()*swide/3);
    flky[i]=Math.floor(Math.random()*shigh);
    fldy[i]=2+Math.floor(Math.random()*4);
    flks[i].style.left=flkx[i]+"px";
    flks[i].style.top=flky[i]+"px";
flks[i].style.zIndex=(over_or_under=="over")?"1001":"0";
    boddie.appendChild(flks[i]);
  }
  setInterval("let_it_snow()", speed);
}}

function createDiv(height, width, colour) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  div.style.backgroundColor=colour;
  return (div);
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min-3;
  shigh=sh_min;
  if (slush) {
    if (swide/3>slss.length) for (i=slss.length; i<swide/3; i++) {
      if (!slsh[i]) slsh[i]=3;
      slss[i]=createDiv(slsh[i], 3, colour);
      boddie.appendChild(slss[i]);
    }
    for (i=0; i<swide/3; i++) {
      slss[i].style.height=slsh[i]+"px";
      slss[i].style.top=shigh-slsh[i]+"px";
      slss[i].style.left=3*i+"px";
    }
    if (i<slss.length && slss[i].style.left!="-3px") for (; i<slss.length; i++) slss[i].style.left="-3px";
  }
}

function let_it_snow(c) {
  var i, x, o=0, z=0;
  for (i=0; i<flakes; i++) {
    flky[i]+=fldy[i];
x=Math.floor(flkx[i]/3);
    if (slush) {
      o+=slsh[x];
      if (flky[i]>=shigh-slsh[x]) {
        if (x<swide && slsh[x]>slsh[x+1]+3) x++;
        else if (x>0 && slsh[x]>slsh[x-1]+3) x--;
        slss[x].style.top=shigh-(slsh[x]+=3)+"px";
        slss[x].style.height=slsh[x]+"px";
flky[i]=shigh;
 }
    }
    if (flky[i]>=shigh || flkx[i]>swide) {
 flky[i]=0;
 fldy[i]=2+Math.floor(Math.random()*4);
 flkx[i]=3*Math.floor(Math.random()*swide/3);
 flks[i].style.left=flkx[i]+"px";
 z++;
}
flks[i].style.top=flky[i]+"px";
  }
  if (o>flakes*slush) for (i=0; i<slsh.length; i++) if (slsh[i]>3) slsh[i]--;
  if (z || o>flakes*slush) set_width();
}
// ]]>