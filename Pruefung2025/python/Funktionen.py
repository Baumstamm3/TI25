def funktion():
    pass #Platzhalterfunktion

def summe(*a): # a als Tupel
    # This feels like cheating and i love it 
    sum = 0
    for number in a:
        sum += number
    return sum

def funktion2(a, *b, **c): # a als variable, b als Tupel, c als dictionary
    pass
