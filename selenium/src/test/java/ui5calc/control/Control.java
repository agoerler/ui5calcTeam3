package ui5calc.control;

import org.openqa.selenium.JavascriptExecutor;

public abstract class Control {

	protected final JavascriptExecutor executor;
	protected final String id;

	public Control(JavascriptExecutor executor, String id) {
		this.executor = executor;
		this.id = id;
	}

	protected String getControlScript() {
		return "sap.ui.getCore().byId('" + id + "')";
	}

	protected Object get(String getter) {
		return executor.executeScript("return " + getControlScript() + "." + getter);
	}

}
