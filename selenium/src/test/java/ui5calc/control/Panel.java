package ui5calc.control;

import org.openqa.selenium.JavascriptExecutor;

public class Panel extends Control {

	public Panel(JavascriptExecutor executor, String id) {
		super(executor, id);
	}

	public String getText() {
		return (String) get("getText()");
	}

}
