#!/usr/bin/python
import time
from tkinter import *
from threading import Timer
try:
        import RPi.GPIO as GPIO
        has_raspberry = True
except:
        has_raspberry = False

def monitor():
	print("monitor")
	GPIO.setup(12,GPIO.OUT) #x0
	GPIO.setup(16,GPIO.OUT) #x1 
	GPIO.setup(20,GPIO.OUT) #x2
	GPIO.setup(21,GPIO.OUT) #x3
	GPIO.setup(9,GPIO.IN)   #S1
	GPIO.setup(11,GPIO.IN)  #S2
	GPIO.setup(5,GPIO.IN)   #S3
	GPIO.setup(6,GPIO.IN)   #S4
	GPIO.setup(13,GPIO.IN)  #S5
	GPIO.setup(19,GPIO.IN)  #S6
	GPIO.setup(26,GPIO.IN)  #S7
	
	while hw.get():
		#output pins ansteuern
		if pin0.get():
				GPIO.output(12,GPIO.HIGH)
		else:
				GPIO.output(12,GPIO.LOW)
		if pin0.get():
				GPIO.output(16,GPIO.HIGH)
		else:
				GPIO.output(16,GPIO.LOW)		
		if pin0.get():
				GPIO.output(20,GPIO.HIGH)
		else:
				GPIO.output(20,GPIO.LOW)
		if pin0.get():
				GPIO.output(21,GPIO.HIGH)
		else:
				GPIO.output(21,GPIO.LOW)
		time.sleep(0.2)
		# segmente ansteuern
		if GPIO.input(9):
			can.itemconfig(segmente[0],fill="red")
		else:
			can.itemconfig(segmente[0],fill="lightgrey")
		if GPIO.input(11):
			can.itemconfig(segmente[1],fill="red")
		else:
			can.itemconfig(segmente[1],fill="lightgrey")
		if GPIO.input(5):
			can.itemconfig(segmente[2],fill="red")
		else:
			can.itemconfig(segmente[2],fill="lightgrey")
		if GPIO.input(6):
			can.itemconfig(segmente[3],fill="red")
		else:
			can.itemconfig(segmente[3],fill="lightgrey")
		if GPIO.input(13):
			can.itemconfig(segmente[4],fill="red")
		else:
			can.itemconfig(segmente[4],fill="lightgrey")
		if GPIO.input(19):
			can.itemconfig(segmente[5],fill="red")
		else:
			can.itemconfig(segmente[5],fill="lightgrey")
		if GPIO.input(26):
			can.itemconfig(segmente[6],fill="red")
		else:
			can.itemconfig(segmente[6],fill="lightgrey")
	
def refresh():
	if hw.get():
		print("raspberry ist aktiv")
	else:
		set_grey()
		if evaluate(en1.get()):
			can.itemconfig(segmente[0],fill="red")
		else:
			can.itemconfig(segmente[0],fill="lightgrey")
		if evaluate(en2.get()):
			can.itemconfig(segmente[1],fill="red")
		else:
			can.itemconfig(segmente[1],fill="lightgrey")
		if evaluate(en3.get()):
			can.itemconfig(segmente[2],fill="red")
		else:
			can.itemconfig(segmente[2],fill="lightgrey")
		if evaluate(en4.get()):
			can.itemconfig(segmente[3],fill="red")
		else:
			can.itemconfig(segmente[3],fill="lightgrey")
		if evaluate(en5.get()):
			can.itemconfig(segmente[4],fill="red")
		else:
			can.itemconfig(segmente[4],fill="lightgrey")
		if evaluate(en6.get()):
			can.itemconfig(segmente[5],fill="red")
		else:
			can.itemconfig(segmente[5],fill="lightgrey")
		if evaluate(en7.get()):
			can.itemconfig(segmente[6],fill="red")
		else:
			can.itemconfig(segmente[6],fill="lightgrey")
		print("raspberry ist nicht aktiv")
def highlight(index):
	set_grey()
	can.itemconfig(segmente[index],fill="yellow")	

def set_grey():
	for i in segmente:
		can.itemconfig(i,fill="lightgrey")

def switch():
	if hw.get() and has_raspberry:
		print("starte monitoring der pins")
		t = Timer(1,monitor)
		t.start()
	else:
		if has_raspberry:
			print("stoppe thread")
			mode="e"
