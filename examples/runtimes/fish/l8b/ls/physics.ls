physics = function()
  sailing = 1

  local dx = cos(rotation/180*PI)
  local dy = sin(rotation/180*PI)
  local px = x+dx*10
  local py = y+dy*10
  
  if isShipSand(x+dx*20,y+dy*20) then
    sailing = 0
  elsif isShipBlock(x+dx*10,y+dy*10) then
    if velocity then rockSound() end
    velocity = 0
    sailing = 0
  end
  
  if gesture_touching and sailing then
    if velocity<1 then
      velocity += (1.5-velocity)*.03
    else
      velocity += (1.5-velocity)*.01
    end
  else
    velocity += (0-velocity)*.05
  end

  x += velocity*cos(rotation/180*PI)
  y += velocity*sin(rotation/180*PI)
end

isSand = function(x,y)
  local m = map.get(floor(x/20)+10,floor(y/20)+10)
  m.startsWith("sand") or not m
end

isBlock = function(x,y)
  local m = map.get(floor(x/20)+10,floor(y/20)+10)
  not (m == "sea" or m.startsWith("wave") or m.startsWith("sand") or not m)
end

isSea = function(x,y)
  local m = map.get(floor(x/20)+10,floor(y/20)+10)
  m == "sea" or m.startsWith("wave")
end

isShipSand = function(x,y)
  y = floor(y/20)+10
  if y<20 then
    local m = getAnimatedMap(current_level.map,0).get(floor(x/20)+10,y)
    m.startsWith("sand") or not m
  else
    local m = getAnimatedMap(next_level.map,0).get(floor(x/20)+10,y-20)
    m.startsWith("sand") or not m
  end
end

isShipBlock = function(x,y)
  y = floor(y/20)+10
  if y<20 then
    local m = getAnimatedMap(current_level.map,0).get(floor(x/20)+10,y)
    not (m == "sea" or m.startsWith("wave") or m.startsWith("sand") or not m)
  else
    local m = getAnimatedMap(next_level.map,0).get(floor(x/20)+10,y-20)
    not (m == "sea" or m.startsWith("wave") or m.startsWith("sand") or not m)
  end
end

  