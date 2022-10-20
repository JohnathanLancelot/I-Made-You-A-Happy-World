from flask import Flask, render_template, url_for, make_response, request

app = Flask(__name__)

# The home / starting page:
@app.route("/")
def index():
    return render_template("index.html")

# The new game / load game page:
@app.route("/load-or-new")
def loadOrNew():
    return render_template("load-or-new.html")

# The in-game menu page:
@app.route("/menu")
def menu():
    return render_template("menu.html")

# The first hallway:
@app.route("/hallway1")
def hallway1():
    return render_template("hallway1.html")

# The bear room:
@app.route("/bear-room")
def bearRoom():
    return render_template("bear-room.html")

# The escape room:
@app.route("/escape")
def escapeRoom():
    return render_template("escape-room.html")

# The beach room:
@app.route("/beach")
def beachRoom():
    return render_template("beach.html")

# The hallway with a key:
@app.route("/key-hall")
def keyHall():
    return render_template("key-hall.html")

# The mirror room:
@app.route("/mirror-room")
def mirrorRoom():
    return render_template("mirror-room.html")

# The Phantasm room:
@app.route("/phantasm-room")
def phantasmRoom():
    return render_template("phantasm-room.html")

#Set cookie for keys
@app.route('/setcookie', methods=['POST', 'GET'])
def setcookie():
    if request.method == 'POST':
        key1 = request.form['key1']
        key2 = request.form['key2']

    resp = make_response(render_template('beach.html'))
    resp.set_cookie('key1', key1)
    resp.set_cookie('key2', key2)

    return resp

#Get cookies for keys
@app.route('/getcookie')
def getcookie():
   key1 = request.cookies.get('key1')
   key2 = request.cookies.get('key2')
   return key1, key2


if __name__ == '__main__':
    app.run(debug = True)
