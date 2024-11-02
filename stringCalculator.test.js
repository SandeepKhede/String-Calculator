function add(input) {
    if (input === "") return 0;

    // Handle custom delimiters
    let delimiters = [',', '\n'];
    if (input.startsWith("//")) {
        const delimiterLine = input.split("\n")[0];
        const customDelimiter = delimiterLine.slice(2);
        delimiters.push(customDelimiter);
        input = input.slice(delimiterLine.length + 1);
    }

    // Check for invalid input format
    if (input.includes(",\n") || input.endsWith(",")) {
        throw new Error("Invalid input format: unexpected delimiter");
    }

    const numbers = input.split(new RegExp(`[${delimiters.join('')}]`)).map(Number);
    
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }
    
    return numbers.reduce((acc, num) => acc + num, 0);
}


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

describe("String Calculator - Custom Delimiters and Error Handling", () => {
    test("should support different delimiters", () => {
        expect(add("//;\n1;2")).toBe(3);
    });

    test("should return 0 if only delimiter line is provided without numbers", () => {
        expect(add("//;\n")).toBe(0);
    });

    test("should throw an exception for negative numbers", () => {
        expect(() => add("1,-2,3,-4")).toThrow("negative numbers not allowed -2, -4");
    });

    test("should throw an error for invalid input format with misplaced delimiters", () => {
        expect(() => add("1,\n")).toThrow("Invalid input format: unexpected delimiter");
    });
});
