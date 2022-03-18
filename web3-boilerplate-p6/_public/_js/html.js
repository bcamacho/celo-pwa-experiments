export function tag (_tag, _text, _id, _onclick) {
  let tag = document.createElement(_tag);
  tag.innerHTML = _text;
  if(_id){tag.id = _id};
  // if(_onclick){tag.addEventListener('click', function(){_onclick})};
  if(_onclick){
    tag.type = "button";
    tag.onclick = _onclick;
  };
  return tag;
}
