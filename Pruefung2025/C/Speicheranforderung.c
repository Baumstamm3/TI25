#include <stdio.h>
#include <stdlib.h>

//https://www.guru99.com/de/c-dynamic-memory-allocation.html

int main(){
    int *ptr;
    ptr = malloc(15 * sizeof(*ptr)); /* a block of 15 integers */
    //sizeof(*ptr) sorgt für Unabhängig des sizeof vom Datentyp int. Damit ist eine einfache Änderung des Datentyps von *ptr möglich
        if (ptr != NULL) {
            *(ptr + 5) = 480; /* assign 480 to sixth integer */

            printf("Value of the 6th integer is %d", *(ptr + 5));
        }

    free(ptr);

    return 0;
}