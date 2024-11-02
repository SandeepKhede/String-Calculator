function add(input) {
    if (input === "") return 0;
    const numbers = input.split(/[\n,]/).map(Number);
    return numbers.reduce((acc, num) => acc + num, 0);
}


// Basic Functionality
describe("String Calculator - Basic Functionality", () => {
    test("should return 0 for an empty string", () => {
        expect(add("")).toBe(0);
    });

    test("should return the number itself if there is only one number", () => {
        expect(add("1")).toBe(1);
    });

    test("should return the sum of two comma-separated numbers", () => {
        expect(add("1,5")).toBe(6);
    });
});

describe("String Calculator - Advanced Functionality", () => {
    test("should handle an unknown amount of numbers", () => {
        expect(add("1,2,3,4")).toBe(10);
    });

    test("should handle new lines between numbers", () => {
        expect(add("1\n2,3")).toBe(6);
    });
});
