function myFunction() {
  // onclick stuff
    console.log("TESTING");
}

export function tag (_tag, _text, _id, _onclick) {
  let tag = document.createElement(_tag);
  tag.innerHTML = _text;
  if(_id){tag.id = _id};
  // if(_onclick){tag.addEventListener('click', function(){_onclick})};
  if(_onclick){
    tag.type = "button";
    // tag.onclick = myFunction;
    tag.onclick = _onclick;
  };
  return tag;
}
// var newTH = document.createElement('th');
// newTH.innerHTML = 'Hello, World!';
// newTH.onclick = function(){
//   this.parentElement.removeChild(this);
// };
// var table = document.getElementById('content');
// table.appendChild(newTH);
