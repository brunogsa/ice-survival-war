-- Load / Initialize image, constants, your game state and so on
function love.load()
  state = {}

  state.square = {}
  state.square.position = {}
  state.square.position.x = 0
  state.square.position.y = 0
  state.square.width = 64
  state.square.height = 64
end

-- Update your game state
function love.update(delta)
  state.square.width = state.square.width + 1
  state.square.height = state.square.height + 1
end

-- Draw in the screen, conform your game state
function love.draw()
  love.graphics.setColor(0, 0.4, 0.4)
  love.graphics.print("Hello World", 400, 300)

  love.graphics.rectangle(
    "fill",
    state.square.position.x,
    state.square.position.y,
    state.square.width,
    state.square.height
  )
end
