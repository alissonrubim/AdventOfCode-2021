/*--------------------------
  Made at: 07-12-2021
  Dificulty: 5/10
  Time to solve: ~60min (~3h including time lost with day-6-2-out-of-memory.js)
  Solution explanation:
      When I tried to use an array, like in day-6-1.js, I get an `Out of Memory` error.
      To solve that, I came with a solution that counts how much number (from 0 to 8) has on the input, and then creates an array with 9 position (0 to 8) with the count of the numbers.
      So, every day, the numbers shift from right to left (<-), eg:

      Day 1: [0,1,2,0,0,1]
      Day 2: [1,2,0,0,1,0]
    
      And I handle the growph of the fishes at the end of the day.
---------------------------*/

var inputs = [1,4,3,3,1,3,1,1,1,2,1,1,1,4,4,1,5,5,3,1,3,5,2,1,5,2,4,1,4,5,4,1,5,1,5,5,1,1,1,4,1,5,1,1,1,1,1,4,1,2,5,1,4,1,2,1,1,5,1,1,1,1,4,1,5,1,1,2,1,4,5,1,2,1,2,2,1,1,1,1,1,5,5,3,1,1,1,1,1,4,2,4,1,2,1,4,2,3,1,4,5,3,3,2,1,1,5,4,1,1,1,2,1,1,5,4,5,1,3,1,1,1,1,1,1,2,1,3,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,4,5,1,3,1,4,4,2,3,4,1,1,1,5,1,1,1,4,1,5,4,3,1,5,1,1,1,1,1,5,4,1,1,1,4,3,1,3,3,1,3,2,1,1,3,1,1,4,5,1,1,1,1,1,3,1,4,1,3,1,5,4,5,1,1,5,1,1,4,1,1,1,3,1,1,4,2,3,1,1,1,1,2,4,1,1,1,1,1,2,3,1,5,5,1,4,1,1,1,1,3,3,1,4,1,2,1,3,1,1,1,3,2,2,1,5,1,1,3,2,1,1,5,1,1,1,1,1,1,1,1,1,1,2,5,1,1,1,1,3,1,1,1,1,1,1,1,1,5,5,1]
var maxDays = 256;
var counts = [];

for(var i=0; i<9;i++)
  counts[i] = inputs.filter(x => x==i).length;

console.info(`                  [0, 1, 2, 3, 4, 5, 6, 7, 8]`,);
for(var d=0; d<maxDays; d++){
  console.info(`Start day ${d}`, counts);
  var zeros = counts[0];
  for(var i=0; i<counts.length-1;i++)
      counts[i] = counts[i+1];
  counts[8] = zeros;
  counts[6] += zeros;
}

console.info("Total:", counts.reduce((c, v) => c + v, 0))
