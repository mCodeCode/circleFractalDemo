# circleFractalDemo
generate a fractal by dividing a circle

how the algorithm works? 

----- step 1 :
    draw a circle

----- step 2 :
    divide the circle in P parts of equal angles

----- step 3 :
    draw circles around it, following certain rules (all circles must be tangent to parent circle)

----- step 4 :
    for each new circle around the previous one
        do step 1 (draw)
        do step 2 (divide)
        do step 3 (draw around)
        do step 4 (recursive)
