gestureAnalyzer = function()
  if not gesture_touching and not gesture_lock then
    if touch.touching then
      gesture_touching = 1
      local dx = touch.x-gesture_last_x
      local dy = touch.y-gesture_last_y
      local d = sqrt(dx*dx+dy*dy)
      if d>40 then
        gesture_last_x = touch.x
        gesture_last_y = touch.y
      end
    end
  elsif touch.touching and not gesture_lock then
    local dx = touch.x-gesture_last_x
    local dy = touch.y-gesture_last_y
    local d = sqrt(dx*dx+dy*dy)
    if d>5 then
      angle = atan2(dy,dx)*180/PI
      gesture_last_x = (touch.x-dx*10/d)*.02+gesture_last_x*.98
      gesture_last_y = (touch.y-dy*10/d)*.02+gesture_last_y*.98
    end
  else
    if gesture_lock and not touch.touching then
      gesture_lock = 0
      gesture_last_x = gesture_last_y = 0
    end
    gesture_touching = 0
  end
  return 0
end