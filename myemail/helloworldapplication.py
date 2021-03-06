__author__ = '刘少平'

import tkinter as tk


class Application(tk.Frame):
    def __init__(self, master):
        tk.Frame.__init__(self, master)
        self.pack()
        self.create_widgets()

    def create_widgets(self):
        self.hi_there = tk.Button(self)
        self.hi_there['text'] = 'Hello World\n(click me)'
        self.hi_there['command'] = say_hi
        self.hi_there.pack(side='top')

        self.QUIT = tk.Button(self, text='QUIT', fg='red', command=root.destroy)
        self.QUIT.pack(side='bottom')


def say_hi():
    print('hi there, everyone')

root = tk.Tk()
app = Application(master=root)
app.mainloop()