gamepadAnalyzer = function()
  if gamepad.LEFT_STICK_AMOUNT>.5 then
    angle = gamepad.LEFT_STICK_ANGLE
    gamepad_touching = 1
  else
    gamepad_touching = 0
  end
end