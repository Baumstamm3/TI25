with open("dummyfile.txt", "r") as dummyfile:
    data = dummyfile.read(64)

file = open("dummyfile.txt", "r")
# r - read
# w - (over)write
# a - append
# x - create file

data = file.read()
data = file.readline()

file.close
print(data)