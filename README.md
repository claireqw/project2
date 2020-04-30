# Project 2

Web Programming with Python and JavaScript

This is a chat application called Flack. application.py sets up Flask, SocketIO, and the different routes and events. index.html is displayed when a user first opens the site, and they are prompted to enter a name. They can also access the list of existing channels and create a new channel. index.js handles prompting the user for their name the first time they open the site and not otherwise, as well as storing the name. channel.html is for each individual channel, and display all the existing messages in the channel. channel.js handles sending and receiving messages through the socket, and also the star feature. Users have the option to star a particular message for their own use, to easily reference it and come back to it later.
