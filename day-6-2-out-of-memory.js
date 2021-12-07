/*--------------------------
 !!!!THIS IS NOT THE SOLUTION => LOOK FOR FILE day-6-2.js FOR THE SOLUTION

  Made at: 06-12-2021
  Dificulty: 5/10
  Time trying to solve: ~3h 
  Solution explanation:
      The ideia is create an array with all the fishes (like day-6-1.js). Each position at the array is one fish and the number represents his age.
      When the fish age reaches 0, I reset his age to 6 and push a new fish with age 8 at the end of the array.
      At the end, I just need to count how many array position I have.
      The problem is that the number grows so fast that breaks the maximum memory of javascript.

      So I decide to create buckets. Each bucked will contain a maximum number of fishes. When a bucked get full, I just create a new bucked and add the remaining fishes.
      The problem is that the buckets also grow super fast and breaks the memory of the javascript.
---------------------------*/

var inputs = [3,4,3,1,2]

var lastFullBucketIndex = 0; //Pra nao comecar sempre do 0
var maxBuckectSize = 10000000;
var buckets = [];
buckets[0] = [...inputs];

var maxDays = 250;


function addFish(bucketIndex, newFishes){
  if(buckets.length > maxBuckectSize){
    throw new Error("we have a problem")
  }
  if(newFishes > 0){ //Se tiver peixe pra adicionar
    console.info(`Try to add ${newFishes} fishes to bucket ${bucketIndex}`);
  
    if(!buckets[bucketIndex]) //Cria um novo
      buckets[bucketIndex] = [];


    var bucketSize = buckets[bucketIndex].length;
    if(bucketSize < maxBuckectSize){ //Ainda tem espaço
      var space = maxBuckectSize - bucketSize;
      //console.info(`Bucket ${bucketIndex} has space ${space}`);
      var spaceForFish = space > newFishes ? newFishes : space;
      for(var i=0; i< spaceForFish; i++){
        buckets[bucketIndex].push(8)
      }
      //console.info(`${spaceForFish} fisehs added to bucket ${bucketIndex}`);
      newFishes = newFishes - spaceForFish;

      addFish(bucketIndex + 1, newFishes)
    }else{
      //console.info(`Bucket ${bucketIndex} is full`);
      lastFullBucketIndex = bucketIndex;
      addFish(bucketIndex + 1, newFishes)
    }
  }
}

for(var d=0; d<maxDays; d++){
  var newFishes = 0;
  buckets.forEach((b, bi) => {
    b.forEach((f, fi) => {
      if(f == 0){
        b[fi] = 6;
        newFishes++
      }else{
        b[fi]--;
      }
    })
  });
  
  addFish(lastFullBucketIndex, newFishes);
}

var total = (buckets.length-1) * maxBuckectSize;
total += buckets[buckets.length-1].length;
console.info(total)
