document.addEventListener('DOMContentLoaded', () => {
  var id = document.querySelector('#channelid').innerHTML;
  localStorage.setItem('chID', id);
  console.log(id);

  var socket = io();

  socket.on('connect', () => {
    socket.send("I am connected");
  });

  socket.on('message', data => {
    const p = document.createElement('p');
    const br = document.createElement('br');
    p.innerHTML = data;
    document.querySelector('#msg-display').append(p);
    console.log(`Message received: ${data}`);
  });

  socket.on('announce msg', data => {
      const li = document.createElement('li');
      li.innerHTML = `${data.message} <button class="react btn btn-link">✩</button><br><small class="text-muted">${data.user} ${data.date}</small>`;
      li.setAttribute("class", "list-group-item");
      document.querySelector('#msg-display').append(li);
  });

  document.querySelectorAll('.msg').forEach(function(element) {
    // console.log("helloooo");
    var starred = localStorage.getItem('starred');
    var ind = starred.indexOf('|');
    var prev = 0;
    while (ind != -1) {
      var html = starred.substring(prev, ind);
      // console.log("this is where it's at");
      // console.log(html);
      // console.log("here is the html in msg");
      // console.log(element.innerHTML);
      if (element.innerHTML === html) {
        // console.log("yay!");
        element.innerHTML = html + "✩";
      }
      prev = ind + 1;
      ind = starred.indexOf('|', ind+1);
    }


  });
  //
  //
  document.querySelectorAll('.react').forEach(button => {
    button.onclick = () => {
      // console.log("hopefully this shows up");
      html = button.parentElement.innerHTML;

      if (!localStorage.getItem('starred')) {
        localStorage.setItem('starred', html + "|");
      } else {
        localStorage.setItem('starred', localStorage.getItem('starred') + html + "|");
      }
      // console.log(html);
      button.parentElement.innerHTML = html + "✩";

    }
  });

  document.querySelector('#sendMsg').onclick = () => {
    console.log("clicked!");
    value = document.querySelector('#userMsg').value;
    var date = new Date();
    console.log(date);
    socket.emit('send msg', {'message': value, 'date': date});
    document.querySelector('#userMsg').value = "";
  };



});

document.addEventListener('click', event => {
  const element = event.target;
  if (element.className === 'react') {
    console.log("I wanna react");
    // element.parentElement.remove();
  }
});
