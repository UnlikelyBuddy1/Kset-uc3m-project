fill();

function fill(){
  let content = document.getElementById("content");
  fetch('https://kset.home.asidiras.dev/track/?search&index=0&size=999', {method: 'GET'})
  .then((response) => response.json())
  .then((data) => {
    data.sort(function(a, b) {
      let keyA = a.title.toUpperCase();
      let keyB = b.title.toUpperCase();
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    let prevletter = ""
    for(let i=0; i<data.length; i++){
      let letter = isNaN(data[i]["title"][0])? data[i]["title"][0].toUpperCase(): "number"
      if(prevletter != letter){
        prevletter = letter;
        const section = document.createElement('h3');
        section_text = document.createTextNode(`Songs starting with ${letter}`);
        section.appendChild(section_text);
        section.classList.add('text');
        section.classList.add('section');
        content.appendChild(section);
      }
      createTrack(data[i]["cover"], data[i]["path"], data[i]["title"]);
    }
    const spacer = document.createElement('div');
    spacer.classList.add('spacer');
    content.appendChild(spacer);
  })
}
window.addEventListener('resize', function(event){
  const width = window.innerWidth;
  if(width>1024){
    let sidebar = document.getElementById('left-column')
    let footer = document.getElementById('footer')
    sidebar.style = null;
    footer.style = null;
  }
});
function burger(menu) {
  menu.classList.toggle("change");
  let sidebar = document.getElementById('left-column')
  let footer = document.getElementById('footer')
  if (sidebar.style.display === "block") {
    sidebar.style.display = "none";
    footer.style.display = "flex";
  } else {
    sidebar.style.display = "block";
    footer.style.display = "none";
  }
} 

function createTrack(imgSrc, songSrc, title){
  //create the track element
  const track = document.createElement('div');
  track.classList.add('track');
  // create cover element
  const cover = document.createElement('img');
  cover.setAttribute("id", `${songSrc}|${imgSrc}`);
  cover.setAttribute("loading", "lazy");
  cover.classList.add('cover');
  cover.src = `https://kset.home.asidiras.dev/album/cover/${imgSrc}`;

  const playWrapper = document.createElement('div');
  playWrapper.classList.add('play-wrapper');
  const play = document.createElement('img');
  play.setAttribute("loading", "lazy");
  play.classList.add('play');
  play.src = "assets/play.webp";
  playWrapper.appendChild(play);
  // create the title
  const text = document.createElement('p');
  text.classList.add('title');
  text.textContent = title
  // put cover and title inside track
  track.appendChild(playWrapper);
  track.appendChild(cover);
  track.appendChild(text);
  
  // add event listener to change track
  cover.addEventListener("mousedown", (e)=> {
    let id = (e.target.id);
    const songSrc = id.split('|')[0];
    const imgSrc = id.split('|')[1];
    let source = document.getElementById("source");
    source.src = `https://kset.home.asidiras.dev/stream/download/${songSrc}`;
    let miniCover = document.getElementById("miniCover");
    miniCover.src = `https://kset.home.asidiras.dev/album/cover/${imgSrc}`;
    let audio = document.getElementById("audio");
    audio.load()
    audio.play()
  });
  const content = document.getElementById("content");
  content.appendChild(track);
}