var image=null;
var fgimage=null;
var bgimage=null;


// COLOR EFFECT

// Uploading Original image for processing
function upload()
{
  var fileinput=document.getElementById("finput");
  var imgcanvas=document.getElementById("canoriginal");
  image=new SimpleImage(fileinput);
  image.drawTo(imgcanvas);
}

// Applying the filter desired by user
function applyFilter()
{
  var rvalue=document.getElementById("Rvalue").value;
  var gvalue=document.getElementById("Gvalue").value;
  var bvalue=document.getElementById("Bvalue").value;
  for(var pixel of image.values())
  {
    var avg=(pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
    if(avg<128)
    {
      pixel.setRed(rvalue/127.5*avg);
      pixel.setGreen(gvalue/127.5*avg);
      pixel.setBlue(bvalue/127.5*avg);
    }
    else
    {
      pixel.setRed((2-rvalue/127.5)*avg+2*rvalue-255);
      pixel.setGreen((2-gvalue/127.5)*avg+2*gvalue-255);
      pixel.setBlue((2-bvalue/127.5)*avg+2*bvalue-255);
    }
  }
    var imgcanvas=document.getElementById("canresult");
    image.drawTo(imgcanvas);
    upload();
}


//  MERGING TWO IMAGES

//Upoading foreground image with green background
function fgupload()
{
  var fileinput=document.getElementById("fgimage");
  var imgcanvas=document.getElementById("fgcan");
  fgimage=new SimpleImage(fileinput);
  fgimage.drawTo(imgcanvas);
}

//Uploading new background image
function bgupload()
{

  var fileinput=document.getElementById("bgimage");
  var imgcanvas=document.getElementById("bgcan");
  bgimage=new SimpleImage(fileinput);
  bgimage.drawTo(imgcanvas);
}

//Merging both image by removing green background
function merge()
{
  if(fgimage == null || !fgimage.complete())
  {
    alert("foreground not loaded");
    return;
  }
  if(bgimage == null || !bgimage.complete())
  {
    alert("background not loaded");
    return;
  }
  //clearCanvas();
  var output= new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
  for(var pixel of fgimage.values())
  {
    var x=pixel.getX();
    var y=pixel.getY();
    if(pixel.getGreen()>pixel.getBlue()+pixel.getRed())
    {
      var bgPixel = bgimage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else
    {
      output.setPixel(x,y,pixel);
    }
  }
  var rescanvas=document.getElementById("mergecan");
  output.drawTo(rescanvas);
  fgupload();
  bgupload();
}
