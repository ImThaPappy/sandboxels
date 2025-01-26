// Register the Black Hole mod
if (!elements) {
    elements = {}; // Ensure the elements object exists
}

elements.black_hole = {
    color: ["#000000", "#0a0a0a", "#1a1a1a"], // Black hole colors
    behavior: [
        "XX|XX|XX",
        "XX|DL|XX",
        "XX|XX|XX"
    ], // Basic behavior: deletes anything that touches it
    category: "energy", // Place in the Energy category
    state: "gas", // Behaves as a gas-like element
    density: 10000, // Very high density
    tick: function(pixel) {
        // Pull nearby pixels toward the black hole
        for (let i = -3; i <= 3; i++) {
            for (let j = -3; j <= 3; j++) {
                let x = pixel.x + i;
                let y = pixel.y + j;
                if (!isEmpty(x, y)) {
                    let nearbyPixel = pixelMap[x][y];
                    if (nearbyPixel && Math.random() < 0.5) {
                        let dx = pixel.x - nearbyPixel.x;
                        let dy = pixel.y - nearbyPixel.y;
                        nearbyPixel.vx = (nearbyPixel.vx || 0) + dx * 0.1; // Pull toward black hole
                        nearbyPixel.vy = (nearbyPixel.vy || 0) + dy * 0.1;
                    }
                }
            }
        }

        // Consume nearby pixels
        let radius = 1; // Black hole's "consumption" radius
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                if (!isEmpty(nx, ny)) {
                    deletePixel(nx, ny);
                }
            }
        }
    }
};
