from flask import Flask, render_template, Response, request
import time
import sys, os
import requests
import threading
import os
from bluetooth import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html') #you can customze index.html here

def gen(camera):
#get camera frame
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(pi_camera), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/photo')
def photo():
    Picture.execute_camera()
    Picture.fileUpload(file)

@app.route('/motor')
def motor():
    blue('3')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