def evaluate(condition):
	cond = condition.split("or")
	ret = False
	for i in cond:
		i=i.rstrip(" ").lstrip(" ")
		if i!="":
			if ret:
				return True
			else:
				bed =i.split(" ")
				for j in bed:
					v = j.split('=')
					if int(v[1]) == pins[int(v[0][1])].get():
						ret = True
					else:
						ret = False
						break
		 
	return ret
def init_canvas():
				
				segmente.append(can.create_polygon(80,30,110,60,110,150,80,180,50,150,50,60,80,30, fill="lightgrey"))
				segmente.append(can.create_polygon(80,182,110,212,110,302,80,332,50,302,50,212,80,182, fill="lightgrey"))

				
				segmente.append(can.create_polygon(280,30,310,60,310,150,280,180,250,150,250,60,280,30, fill="lightgrey"))
				segmente.append(can.create_polygon(280,182,310,212,310,302,280,332,250,302,250,212,280,182, fill="lightgrey"))

				segmente.append(can.create_polygon(85,25,105,5,245,5,275,25,245,55,115,55,85,25, fill="lightgrey"))
				segmente.append(can.create_polygon(85,180,105,160,245,160,275,180,245,210,115,210,85,180, fill="lightgrey"))
				segmente.append(can.create_polygon(85,335,105,315,245,315,275,345,245,365,110,370,80,340, fill="lightgrey"))

root = Tk()
hw=IntVar()
hw.set(0)
pin0=IntVar()
pin1=IntVar()
pin2=IntVar()
pin3=IntVar()

en1=StringVar()
en2=StringVar()
en3=StringVar()
en4=StringVar()
en5=StringVar()
en6=StringVar()
en7=StringVar()
en1.trace("w", lambda name, index, mode, en1=en1: highlight(0))
en2.trace("w", lambda name, index, mode, en1=en1: highlight(1))
en3.trace("w", lambda name, index, mode, en1=en1: highlight(2))
en4.trace("w", lambda name, index, mode, en1=en1: highlight(3))
en5.trace("w", lambda name, index, mode, en1=en1: highlight(4))
en6.trace("w", lambda name, index, mode, en1=en1: highlight(5))
en7.trace("w", lambda name, index, mode, en1=en1: highlight(6))

pins = [pin0,pin1,pin2,pin3]
segmente = []
root.geometry('400x600')
can = Canvas(root,width=400,height=400)
can.pack()
init_canvas()
fr = Frame(root)
fr.pack()

pin0 = Checkbutton(fr,text='Pin0',command=refresh,variable=pin0)
pin0.grid(row=0,column=2)
pin1 = Checkbutton(fr,text='Pin1',command=refresh,variable=pin1)
pin1.grid(row=1,column=2)
pin2 = Checkbutton(fr,text='Pin2',command=refresh,variable=pin2)
pin2.grid(row=2,column=2)
pin3 = Checkbutton(fr,text='Pin3',command=refresh,variable=pin3)
pin3.grid(row=3,column=2)
rasp = Checkbutton(fr,text='Raspberry',variable=hw,command=switch)
rasp.grid(row=4,column=2)
lab1 = Label(fr,text="Segment1")
lab1.grid(row=0,column=0)

lab1 = Label(fr,text="Segment2")
lab1.grid(row=1,column=0)
lab1 = Label(fr,text="Segment3")
lab1.grid(row=2,column=0)
lab1 = Label(fr,text="Segment4")
lab1.grid(row=3,column=0)
lab1 = Label(fr,text="Segment5")
lab1.grid(row=4,column=0)
lab1 = Label(fr,text="Segment6")
lab1.grid(row=5,column=0)
lab1 = Label(fr,text="Segment7")
lab1.grid(row=6,column=0)
ent1 = Entry(fr,textvariable=en1)
ent1.grid(row=0,column=1)
ent2 = Entry(fr,textvariable=en2)
ent2.grid(row=1,column=1)
ent3 = Entry(fr,textvariable=en3)
ent3.grid(row=2,column=1)
ent4 = Entry(fr,textvariable=en4)
ent4.grid(row=3,column=1)
ent5 = Entry(fr,textvariable=en5)
ent5.grid(row=4,column=1)
ent6 = Entry(fr,textvariable=en6)
ent6.grid(row=5,column=1)
ent7 = Entry(fr,textvariable=en7)
ent7.grid(row=6,column=1)
root.mainloop()

