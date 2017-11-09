let request = new XMLHttpRequest();
request.open("GET", "messages.json", false);
request.send(null)
let my_JSON_object = JSON.parse(request.responseText);
//let my_JSON_object = JSON.parse('{"asdf": "qwer", "value": 1243}');
//alert (my_JSON_object.result.constructor);
let p = document.getElementById('elem');
//p.innerHTML = request.responseText;
console.log(request.responseText.length);
