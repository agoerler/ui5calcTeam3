package ui5calc.control;

import org.openqa.selenium.JavascriptExecutor;

public class Button extends Control {

	public Button(JavascriptExecutor executor, String id) {
		super(executor, id);
	}

	public void press() {
		executor.executeScript("$('#" + id + " button').click()");
	}

}
