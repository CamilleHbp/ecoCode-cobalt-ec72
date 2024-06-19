/**
 * Delays the execution of a function by the specified amount of time.
 * @param {number} delayInMs The delay time in milliseconds.
 * @returns A promise that resolves after the specified delay.
 */
const delay = (delayInMs) => {
    return new Promise(resolve => setTimeout(resolve, delayInMs));
};

export default delay;