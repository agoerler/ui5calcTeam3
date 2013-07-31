package ui5calc.control;

import org.openqa.selenium.JavascriptExecutor;

public class TextView extends Control {

	public TextView(JavascriptExecutor executor, String id) {
		super(executor, id);
	}

	public String getText() {
		return (String) get("getText()");
	}

}
