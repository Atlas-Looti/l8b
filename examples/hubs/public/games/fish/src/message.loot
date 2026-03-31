startMessage = function(text)
  message_text = text
  message_time = 120
  message_v = 0
  message_size = 50
end

drawMessage = function()
  if message_time>0 then
    if message_time>20 then
      message_v += (25-message_size)*.3
      message_v *= .7
    else
      message_v += (1-message_size)*.3
      message_v *= .2
    end
    message_size += message_v
    message_time -= 1
    screen.drawText(message_text,0,screen.height/4,message_size,"#FFF")
  elsif draw_arrow then
    if system.time()%500<250 then
      screen.setAlpha(.5)
      screen.drawSprite("arrowup",0,screen.height/4,25)
      screen.setAlpha(1)
    end
  end
end

updateMessage = function()
  
end