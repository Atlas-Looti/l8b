draw = function()
  if not status then
    screen.setLinearGradient(0,0,0,screen.height/2,"rgb(255,161,113)","rgb(142,142,255)")
    screen.fillRect(0,screen.height/4,screen.width,screen.height/2)
    local sunpos = exp(-tick/2000)
    screen.fillRound(0,screen.height/4-(screen.height/4+20)*sunpos,40,40,"#FFF")
    screen.fillRect(0,-screen.height/4,screen.width,screen.height/2,"rgb(0,151,227)")
    random.seed(floor(tick/10))
    drawFishes()
    for i=1 to 20
      random.seed((tick+i)*3.493849)
      local x = random.next()*40-20
      local y = random.next()
      screen.fillRect(x*(1+y*2),-y*screen.height/2,4,1,"#FFF")
    end
    if tick>60 then
      screen.setColor("rgb(25,55,113)")
    else
      screen.setColor("rgba(255,255,255,0")
    end
    screen.drawText("FISHING",0,screen.height/4+20,40)
    screen.drawText("PARTY",0,screen.height/4-20,40)
  else
    screen.fillRect(0,0,screen.width,screen.height,"rgb(255,179,28)")
    local m = current_level.map
    local mdown = previous_level.map
    local mup = next_level.map
    
    screen.drawMap(getAnimatedMap(mdown,floor(system.time()/125)%10),-x,-y-400,400,400)
    screen.drawMap(getAnimatedMap(m,floor(system.time()/125)%10),-x,-y,400,400)
    screen.drawMap(getAnimatedMap(mup,floor(system.time()/125)%10),-x,-y+400,400,400)
    drawCrabs()
    drawFishes()
    drawAnimals()
    screen.setDrawRotation(rotation-90)
    screen.drawSprite(if velocity>.1 and system.time()%400<200 then "ship2" else "ship" end,0,0,20)
    screen.drawSprite("shiptop",0,2,20)
    drawFished()
    screen.setDrawRotation(0)
    if rotation>180 then
      screen.drawSprite("mast",0,10,20,20)
      local px = 4*cos(rotation/180*PI+PI)
      local py = 4*sin(rotation/180*PI+PI)+5
      screen.drawSprite("sailor",px,py,10,10)
    end
    screen.setDrawRotation(rotation-90)
    for i=0 to 10 by 1
      local a = (1-pow(abs(5-i)/5,2))
      local dx = cos(rotation/180*PI)
      local dy = sin(rotation/180*PI)
      local color = if i>0 and i<10 then "#EEE" else"rgb(113,55,25)" end
      screen.fillRect(0+dx*(a*2+1),6+i+dy*(a*2+1),10+a*5,2,color)
    end
    screen.setDrawRotation(0)
    if rotation<=180 then
      screen.drawSprite("mast",0,10,20,20)
      local px = 4*cos(rotation/180*PI+PI)
      local py = 4*sin(rotation/180*PI+PI)+5
      screen.drawSprite("sailor",px,py,10,10)
    end
    if touch.touching and 0 then
      screen.fillRound(gesture_last_x,gesture_last_y,50,50,"rgba(255,255,255,.2)")
      screen.fillRound(touch.x,touch.y,25,25,"rgba(255,255,255,.3)")
    end
    if fade then
      screen.fillRect(0,0,screen.width,screen.height,"rgba("+fade_color+","+fade+")")
      fade = if fade<.01 then 0 else fade*.98 end
    end
    drawScore()
  end
  if status == "lost" then
    screen.fillRect(0,0,screen.width,screen.height,"rgba(0,0,0,.5)")
    screen.drawText("GAME OVER",0,30,30,"#FFF")
    screen.drawText("LEVEL "+(level+1),0,-40,20,"#FFF")
    screen.drawText("SCORE "+score,0,-20,20,"#FFF")
  end
  drawMessage()
  if show_controls then drawControls() end
end

drawScore = function()
  screen.setColor("#FFF")
  screen.drawSprite("fishscore",screen.width/2-12,screen.height/2-21,score_size*12,score_size*12)
  screen.drawText(score,screen.width/2-30,screen.height/2-20,score_size*20)
  score_size = score_size+(1-score_size)*.1
  screen.drawText("Lv",-screen.width/2+12,screen.height/2-20,level_size*15,"rgb(25,84,113)")
  screen.drawText((level+1),-screen.width/2+30,screen.height/2-20,level_size*20,"#FFF")
  level_size = level_size+(1-level_size)*.1
end

drawControls = function()
  screen.setAlpha(.5)
  screen.drawSprite("huit",0,-screen.height/4,80,40)
  screen.setAlpha(1)
  local phase = (system.time()%2000)/2000*2*PI
  local x = sin(phase)*35+5
  local y = sin(phase*2)*15-10-screen.height/4
  screen.drawSprite("doigt",x,y,30)
end