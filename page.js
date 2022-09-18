fill();

function fill(){
  fetch('http://localhost:6969/track/?search&index=0&size=20', {method: 'GET'})
  .then((response) => response.json())
  .then((data) => {
    for(let i=0; i<data.length; i++){
      createTrack(data[i]["cover"], data[i]["path"], data[i]["title"]);
    }
  })
}

function burger(menu) {
  menu.classList.toggle("change");
} 

function createTrack(imgSrc, songSrc, title){
  //create the track element
  const track = document.createElement('div');
  track.classList.add('track');
  // create cover element
  const cover = document.createElement('img');
  cover.setAttribute("id", songSrc);
  cover.classList.add('cover');
  cover.src = `http://localhost:6969/album/cover/${imgSrc}`;
  // create the title
  const text = document.createElement('p');
  text.classList.add('text');
  text.textContent = title
  // put cover and title inside track
  track.appendChild(cover);
  track.appendChild(text);
  // add event listener to change track
  cover.addEventListener("mousedown", (e)=> {
    let songSrc = (e.target.id);
    let source = document.getElementById("source");
    source.src = `http://localhost:6969/stream/download/${songSrc}`;
    let audio = document.getElementById("audio");
    audio.load()
    audio.play()
  });
  const content = document.getElementById("content");
  content.appendChild(track);
}