import os

from flask import Flask, render_template, request, session, jsonify
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"
socketio = SocketIO(app)

class Channel:
    def __init__(self, id, name, messages):
        self.id = id
        self.name = name
        self.messages = messages

class Message:
    def __init__(self, username, time, content):
        self.username = username
        self.time = time
        self.content = content

currCh = 1
m = Message("defaultuser", "12:03", "Welcome to the default channel!")
channels = [Channel(0, "default", [m])]

@app.route("/")
@app.route("/index", methods=["GET", "POST"])
def index():
    if request.method == 'GET':
        return render_template("index.html", channels = channels)
    else:
        ch = request.form.get("nameCh")
        for channel in channels:
            if ch == channel.name:
                return render_template("index.html", displayAl=True, alert="There already exists a channel with that name.", channels = channels)
        count = len(channels)
        channels.append(Channel(count, ch, []))
        return render_template("index.html", channels = channels)

@app.route("/name", methods = ['POST'])
def name():
    session["name"] = request.form.get("displayname")
    session["messages"] = []
    # print(f"potat{session["messages"]}"")
    return jsonify({"success": True})

@app.route("/remember", methods = ['POST'])
def remember():
    id = request.form.get('chID')
    global currCh
    currCh = id
    return jsonify({"success": True})
    # render_template("channel.html", channel=channels[id], name=session["name"], channels=channels)

@app.route("/channel/<int:id>")
def openCh(id):
    global currCh
    currCh = id
    print(id)
    # print("open channel")
    return render_template("channel.html", channel=channels[id], channels=channels)


@socketio.on("send msg")
def send(data):
    # print("voted")
    msg = data["message"]
    date = data["date"]
    user = session["name"]
    parsed = date[11:16]
    # print(parsed)
    # channels[currCh].messages.append(Message("idk who sent this", "some time AM", msg))
    emit("announce msg", {"user": user, "message": msg, "date": parsed}, broadcast=True)

    newMsg = Message(user, parsed, msg)
    session["messages"].append(newMsg)

    channels[currCh].messages.append(newMsg)

    if len(channels[currCh].messages) > 100:
        channels[currCh].messages.pop()
    # print(f"\n\n new Msg {newMsg}")
    # print(currCh)



@socketio.on('message')
def message(data):
    print(f"\n\n{data}\n\n")
    send(data)
    # emit('some-event', 'this is a custom event message')

if __name__ == '__main__':
    count=0
    # app.run()
    socketio.run(app, debug=True)
