/*global sap */
sap.ui
		.controller(
				"ui5calculator.Calculator",
				{

					operand : undefined,
					startNext : true,
					operation : undefined,

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 */
					onInit : function() {
						this.model = new sap.ui.model.json.JSONModel({
							display : 0,
							firstdigit : 0,
							firstoperator : "",
							paraopen : "",
							paraclose : ""
						});
						this.startNext = true;
						sap.ui.getCore().setModel(this.model);
					},

					/**
					 * Similar to onAfterRendering, but this hook is invoked
					 * before the controller's View is re-rendered (NOT before
					 * the first rendering! onInit() is used for that one!).
					 */
					// onBeforeRendering: function() {
					//
					// },
					/**
					 * Called when the View has been rendered (so its HTML is
					 * part of the document). Post-rendering manipulations of
					 * the HTML could be done here. This hook is the same one
					 * that SAPUI5 controls get after being rendered.
					 */
					// onAfterRendering: function() {
					//
					// },
					/**
					 * Called when the Controller is destroyed. Use this one to
					 * free resources and finalize activities.
					 */
					// onExit: function() {
					//
					// },
					setDisplayValue : function(value) {
						value = parseFloat("" + value);
						this.model.setProperty("/display", value);
					},

					setDisplayValueAsString : function(value) {
						// value = parseFloat("" + value);
						this.model.setProperty("/display", value);
					},

					handleAsDigit : function(button) {
						var display = this.model.getProperty("/display");
						if (display === 0) {
							this.setDisplayValue(button);
							this.startNext = false;
						} else {
							if (this.startNext) {
								display = button;
								this.startNext = false;
							} else {
								display = "" + display + button;
							}
							this.setDisplayValue(display);
						}
					},

					buttonPressed : function(button) {

						if ('C' == button) {
							this.onInit();
							return;
						}

						if ('+' == button) {
							this.operand = this.model.getProperty("/display");
							this.operation = button;
							this.startNext = true;
							return;
						}

						if ('/' == button) {
							this.operand = this.model.getProperty("/display");
							this.operation = button;
							this.startNext = true;
							return;
						}

						if ('1/x' == button) {
							this.operand = this.model.getProperty("/display");

							this.setDisplayValue(1 / this.operand);
							return;
						}

						var currentValue;

						if (',' == button) {

							currentValue = this.model.getProperty("/display");
							if ((currentValue + "").indexOf(".") >= 0) {
								return;
							}

							this.setDisplayValueAsString(currentValue + ".");
							this.startNext = false;
							return;
						}

						if ('<-' == button) {

							currentValue = this.model.getProperty("/display")
									+ "";

							// remove last input
							currentValue = currentValue.substring(0,
									currentValue.length - 1);

							if (currentValue[currentValue.length - 1] === ".") {
								this.setDisplayValueAsString(currentValue);
							} else {
								this.setDisplayValue(currentValue);
							}
							return;
						}

						if ('*' == button) {
							this.operand = this.model.getProperty("/display");
							this.startNext = true;
							this.operation = "*";
							return;
						}

						if ('(' == button) {
							this.startNext = true;
							this.model.setProperty("/paraopen", "(");

							this.model.setProperty("/firstoperator",
									this.operation);
							this.model.setProperty("/firstdigit", this.model
									.getProperty("/display"));

							return;
						}

						if (')' == button) {
							this.startNext = true;
							this.model.setProperty("/paraclose", ")");

							if (this.operation == "+") {
								var parasum = this.model
										.getProperty("/display")
										+ this.operand;
								this.setDisplayValue(parasum);
							} else if (this.operation == "*") {
								var parasum = this.model
										.getProperty("/display")
										* this.operand;
								this.setDisplayValue(parasum);
							}
							return;
						}

						if ('=' == button) {

							if (this.model.getProperty("/paraopen") == "("
									&& this.model.getProperty("/paraclose") == ")") {

								if (this.model.getProperty("/firstoperator") == "+") {
									var sum = this.model
											.getProperty("/firstdigit")
											+ this.model
													.getProperty("/display");
									this.setDisplayValue(sum);
								} else if (this.model
										.getProperty("/firstoperator") == "*") {
									var sum = this.model
											.getProperty("/firstdigit")
											* this.model
													.getProperty("/display");
									this.setDisplayValue(sum);
								}
								return;
							}
							var sum;

							if (this.operation == "+") {
								sum = this.model.getProperty("/display")
										+ this.operand;
								this.setDisplayValue(sum);
							}

							if (this.operation == "/") {
								sum = this.operand
										/ this.model.getProperty("/display");
								this.setDisplayValue(sum);
							}

							if (this.operation == "*") {
								var sum = this.model.getProperty("/display")
										* this.operand;
								this.setDisplayValue(sum);
							}

							return;
						}

						this.handleAsDigit(button);
					}

				});
