t = 0

init = function()
  screen.setFont("PressStart2P")
end

update = function()
  t = t + 1
end

draw = function()
  blink_phase = floor((t / 15) % 2)
  if blink_phase == 0 then
    screen.clear("#0c0c1c")
  else
    screen.clear("#0f102a")
  end

  drawWaveText = function(text, x, y, size, amp, speed, phase, hueShift)
    len = text.length
    total = screen.textWidth(text, size)
    startX = x - total / 2
    advance = 0
    for i = 0 to len - 1
      ch = text[i]
      chw = screen.textWidth(ch, size)
      yy = y + cos(t / speed + i * phase) * amp
      xx = startX + advance + chw / 2
      h = (hueShift + i * 18 + t * 2) % 360
      col = "hsl(" + h + ", 85%, 70%)"
      screen.drawText(ch, xx, yy, size, col)
      advance = advance + chw
    end
  end

  cx = 0
  cy = 0
  drawWaveText("this is l8b", cx, cy - 10, 10, 4, 10, 0.4, 0)
  drawWaveText("nice to meet you", cx, cy + 6, 8, 3, 12, 0.38, 120)
end