animals = []

updateAnimals = function()
  local l = levels[level%levels.length]
  for type in l.animals
    local count = l.animals[type]
    count *= 1+floor(level/levels.length)*.25
    if countAnimals(type)<min(count,tick/120) then
      addAnimal(type)
    end
  end

  for a in animals
    a.type.update(a)
  end
end

countAnimals = function(type)
  local sum = 0
  for a in animals
    if a.type.name == type then sum += 1 end
  end
  sum
end

addAnimal = function(type)
  local px = random.next()*360-180
  local py = random.next()*360-180
  local dx = x-px
  local dy = y-py
  if sqrt(dx*dx+dy*dy)>80 and isSea(px,py) then
    animal_types[type].add(px,py)
  end
end

drawAnimals = function()
  local time = system.time()
  for s in animals
    s.type.draw(s)
  end
end

animal_types.shark = object
  name = "shark"
  draw = function(s)
    screen.setDrawScale(if s.vx then s.vx else s.vy end,1)
    local sprite = if (system.time()+s.phase)%400<200 then "shark1" else "shark2" end
    screen.drawSprite(sprite,s.x-x,s.y-y-5,25,25)
    screen.setDrawScale(1,1)
  end
  
  add = function(x,y)
    local dir = random.nextInt(4)
    local s = object
      x = x
      y = y
      vx = [1,0,-1,0][dir]
      vy = [0,1,0,-1][dir]
      speed = 3 //random.next()*3+1
      phase = random.next()*400
      type = animal_types.shark
    end
   animals.push(s)
  end
  
  update = function(s)
    if not isSea(s.x+s.vx*10,s.y+s.vy*10) or random.next()<.005 then
      if random.next()<.5 then
        if abs(s.x-x)>abs(s.y-y) then
          if s.x<x then s.vx = 1 else s.vx = -1 end
          s.vy = 0
        else
          if s.y<y then s.vy = 1 else s.vy = -1 end
          s.vx = 0
        end
      else
        local dir = random.nextInt(4)
        s.vx = [1,0,-1,0][dir]
        s.vy = [0,1,0,-1][dir]
      end
    else
      s.x += s.vx*.25*s.speed
      s.y += s.vy*.25*s.speed
    end
    
    local dx = s.x-x
    local dy = (s.y-y)*1.5
    if sqrt(dx*dx+dy*dy)<20 then gameOver() end
  end
end

animal_types.piranha = object
  name = "piranha"
  draw = function(s)
    screen.setDrawScale(if s.vx then s.vx else s.vy end,1)
    local sprite = if (system.time()+s.phase)%400<200 then "piranha1" else "piranha2" end
    screen.drawSprite(sprite,s.x-x,s.y-y,18,12)
    screen.setDrawScale(1,1)
  end
  
  add = function(x,y)
    local dir = random.nextInt(2)
    local s = object
      x = x
      y = y
      vx = [1,-1][dir]
      vy = 0
      speed = 2
      phase = random.next()*400
      type = animal_types.piranha
    end
   animals.push(s)
  end
  
  update = function(s)
    if not isSea(s.x+s.vx*10,s.y+s.vy*10) or random.next()<.005 then
      local dir = random.nextInt(2)
      s.vx = [1,-1][dir]
      s.vy = 0
    else
      s.x += s.vx*.25*s.speed
      s.y += s.vy*.25*s.speed
    end
    
    local dx = s.x-x
    local dy = (s.y-y)*1.5
    if sqrt(dx*dx+dy*dy)<15 then gameOver() end
  end
end

animal_types.piranhab = object
  name = "piranhab"
  draw = function(s)
    local sprite =
      if s.vy>0 then "piranhaback" else "piranhafront" end + if (system.time()+s.phase)%400<200 then 0 else 1 end
    screen.drawSprite(sprite,s.x-x,s.y-y,12,12)
    screen.setDrawScale(1,1)
  end
  
  add = function(x,y)
    local dir = random.nextInt(2)
    local s = object
      x = x
      y = y
      vy = [1,-1][dir]
      vx = 0
      speed = 2
      phase = random.next()*400
      type = animal_types.piranhab
    end
   animals.push(s)
  end
  
  update = function(s)
    if not isSea(s.x+s.vx*10,s.y+s.vy*10) or random.next()<.005 then
      local dir = random.nextInt(2)
      s.vy = [1,-1][dir]
      s.vx = 0
    else
      s.x += s.vx*.25*s.speed
      s.y += s.vy*.25*s.speed
    end
    
    local dx = s.x-x
    local dy = (s.y-y)*1.5
    if sqrt(dx*dx+dy*dy)<12 then gameOver() end
  end
end

animal_types.octopus = object
  name = "octopus"
  draw = function(s)
    screen.setDrawScale(if s.vx then -s.vx else s.vy end,1)
    local sprite = if (system.time()+s.phase)%400<200 then "octopus1" else "octopus2" end
    screen.drawSprite(sprite,s.x-x,s.y-y,20,20)
    screen.setDrawScale(1,1)
  end
  
  add = function(x,y)
    local dir = random.nextInt(4)
    local s = object
      x = x
      y = y
      vx = [1,0,-1,0][dir]
      vy = [0,1,0,-1][dir]
      speed = 1
      phase = random.next()*400
      type = animal_types.octopus
    end
   animals.push(s)
  end
  
  update = function(s)
    if not isSea(s.x+s.vx*10,s.y+s.vy*10) or random.next()<.005 then
      if random.next()<.5 then
        if abs(s.x-x)>abs(s.y-y) then
          if s.x<x then s.vx = 1 else s.vx = -1 end
          s.vy = 0
        else
          if s.y<y then s.vy = 1 else s.vy = -1 end
          s.vx = 0
        end
      else
        local dir = random.nextInt(4)
        s.vx = [1,0,-1,0][dir]
        s.vy = [0,1,0,-1][dir]
      end
      s.dash = if random.next()<.5 then 60 else 0 end
    else
      if s.dash then
        s.dash -= 1
        s.x += s.vx*s.speed*1.25
        s.y += s.vy*s.speed*1.25
      else
        s.x += s.vx*.25*s.speed
        s.y += s.vy*.25*s.speed
      end
    end
    
    local dx = s.x-x
    local dy = (s.y-y)*1.5
    if sqrt(dx*dx+dy*dy)<20 then gameOver() end
  end
end


