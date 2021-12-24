from picamera import PiCamera
from time import sleep
import datetime
import sys, os
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from uuid import uuid4
import schedule

class CameraPictrue:
    PROJECT_ID = "landdroneproject"


    cred = credentials.Certificate("/home/pi/pi-camera-stream-flask/landdroneproject-firebase-adminsdk-8fwv3-bdc47360c0.json")
    default_app = firebase_admin.initialize_app(cred, {'storageBucket':f"{PROJECT_ID}.appspot.com"})

    bucket = storage.bucket()
    
    def execute_camera():
    
        basename = "photo"
        suffix = datetime.datetime.now().strftime("%Y%m%d_%H%M%S") + '.png'
        filename = "_".join([basename, suffix])
    
        camera = PiCamera()
        camera.resolution = (640, 480)
        camera.start_preview()
    
        sleep(1)
    
        camera.capture('/home/pi/image_store/' + filename)
        fileUpload(filename)
        camera.stop_preview()
        camera.close()

    def fileUpload(file):
        blob = bucket.blob('image_store/'+file)
    
        new_token = uuid4()
        metadata = {"firebaseStorageDownloadTokens": new_token}
        blob.metadata = metadata
    
        blob.upload_from_filename(filename='/home/pi/image_store/'+file, content_type='image/png')
