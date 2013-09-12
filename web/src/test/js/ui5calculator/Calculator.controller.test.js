describe("The display of an initial controller", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 0", function() {
		expect(sut.model.getProperty("/display")).toBe(0);
	});

	it("should show 0 after pressing 0", function() {
		sut.buttonPressed("0");

		expect(sut.model.getProperty("/display")).toBe(0);
	});

	it("should show 5 after pressing 0", function() {
		sut.buttonPressed("5");

		expect(sut.model.getProperty("/display")).toBe(5);
	});

});

describe("The display of a controller showing 5", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
		sut.buttonPressed("5");
	});

	it("should show 50 after pressing 0", function() {
		sut.buttonPressed("0");

		expect(sut.model.getProperty("/display")).toBe(50);
	});

	it("should show 0 after pressing 'C'", function() {
		sut.buttonPressed("C");

		expect(sut.model.getProperty("/display")).toBe(0);
	});

});

describe("Initial display of a controller ", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 5 after pressing 5", function() {
		sut.buttonPressed("5");

		expect(sut.model.getProperty("/display")).toBe(5);
	});

	it("should show 0 after pressing '+'", function() {
		sut.buttonPressed("1");
		sut.buttonPressed("+");
		expect(sut.model.getProperty("/display")).toBe(1);
		sut.buttonPressed("5");
		expect(sut.model.getProperty("/display")).toBe(5);
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(6);
	});

});

describe("Addition with multidigit operands", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
		sut.buttonPressed("1");
		sut.buttonPressed("0");
	});

	it("should show 55 after adding 45", function() {
		sut.buttonPressed("+");
		sut.buttonPressed("4");
		sut.buttonPressed("5");
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(55);
	});

});

describe("Division with simple operands", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
		// sut.buttonPressed("1");
		// sut.buttonPressed("0");
	});

	it("should show 2 after division of 8 and 4", function() {
		sut.buttonPressed("8");
		sut.buttonPressed("/");
		sut.buttonPressed("4");

		sut.buttonPressed("=");

		expect(sut.model.getProperty("/display")).toBe(2);
	});

	it("should show 4 before entering the = button", function() {
		sut.buttonPressed("8");
		sut.buttonPressed("/");
		sut.buttonPressed("4");

		expect(sut.model.getProperty("/display")).toBe(4);
	});

	it("should show 0.5 when dividing 1 with 2", function() {
		sut.buttonPressed("1");
		sut.buttonPressed("/");
		sut.buttonPressed("2");

		sut.buttonPressed("=");

		expect(sut.model.getProperty("/display")).toBe(0.5);
	});

});

describe("'Kehrwert!' ", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 1/5 when dividing 1 with 2", function() {
		sut.buttonPressed("5");
		sut.buttonPressed("1/x");

		expect(sut.model.getProperty("/display")).toBe(0.2);
	});

	it("should be able to calculate after applying the 1/x operation",
			function() {
				sut.buttonPressed("5");
				sut.buttonPressed("1/x");

				expect(sut.model.getProperty("/display")).toBe(0.2);

				sut.buttonPressed("+");

				sut.buttonPressed("1");

				sut.buttonPressed("=");

				expect(sut.model.getProperty("/display")).toBe(1.2);

			});

});

describe("'Input of decimal numbers' ", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("enter decimal number", function() {
		sut.buttonPressed("0");
		sut.buttonPressed(",");
		sut.buttonPressed("5");

		expect(sut.model.getProperty("/display")).toBe(0.5);
	});

	it("decimal number and plus operation", function() {
		sut.buttonPressed("0");
		sut.buttonPressed(",");
		sut.buttonPressed("5");

		sut.buttonPressed("+");

		sut.buttonPressed("1");

		sut.buttonPressed("=");

		expect(sut.model.getProperty("/display")).toBe(1.5);
	});

	it("decimal number and plus operation with another decimal number",
			function() {
				sut.buttonPressed("0");
				sut.buttonPressed(",");
				sut.buttonPressed("5");

				sut.buttonPressed("+");

				sut.buttonPressed("0");
				sut.buttonPressed(",");
				sut.buttonPressed("5");

				sut.buttonPressed("=");

				expect(sut.model.getProperty("/display")).toBe(1);
			});

	it("should ignore second decimal point", function() {
		sut.buttonPressed("0");
		sut.buttonPressed(",");
		sut.buttonPressed("5");
		sut.buttonPressed(",");
		expect(sut.model.getProperty("/display")).toBe(0.5);
	});

});

describe("Equals w/o operation does keep display value unchanged", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 5 after pressing 5", function() {
		sut.buttonPressed("5");
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(5);
	});

});


describe("Delete button", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should delete a digit", function() {
		sut.buttonPressed("5");
		sut.buttonPressed("4");
		expect(sut.model.getProperty("/display")).toBe(54);
		sut.buttonPressed("<-");
		expect(sut.model.getProperty("/display")).toBe(5);
	});
	
	it("should delete a digit", function() {
		sut.buttonPressed("1");
		sut.buttonPressed(",");
		sut.buttonPressed("5");
		sut.buttonPressed("<-");
		expect(sut.model.getProperty("/display")).toBe("1.");

	});
});
	
describe("Multiplication ", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

	it("should show 6 after pressing '2*3'", function() {
		sut.buttonPressed("2");
		sut.buttonPressed("*");
		expect(sut.model.getProperty("/display")).toBe(2);
		sut.buttonPressed("3");
		expect(sut.model.getProperty("/display")).toBe(3);
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(6);
	});

});

describe("Parantheses ", function() {

	var sut = undefined;

	beforeEach(function() {
		sut = sap.ui.controller("ui5calculator.Calculator");
		sut.onInit();
	});

// it("should show 27 after pressing '3*(4+5)'", function() {
// sut.buttonPressed("3");
// sut.buttonPressed("*");
// expect(sut.model.getProperty("/display")).toBe(3);
// sut.buttonPressed("(");
// sut.buttonPressed("4");
// sut.buttonPressed("+");
// expect(sut.model.getProperty("/display")).toBe(4);
// sut.buttonPressed("5");
// sut.buttonPressed(")");
// sut.buttonPressed("=");
// expect(sut.model.getProperty("/display")).toBe(27);
// });
	
	it("should show 27 after pressing '3*(4+5)'", function() {
		sut.buttonPressed("3");
		sut.buttonPressed("*");
		expect(sut.model.getProperty("/display")).toBe(3);
		sut.buttonPressed("(");
		sut.buttonPressed("4");
		sut.buttonPressed("+");
		expect(sut.model.getProperty("/display")).toBe(4);
		sut.buttonPressed("5");
		sut.buttonPressed(")");
		sut.buttonPressed("=");
		expect(sut.model.getProperty("/display")).toBe(27);
	});
});
