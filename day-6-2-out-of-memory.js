//var inputs = [3,4,3,1,2]

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
