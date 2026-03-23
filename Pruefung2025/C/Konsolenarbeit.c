#include <stdio.h>

// Compile first, then call the programm with:
// ./C/Konsolenarbeit [Argumente]

int main(int argc, char **argv){
    
    printf("You have entered %d arguments:\n", argc);

    for (int i = 1; i < argc; i++) {
        printf("%s\n", argv[i]);
    }

    return 0;
}