let seed = 0;

/**
 * Returns a random number between 0 and 1
 */
export function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

/**
 * Set the seed for the random number generator
 * @param newSeed
 */
export function setSeed(newSeed: number) {
    seed = newSeed;
}

