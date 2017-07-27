

  var heightPixelsToHide = 100;


  class ImageUtils {



      static getCanvas(w, h) {
          var c = document.querySelector("canvas");
          c.width = w;
          c.height = h;
          return c;
      }

      static getPixels(img) {
          var c = ImageUtils.getCanvas(img.width, img.height);
          var ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);
          return ctx.getImageData(0,0,c.width,c.height);
      }

      static putPixels(imageData, w, h) {
          var c = ImageUtils.getCanvas(w, h);
          var ctx = c.getContext('2d');
          ctx.putImageData(imageData, 0, 0);
      }

  }

  class RGBA {
  constructor(redValue, greenValue, blueValue, alphaValue) {

  this.red = redValue;
  this.green = greenValue;
  this.blue = blueValue;
  this.alpha = alphaValue;
  }
  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // function definitions here


  //clip(img, 100);
  //sepia(img);
  //makeInvert(img);
  //brighten(img,200);
  //makeMoreBlue(img);
  //makeMoreRed(img);
  //makeMoreGreen(img);
  //makeNoise(img);
  //makeFunky(img);
  //colourise(img, new RGBA(255, 2, 238, 255), 30);

  function makeMoreBlue(img, amount) {
  var pixels = ImageUtils.getPixels(img);
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i = 0; i < length; i +=4) {
  data[i + 2] = data[i+ 2] +amount ;

  }
  ImageUtils.putPixels(pixels, img.width, img.height);
  }


  function makeMoreRed(img, amount) {
  var pixels = ImageUtils.getPixels(img);
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i = 0; i < length; i += 4) {
  data[i] = data[i] + amount;
  }
  ImageUtils.putPixels(pixels, img.width, img.height);
  }

  function makeMoreGreen(img, amount) {
  var pixels = ImageUtils.getPixels(img);
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i = 0; i < length; i += 4) {
  data[i + 1] = data[i+ 1] + amount;
  }
  ImageUtils.putPixels(pixels, img.width, img.height);
  }

  function brighten(img, adjustment) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;
    for (var i = 0; i < length; i += 4) {
    data[i] = data[i] + adjustment;
    data[i + 2] = data[i+ 2] + adjustment;
    data[i + 1] = data[i+ 1] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);

  }


  function makeInvert(img){
  var pixels = ImageUtils.getPixels(img);
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i = 0; i < length;i += 4) {
  data[i] = 255 - data[i];
  data[i+1] = 255 - data[i+1];
  data[i+2] = 255 - data[i+2];
  }
  ImageUtils.putPixels(pixels, img.width, img.height);
  }


  function makeNoise(img, amount) {
  var pixels = ImageUtils.getPixels(img);
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i = 0; i < length; i+= getRandomInt(1, amount)) {
  data[i+2] = data[i+2] + 200;
  }
  ImageUtils.putPixels(pixels, img.width, img.height);
  }


  function makeFunky(img){
  var pixels = ImageUtils.getPixels(img);
  var length = pixels.data.length;
  var data = pixels.data;
  for (var i = 0; i < length/2; i += 4) {
  var temp = data[i];
  data[i] = data[length - i];
  data[length - i] = temp;

  }
  ImageUtils.putPixels(pixels, img.width, img.height);
  }


  function setPixel(data, i, colour) {
    data[i] = colour.red;
    data[i+1] = colour.green;
    data[i+2] = colour.blue;
    data[i+3] = colour.alpha;
  }




  function colourise(img, colour, level) {
    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;
    for (var i = 0; i < all; i += 4) {
      var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
      var modifiedRGBA = colourisePixel(originalRGBA, colour, level);
      setPixel(data, i, modifiedRGBA);
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
  }


  function colourisePixel(originalRGBA, colour, level) {
    var diffRed = (originalRGBA.red - colour.red) * (level / 100);
    var modifiedRed = originalRGBA.red - diffRed;
    var diffGreen = (originalRGBA.green - colour.green) * (level / 100);
    var modifiedGreen = originalRGBA.green - diffGreen;
    var diffBlue = (originalRGBA.blue - colour.blue) * (level / 100);
    var modifiedBlue = originalRGBA.blue - diffBlue;
    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
  }





  function sepiaPixel(originalRGBA) {
    var modifiedRed = originalRGBA.red * 0.393 + originalRGBA.green * 0.769 + originalRGBA.blue * 0.189;
    var modifiedGreen = originalRGBA.red * 0.349 + originalRGBA.green * 0.686 + originalRGBA.blue * 0.168;
    var modifiedBlue = originalRGBA.red * 0.272 + originalRGBA.green * 0.534 + originalRGBA.blue * 0.131;
    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, originalRGBA.alpha);
  } //originalRGBA.alpha

  function sepia(img) {
    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
      var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
      var sepiaRGBA = sepiaPixel(originalRGBA);
      setPixel(data, i, sepiaRGBA);

    }
    ImageUtils.putPixels(pixels, img.width, img.height);

  }






  function clip(img, adjustment) {
    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
      var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
      var modifiedRGBA = clipPixel(originalRGBA, adjustment);
      setPixel(data, i, modifiedRGBA);
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
  }


  function clipPixel(colour, range) {

    var clippedRed = 0;
    if(colour.red > 255 - range){clippedRed = 255;}

    var clippedGreen = 0;
    if(colour.green > 255 - range){clippedGreen = 255;}

    var clippedBlue = 0;
    if(colour.blue > 255 - range){clippedBlue = 255;}

    return new RGBA(clippedRed, clippedGreen, clippedBlue, colour.alpha);

  }



