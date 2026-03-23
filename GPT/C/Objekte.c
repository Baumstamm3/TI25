#include <stdio.h>

typedef struct {
    char name[20];
    int age;
} Person;

typedef union {
    char myChar;
    char myString[100];
    int myInteger;
} myUnion;

int main(){
    Person person1 = {"Justus", 23};
    Person person2 = {"Peter", 24};
    Person person3 = {"Bob", 666};

    printf("%s %s %s", person1.name, person2.name, person3.name);
    return 0;
}