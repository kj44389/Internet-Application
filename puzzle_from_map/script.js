var mymap = 0;
const promise = Notification.requestPermission();
function loading() {
  mymap = L.map("mapid").setView([51.505, -0.09], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      renderer: L.canvas(),
      preferCanvas: true,
      accessToken:
        "pk.eyJ1Ijoia3VkemlhazI0MDAiLCJhIjoiY2tnMjFwNng0MGVqejJybjFsYXllNjExMiJ9.eWrfri86vyGY1zVkKKU-4A",
    }
  ).addTo(mymap);
  //create grid for puzzle
  for (let x = 0; x < 16; x++) {
    document.getElementById("test2").innerHTML +=
      '<div class="drag_space" id="id' +
      (x + 1) +
      'd" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';
  }
}
function changeLoc(position) {
  mymap.setView([position.coords.latitude, position.coords.longitude], 13);
  L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
  document.getElementsByTagName("input")[0].removeAttribute("disabled");
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function GetPuzzle(position) {
  //change dispay from none to flex
  document.getElementById("test").style.display = "flex";
  document
    .getElementsByTagName("input")[1]
    .setAttribute("disabled", "disabled");
  leafletImage(mymap, function (err, canvas) {
    //get raster
    let rasterMap = document.getElementById("rasterMap");
    let rasterContext = rasterMap.getContext("2d");
    let scale = window.devicePixelRatio;
    rasterMap.width = Math.floor(512 * scale);
    rasterMap.height = Math.floor(512 * scale);
    rasterContext.scale(scale, scale);
    rasterContext.drawImage(canvas, 0, 0, 512, 512);

    //puzzle block
    let puzzle = new Array();
    let puzzle_count = 16;
    let width = rasterMap.width / Math.sqrt(puzzle_count);
    let height = rasterMap.height / Math.sqrt(puzzle_count);
    let counter = 0;
    for (let i = 0; i < Math.sqrt(puzzle_count); i++) {
      for (let j = 0; j < Math.sqrt(puzzle_count); j++) {
        let block = document.createElement("canvas");
        counter += 1;
        //set canvas attributes
        block.width = width;
        block.height = height;
        block.draggable = true;
        block.id = "id" + counter;
        let blockContext = block.getContext("2d");
        blockContext.drawImage(
          rasterMap,
          j * width,
          i * height,
          width,
          height,
          0,
          0,
          width,
          height
        );
        //add node to array
        puzzle[counter] = block;
      }
    }
    //delete first none element from array
    puzzle.splice(0, 1);
    //start appending parts in random order
    for (let k = 0; k < 16; k++) {
      let x = -1;
      while (x < 0) {
        x = getRandomInt(0, puzzle.length);
        document.getElementById("test").appendChild(puzzle[x]);
        puzzle.splice(x, 1);
      }
    }
    //add dragable attributes to canvas (first [0] is raster one thats why +1)
    let x = document.getElementsByTagName("canvas");
    for (let k = 0; k < 16; k++) {
      console.log(x[k + 1]);
      x[k + 1].setAttribute("ondragstart", "drag(event)");
    }
  });
}
function checkifComplete(promise) {
  let handler = document.getElementsByClassName("drag_space");
  let counter = 0;
  for (let i of handler) {
    //get id from div
    let first_id = i.id;
    let second_id;
    //if div have puzzle inside
    if (i.childNodes.length > 0) {
      let x = i.childNodes;
      //get id from puzzle
      second_id = x[0].id;
      //get div id format
      if (first_id == second_id + "d") {
        counter += 1;
      }
    } else {
      continue;
    }
  }
  //if puzzle map is full and correct
  if (counter == 16) {
    //show notification
    promise.then(function (result) {
      if (result === "granted") {
        var text = "Gratulacje ułożyłeś puzzle!.";
        var notification = new Notification("Puzzle ułożone", { body: text });
      }
    });
  }
}
//Drag n drop events
function backtocanvas(data) {
  document.getElementById("test").appendChild(document.getElementById(data));
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.childNode === undefined && ev.target.parentNode.id == "test2") {
    ev.target.appendChild(document.getElementById(data));
    if (ev.target.id == data + "d") {
      document.getElementById(data).setAttribute("draggable", "false");
    }
  } else {
    backtocanvas(data);
  }

  checkifComplete(promise);
}
//get location from browser
function getLocation() {
  document
    .getElementsByTagName("input")[0]
    .setAttribute("disabled", "disabled");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(changeLoc);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
