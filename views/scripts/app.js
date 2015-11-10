$(document).ready(function() {

  var server = "http://localhost:3000/";
  var activePaletteSet = [];
  var palettes = {all: [], top: [], newest: []};
  var counter = {all: 0, top: 0, newest: 0};
  var currentPalette = 'all';
  var currentIndex = 0;

  $('.button-section').hide();

  $('.swatch-section').html('Welcome to Palettable!');

  $('.home').on('click', function() {
    $('.swatch-section').html('Welcome to Palettable!');
    $('.button-section').hide();
  });

  $('.all-palettes').on('click', function() {
    switchPaletteSet("all");
  });

  $('.top-20').on('click', function() {
    switchPaletteSet("top");
  });

  $('.newest').on('click', function() {
    switchPaletteSet("newest");
  });

  $('.left-arrow').on('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      $('.striped-button').prop('disabled', true);      
      updateView();
    }
  });

  $('.right-arrow').on('click', function() {
    if (currentIndex < activePaletteSet.length - 1) {
      currentIndex++;
      $('.striped-button').prop('disabled', true);     
      updateView();
    }
  });

  $('.pixelated-button').on('click', function() {
      showPixelated(activePaletteSet[currentIndex]);
      $('.striped-button').prop('disabled', false);
  }); 

  $('.striped-button').on('click', function() {
      showStriped(activePaletteSet[currentIndex]);
      $('.striped-button').prop('disabled', true);
  }); 

  function getData(url, cb) {
    $.ajax({
      type: 'GET',
      url: server + "palettes" + "/" + url,
      dataType: 'xml',
      success: function(xml) {
        activePaletteSet = [];
        $(xml).find("palette").each(function() {
          var swatch = [];
          var colors = $(this).find("colors").children().each(
            function(child, text) {
              swatch.push($(text).text());
            });
          activePaletteSet.push(swatch);
        });        
        palettes[url] = activePaletteSet.slice();
        updateView();
      }
    });
  }

  function downloadPalettes(url) {
    getData(url, function() {
      updateView();
    });
  }

  function updateView() {
    $('.swatch-section').html('');
    var currentSwatch = activePaletteSet[currentIndex];
    var $newDiv = showStriped(currentSwatch);
    $('.swatch-section').append($newDiv);
    $('.button-section').show();    
  }

  function switchPaletteSet(newPaletteSet) {
    counter[currentPalette] = currentIndex;
    currentIndex = counter[newPaletteSet];
    currentPalette = newPaletteSet;

    if (palettes[currentPalette].length === 0) {
      downloadPalettes(currentPalette);
    }
    else
    {
      activePaletteSet = palettes[currentPalette];
      updateView();
    }
  }

  function showPixelated(currentSwatch) {
    $('.swatch-section').html('');
    var rowLength = 10;
    var rowHeight = 5;
    var $pixelSwatch = $('<div class="flex-container flex-vertical swatch"></div>');
    for (var i = 0; i < rowHeight; i++) {
      var $rowDiv = $('<div class="flex-container pixelated-row"></div>');
      for (var j = 0; j < rowLength; j++) {
        $block = $('<div class="block"></div>');
        $block.css('background-color', '#' + currentSwatch[Math.floor(Math.random() * 5)]);
        $rowDiv.append($block);
      }
      $pixelSwatch.append($rowDiv);
    }
    $('.swatch-section').append($pixelSwatch);
  }

  function showStriped(swatch) {
    $('.swatch-section').html('');
    var $swatchDiv = $('<div class="flex-container swatch"></div>');
    for (var i = 0; i < swatch.length; i++) {
        var $strip = $('<div class="strip"></div>');
        $strip.css("background-color", '#' + swatch[i]);
        $($swatchDiv).append($strip);
    }
    $('.swatch-section').append($swatchDiv);
  }
});
