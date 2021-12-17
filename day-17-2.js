/*--------------------------
  Made at: 17-12-2021
  Dificulty: 3/10
  Time to solve: day-17-1 + ~10min
  Solution explanation: 
     Much more easy because I had solve the problem at the day-17-1.
     I basically only need to get the all the paths and count the ones that has a `hitTarget` on it.

     PS: Had a bug on this code, on line 48 of day-17-1, you can see that the code:
     `outOfBounds = probePos.y < target[1].y`
     is missing the check for the `target[0].y`, so I've added here on this code.
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
    //console.info(`Entrou Pos ${probePos.x},${probePos.y} com Vel ${probeVel.x},${probeVel.y}`)

    probePos.x += probeVel.x;
    probePos.y += probeVel.y;    

    if(probeVel.x != 0){
      probeVel.x += probeVel.x > 0 ? -1 : 1;
    }

    probeVel.y += -1;

    probePath.push({ x: probePos.x, y: probePos.y });
    //console.info(`Saiu Pos ${probePos.x},${probePos.y}`)

    outOfBounds = probePos.y < target[0].y && probePos.y < target[1].y 
    hitTarget = probePos.x >= target[0].x && probePos.x <= target[1].x && probePos.y >= target[0].y && probePos.y <= target[1].y; 
  }
  if(hitTarget)
    probePath[probePath.length-1].hitTarget = true;
  return probePath
}

//console.info(getProblePaths(6,0))
//console.info(getProblePaths(6,1))

var hitPaths = 0
for(var x = 0; x <= target[1].x; x++)
  for(var y = target[0].y; y <= 100; y++)
    if(getProblePaths(x,y).find((x) => x.hitTarget) != null)
      hitPaths++;

console.info(hitPaths)

//The correct answer it 2953