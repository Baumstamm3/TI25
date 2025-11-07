#include <stdio.h>

int main(){
  int matrix1[] = {
  {1,2},
  {3,4},
  {5,6}
};

int matrix2[] = transponieren(matrix1)
  
for(int i = 0; i < sizeof(matrix2)/sizeof(matrix[0]); i++) {
    for(int j = 0; j < sizeof(matrix2[0])/sizeof(matrix[0][0]); j++) {
        printf("%d ", array[i][j]);
    }
    printf("\n");
} 
}

int transponieren(int matrix){
  int ergebnis[]
  
  for(int i = 0; i < sizeof(matrix[0]) / sizeof(matrix[0][0]); i++){
    ergebnis[i] = {}
  }

  int length = sizeof(matrix) / sizeof(matrix[0])
  
  for(int i = 0; i < length; i++){
    for(int j = 0; j < sizeof(matrix[i]) / sizeof(matrix[i][0]); j++){
      ergebnis[j][i] = matrix[i][j]
    }
  }
  return ergebnis
}