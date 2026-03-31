init = function()
  gameover = 0
  running = 0
  blades = [200,300,400]
  passed = [0,0,0]
  score = 0
  position = 0
  speed = 1.7
  hero_y = 0
  hero_vy = 0
  screen.setFont("PressStart2P")
end

update = function()
  if gameover>0 then
    gameover = gameover+1
    if gameover>300 then init() end
  elsif running then
    position = position+speed
    speed = speed + 0.0001

    if touch.touching and hero_y == 0 then
       hero_vy = 6
       audio.beep("square tempo 20000 volume 10 span 100 C4 to C6")
    end

    hero_vy -= 0.3
    hero_y = max(0,hero_y+hero_vy)

    for i=0 to blades.length-1
      if blades[i]<position-120 then
        blades[i] = position+280+random.next()*200
        passed[i] = 0
      end
      if abs(position-blades[i])<10 then
        if hero_y<10 then
          running = 0
          gameover = 1
          print("game ended")
          print("score: " + score)
          audio.beep("saw tempo 10000 volume 50 span 50 C2 to C4 to C2 to C4")
        elsif not passed[i] then
          passed[i] = 1
          score += 1
          audio.beep("saw tempo 960 volume 50 span 20 C6")
        end
      end
    end
  else
    if touch.touching then
      running = 1
      print("game started")
    end
  end
end

draw = function()
  screen.fillRect(0,0,screen.width,screen.height,"rgb(245,245,245)")

  for i=-6 to 6 by 1
    screen.drawSprite("wall",i*40-position%40,-80,40)
  end

  screen.drawSprite("hero",-80,-49+hero_y,20)
  for i=0 to blades.length-1
    screen.drawSprite("blade",blades[i]-position-80,-50,20)
  end

  screen.drawText(score,120,80,12,"#000")
  if gameover then
    screen.fillRect(0,0,screen.width,screen.height,"rgba(120,120,120,.5)")
    screen.drawText("GAME OVER",0,0,28,"#000")
  elsif not running then
    screen.drawText("READY?",0,30,28,"#000")
  end
end
