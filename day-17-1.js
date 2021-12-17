/*--------------------------
  Made at: 17-12-2021
  Dificulty: 2/10
  Time to solve: ~40min
  Solution explanation: 
     My solution was a bit more fancy that it suposed to be, but will help on the day-17-2.
     The idea is get an array with ALL the paths that the probe har traveled.
     If I hit the target, then one of the paths will have a `hitTarget` property as true.
     Then to get the higher value, I just do a reduce on `y` for all the collection paths that has a `hitTarget`
---------------------------*/


//# Oficial data
//target area: x=240..292, y=-90..-57
var target = [
  { x: 240, y: -90 },
  { x: 292, y: -57 }
]

//# Test data
//target area: x=20..30, y=-10..-5
/*var target = [
  { x: 20, y: -10 },
  { x: 30, y: -5 }
]*/

function getProblePaths(initX, initY) {
  var probeVel = { x: initX, y: initY }
  var probePos = { x: 0, y: 0 }
  var outOfBounds = false;
  var hitTarget = false;
  var probePath = [];
  probePath.push({ x: probePos.x, y: probePos.y });
  while(!outOfBounds && !hitTarget){
    probePos.x += probeVel.x;
    probePos.y += probeVel.y;

    probePath.push({ x: probePos.x, y: probePos.y });

    if(probeVel.x != 0){
      probeVel.x += probeVel.x > 0 ? -1 : 1;
    }

    probeVel.y += -1;

    outOfBounds = probePos.y < target[1].y
    hitTarget = probePos.x >= target[0].x && probePos.x <= target[1].x && probePos.y >= target[0].y && probePos.y <= target[1].y; 
  }
  if(hitTarget)
    probePath[probePath.length-1].hitTarget = true;
  return probePath
}

function getHighPath(x, y){
  var paths = getProblePaths(x, y);
  if(paths.find((x) => x.hitTarget)){
    return paths.reduce((c, v) => (c.y > v.y) ? c : v)
  }
  return null;
}

var allHighHits = []
for(var x = 0; x <= target[1].x; x++)
  for(var y = 0; y <= 100; y++){
    var path = getHighPath(x,y);
    if(path)
      allHighHits.push({
        path: path,
        velocity: { x, y }
      })
  }

console.info(allHighHits.reduce((c, v) => (c.path.y > v.path.y) ? c : v).path.y)

//The answer it 4005