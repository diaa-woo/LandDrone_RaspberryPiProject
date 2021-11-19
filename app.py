from flask import Flask, render_template, Response
from camera import Camera
import picamera import PiCamera
from time import sleep

app = Flask(__name__)

@app.route('/')
def index():
   return render_template('index.html')

def gen(camera):
   while True:
       frame = camera.get_frame()
       yield (b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
@app.route('/video_feed')
def video_feed():
   return Response(gen(Camera()),
                   mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/picture')                # '/picture'주소로 접속하면 실행됨
def taking_picture():                # '/picture'주소로 접속하면 실행되는 함수
    camera = PiCamera()             # 카메라 객체 생성
    camera.capture('/home/pi/webapp/static/image/picture.jpg')     #사진을 찍어서 static/image/picture.jpg로 저장
    sleep(2)                                                       # 2초간 대기
    camera.close()                                                  # 카메라 해제
    return redirect(url_for('home'))            #기본페이지인 '/'주소로 복귀
if __name__ == '__main__':
   app.run(host='0.0.0.0', debug = True, threaded = True)
