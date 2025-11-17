updateFishes = function()
  if fishes.length<20 and spawned_fish<current_level.fish then
    if addFish() then
      spawned_fish += 1
    end
  end

  for f in fishes
    if f.fished then
      f.fished -= 1
      f.x += (x-f.x)*.15
      f.y += (y-f.y)*.15
      if f.fished == 0 then
        fishes.remove(fishes.indexOf(f))
      end
      continue
    end
    if not isSea(f.x+f.facing*10,f.y) then
      f.facing *= -1
    end
    f.x += f.facing*.25
    local dx = f.x-x
    local dy = f.y-y
    if sqrt(dx*dx+dy*dy)<20 then
      score += 1
      fished += 1
      score_size = 1.5
      f.fished = 20
      fishedSound()
    end
  end
end

menuFishes = function()
  x = y = 0
  fishes = []
  for i = 1 to 10
    fishes.push(object
      x = random.next()*200-100
      y = -random.next()*100-50
      facing = random.nextInt(2)*2-1
    end)
  end
end

updateMenuFishes = function()
  for f in fishes
    f.x += f.facing*.25
    if f.x>90 and f.facing>0 or f.x<-90 and f.facing<0 then
      f.facing *= -1
    end
  end
end

menuFishes()

addFish = function()
  local f = object
    x = random.next()*360-180
    y = random.next()*360-180
    facing = if random.next()<.5 then -1 else 1 end
    phase = random.next()*400
  end
  local dx = x-f.x
  local dy = y-f.y
  if sqrt(dx*dx+dy*dy)>80 and isSea(f.x,f.y) then
    fishes.push(f)
    1
  else
    0
  end  
end

drawFishes = function()
  local time = system.time()
  for f in fishes
    if f.fished then continue end
    screen.setDrawScale(-f.facing,1)
    local sprite = if (time+f.phase)%400<200 then "fish1" else "fish2" end
    screen.drawSprite(sprite,f.x-x,f.y-y,10,10)
    screen.setDrawScale(1,1)
  end
end

drawFished = function()
  for f in fishes
    if f.fished then
      screen.drawSprite("fish",f.x-x,f.y-y,10,10)
    end
  end
end