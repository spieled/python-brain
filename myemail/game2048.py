from tkinter import *
from tkinter import messagebox
import random

root = Tk(className="2048")
root.geometry("320x360")

str_data = []
B_list = []
frame2 = Frame(root, borderwidth=10)
dic_color = {0: 'GhostWhite', 2: 'AliceBlue', 4: 'LightCyan', 8: 'Khaki', 16: 'SandyBrown', 32: 'Goldenrod',
             64: 'Orange', 128: 'Maroon', 256: 'Tomato', 512: 'OrangeRed', 1024: 'FireBrick', 2048: 'Red'}
list_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
left = 0
up = 1
right = 2
down = 3
direction_index = [[[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]],
                   [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]],
                   [[3, 2, 1, 0], [7, 6, 5, 4], [11, 10, 9, 8], [15, 14, 13, 12]],
                   [[12, 8, 4, 0], [13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3]]]

for i in range(16):
    str_data.append(StringVar())
    B_list.append(Button(frame2, width=4, height=2, textvariable=str_data[i], font=("Courier 20 bold roman",),
                         bg=dic_color[0]))
    B_list[i].grid(row=int(i / 4), column=int(i % 4))


def can_move(direction, index):
    for num in range(1, 4):
        if list_data[direction_index[direction][index][num]] == list_data[direction_index[direction][index][num - 1]]:
            return True
        if list_data[direction_index[direction][index][num]] != 0 and \
                        list_data[direction_index[direction][index][num - 1]] == 0:
            return True
    return False


def deal_space(direction, index):
    for num in [3, 2, 1]:
        if list_data[direction_index[direction][index][num]] == 0:
            continue
        if list_data[direction_index[direction][index][num - 1]] == 0:
            j = num
            while (j < 4):
                list_data[direction_index[direction][index][j - 1]] = list_data[direction_index[direction][index][j]]
                list_data[direction_index[direction][index][j]] = 0
                j += 1


def deal_equal_num(direction, index):
    for num in [0, 1, 2]:
        if list_data[direction_index[direction][index][num]] == list_data[direction_index[direction][index][num + 1]]:
            list_data[direction_index[direction][index][num]] *= 2
            list_data[direction_index[direction][index][num + 1]] = 0


def move(direction, index):
    deal_space(direction, index)
    deal_equal_num(direction, index)
    deal_space(direction, index)


def refresh():
    for num in range(16):
        B_list[num].configure(bg=dic_color[list_data[num]])
        if list_data[num] == 0:
            str_data[num].set("")
            continue
        str_data[num].set(str(list_data[num]))


def key_event(event):
    can_move_list = []
    direction_code = 9
    global list_data

    if event.keycode == 37:
        direction_code = left
    if event.keycode == 39:
        direction_code = right
    if event.keycode == 38:
        direction_code = up
    if event.keycode == 40:
        direction_code = down

    for num in range(4):
        if can_move(direction_code, num):
            move(direction_code, num)
            can_move_list.append(num)

    if len(can_move_list) == 0:
        return
    list_data[direction_index[direction_code][can_move_list[random.randint(0, len(can_move_list) - 1)]][3]] = 2
    refresh()
    for i_direction in range(4):
        for i_index in range(4):
            if can_move(i_direction, i_index):
                return
    messagebox.showinfo('Game Over', 'Your score is %u.\n' % sum(list_data))
    list_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    refresh()


frame2.bind('<KeyRelease>', key_event)
frame2.pack()
frame2.focus_set()
root.mainloop()
