update = function()
  if status == "lost" then
    if (touch.touching and not previous_touching) or (keyboard.SPACE and not previous_space) or (gamepad.A and not previous_A) then
      status = 0
      tick = 0
      menuFishes()
    end
  elsif status == "playing" then
    if velocity>1 then
      show_controls = 0
    end
    gestureAnalyzer()
    gamepadAnalyzer()
    keyboardAnalyzer()
    gesture_touching = gesture_touching or gamepad_touching or keyboard_touching
    local a = (angle+360)%360
    if a>rotation+180 then a -= 360 end
    if a<rotation-180 then a += 360 end
    rotation = rotation*.95+a*.05
    rotation = (rotation+360)%360
    
    physics()
    tick += 1
    updateFishes()
    updateAnimals()
    
    if y>230 then
      startLevel(level+1)
      y -= 400
      closeDoor()
      startMessage("LEVEL "+(level+1))
      level_size = 2
      draw_arrow = 0
      levelUpSound()
    elsif fished == current_level.fish and not level_cleared then
      level_cleared = 1
      openDoor()
      startMessage("LEVEL CLEARED!")
      draw_arrow = 1
      levelClearedSound()
    end
  else
    updateMenuFishes()
    tick += 1
    if (touch.touching and not previous_touching) or (keyboard.SPACE and not previous_space) or (gamepad.A and not previous_A) then
      local ready = 1
      for s in sprites
        if not sprites[s].ready then
          ready = 0
          print(s+" not ready")
          end
      end
      if ready then start() end
    end
  end
  previous_touching = touch.touching
  previous_space = keyboard.SPACE
  previous_A = gamepad.A
  updateMessage()
end

start = function()
  score = 0
  status = "playing"
  fade = 0
  velocity = 0
  startSound()
  random.seed(4)
  startLevel(0)
  show_controls = 1
  gesture_lock = 1
  print("game started")
end

startLevel = function(lvl)
  level = lvl
  spawned_fish = 0
  tick = 0
  fished = 0
  level_cleared = 0
  previous_level = levels[(lvl-1+levels.length)%levels.length]
  current_level = levels[lvl%levels.length]
  next_level = levels[(lvl+1)%levels.length]
  animals = []
  fishes = []
  map = maps["map"+levels[level%levels.length].map]
end

gameOver = function()
  status = "lost"
  fade = 1
  fade_color = "255,0,0"
  draw_arrow = 0
  show_controls = 0
  lostSound()
  closeDoor()
  print("game ended")
  print("score: " + score)
end

init = function()
  startMusic()
end

animated_maps = object end

getAnimatedMap = function(num,frame)
  if animated_maps[num] and animated_maps[num][frame] then
    return animated_maps[num][frame]
  else
    local time = system.time()
    local m = maps["map"+num].clone()
    local f = 0
    animated_maps[num][frame] = m
    for j=0 to 19
      for k=0 to 19
        local s = m.get(j,k)
        if s.startsWith("wave") then
          m.set(j,k,"wave"+((j*3+k*7+floor((j+k+frame)/2))%5))
        elsif s.startsWith("sand") then
          f = floor((k*3+j*7+frame)/2)%2
          m.set(j,k,s.replace("0",f).replace("1",f))
        elsif s.startsWith("rock") then
          m.set(j,k,"rock"+floor((k*3+j+frame)/2)%3)
        elsif s.startsWith("wall") then
          m.set(j,k,"wall"+floor((k*3+j+frame)/2)%2)
        elsif s.startsWith("door") then
          m.set(j,k,"door"+floor((k*3+j+frame)/2)%2)
        end
      end
    end
    return m
  end
end

openDoor = function()
  open_door_map1 = current_level.map
  open_door_map2 = next_level.map
  for i=0 to 9
    local m = animated_maps[current_level.map][i]
    m.set(9,19,"sea")
    m.set(10,19,"sea")
    m = animated_maps[next_level.map][i]
    m.set(9,0,"sea")
    m.set(10,0,"sea")
  end
end

closeDoor = function()
  for i=0 to 9
    local m = animated_maps[open_door_map2][i]
    m.set(9,0,"door"+random.nextInt(2))
    m.set(10,0,"door"+random.nextInt(2))
    m = animated_maps[open_door_map1][i]
    m.set(9,19,"door"+random.nextInt(2))
    m.set(10,19,"door"+random.nextInt(2))
  end
end
