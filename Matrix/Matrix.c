#include <stdio.h>

int transponieren(int matrix[][2]){
    int ergebnis[sizeof(matrix[0]) / sizeof(matrix[0][0])][sizeof(matrix) / sizeof(matrix[0])];
  int length = sizeof(matrix) / sizeof(matrix[0]);

  for(int i = 0; i < length; i++){
    for(int j = 0; j < sizeof(matrix[i]) / sizeof(matrix[i][0]); j++){
      ergebnis[j][i] = matrix[i][j]
    }
  }
  return ergebnis;
}

int main(){
  	int matrix1[3][2] = {
  		{1,2},
  		{3,4},
  		{5,6}
	  };

int matrix2[2][3] = transponieren(matrix1);
  
  for(int i = 0; i < 2; i++) {
      for(int j = 0; j < 3; j++) {
          printf("%d ", matrix2[i][j]);
      }
      printf("\n");
  } 
}