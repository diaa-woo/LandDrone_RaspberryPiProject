from bluetooth import *

class blue(char msg):
    msg = input("send message : ")
    socket.send(msg)

    print("finished")
    socket.close()
