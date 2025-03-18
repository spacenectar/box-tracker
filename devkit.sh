#!/bin/bash
SESSION="devkit"

# Create a new detached session with one window named "devkit"
tmux new-session -d -s $SESSION -n devkit

# Split the window vertically into three rows:
# Top row: ~33% of the screen, Middle row: ~33%, Bottom row: ~34%
tmux split-window -v -p 66 -t $SESSION:devkit   # bottom pane (approx. 34%)
tmux split-window -v -p 50 -t $SESSION:devkit.0  # now creates middle pane (approx. 33%)

# In the top row (pane 0), split horizontally into two for Backend and Frontend
tmux select-pane -t $SESSION:devkit.0
tmux split-window -h -p 50

# In the middle row (pane 2), split horizontally to add Storybook pane
tmux select-pane -t $SESSION:devkit.2
tmux split-window -h -p 50

# Pane assignments:
# - Pane 0 (top left): Backend
# - Pane 1 (top right): Frontend
# - Pane 2 (middle left): Watchers
# - Pane 3 (middle right): Storybook
# - Pane 4 (bottom): Shell (initial focus)

tmux send-keys -t $SESSION:devkit.0 "echo 'Starting Backend...'; yarn backend" C-m
tmux send-keys -t $SESSION:devkit.1 "echo 'Starting Frontend...'; yarn frontend" C-m
tmux send-keys -t $SESSION:devkit.2 "echo 'Starting Watchers...'; yarn watch" C-m
tmux send-keys -t $SESSION:devkit.3 "echo 'Starting Storybook...'; yarn storybook" C-m
tmux send-keys -t $SESSION:devkit.4 "echo 'Shell pane'; exec \$SHELL" C-m

# Set focus to the shell pane (bottom)
tmux select-pane -t $SESSION:devkit.4

# Attach to the session
tmux attach-session -t $SESSION