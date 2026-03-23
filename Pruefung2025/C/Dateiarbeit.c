#include <stdio.h>

int main(){
    //https://www.w3schools.com/c/c_files.php
    FILE *test;
    //write
    test = fopen("dummyfile.txt", "w");

    fprintf(test, "Hello ");

    fclose(test);
    //append
    test = fopen("dummyfile.txt", "a");

    fprintf(test, "World!");

    fclose(test);
    //read
    test = fopen("dummyfile.txt", "r");

    if(test != NULL){
        char myString[100];

        while(fgets(myString, 100, test)) {
            printf("%s", myString);
        }

    }

    fclose(test);
    return 0;
}