var amount = 0;
var filter = 0;

  $(document).ready(function() {
      var img = new Image();
      img.src = "../photoeditor-master/img/cat.jpg";
  var pixels = ImageUtils.getPixels(img);


  var slider = new Slider('#ex1', {
  	formatter: function(value) {


      amount = value;
      if(filter == 1) {
        makeMoreBlue(img, amount);
      }
      if(filter == 2) {
        makeMoreGreen(img, amount);
      }
      if(filter == 3) {
        makeMoreRed(img, amount);
      }
      if(filter == 4) {
        makeNoise(img, amount);
      }
      if(filter == 5) {
        makeFunky(img);
      }
      if(filter == 6) {
        brighten(img, amount);
      }

      if(filter == 7) {
        makeInvert(img);
      }
      if(filter == 8) {
        sepia(img);
      }
      if(filter == 9) {
        clip(img, amount);
      }
      if(filter == 10) {
        colourise(img, new RGBA(amount, 255-amount, amount/2, 255), 30);
      }
      if(filter > 10) {filter = 0;}

      return value;

  	}
  });





$( "#change" ).click(function() {
  console.log(amount);
  filter++;
    if(filter == 1) {
      makeMoreBlue(img, amount);
    }
    if(filter == 2) {
      makeMoreGreen(img, amount);
    }
    if(filter == 3) {
      makeMoreRed(img, amount);
    }
    if(filter == 4) {
      makeNoise(img, amount);
    }
    if(filter == 5) {
      makeFunky(img);
    }
    if(filter == 6) {
      brighten(img, amount);
    }

    if(filter == 7) {
      makeInvert(img);
    }
    if(filter == 8) {
      sepia(img);
    }
    if(filter == 9) {
      clip(img, amount);
    }
    if(filter == 10) {
      colourise(img, new RGBA(amount, 255-amount, amount/2, 255), 30);
    }
    if(filter > 10) {filter = 0;}


    //clip(img, 100);
    //sepia(img);
    //makeInvert(img);
    ////brighten(img,200);
    ////makeMoreBlue(img);
    ////makeMoreRed(img);
    ////makeMoreGreen(img);
    ////makeNoise(img);
    ////makeFunky(img);
    //colourise(img, new RGBA(255, 2, 238, 255), 30);
});

  });
