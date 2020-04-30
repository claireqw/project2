document.addEventListener('DOMContentLoaded', function() {



  if (localStorage.getItem('chID')) {
    id = localStorage.getItem('chID');
    console.log(`http://127.0.0.1:5000/channel/${id}`);

    window.location = `http://127.0.0.1:5000/channel/${id}`;

    // console.log("I should be somewhere");
    // console.log(id);
  }

  if (!localStorage.getItem('displayname')) {
    var div = document.createElement('div');
    div.innerHTML = document.querySelector('#username').innerHTML;
    document.querySelector('#getname').appendChild(div);

    document.querySelector('#namebutton').onclick = function() {
      var name = document.getElementById("name").value;
      localStorage.setItem('displayname', name);
      document.querySelector('#getname').innerHTML = "Welcome, " + name + "!";
      const request = new XMLHttpRequest();
      request.open('POST', '/name');
      const data = new FormData();
      data.append('displayname', name);
      request.send(data);
      return false;
    }


  }




});
