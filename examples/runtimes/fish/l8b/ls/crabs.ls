crabs = []
while crabs.length<10
  local cx = 200+50*random.next()
  if random.next()<.5 then cx *= -1 end
  local cy = random.next()*400
  crabs.push(object x=cx y=cy rotation=random.next()*360 end)
end

drawCrabs = function()
  for c in crabs
    screen.setDrawRotation(c.rotation)
    screen.drawSprite("crab",c.x-x,fmod(c.y-y,400)-200,10,10)
    screen.setDrawRotation(0)
    //print(c.y)
  end
end

fmod = function(x,y)
  x-floor(x/y)*y
end