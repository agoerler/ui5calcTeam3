package ui5calc.pageobjects;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import ui5calc.control.Button;
import ui5calc.control.Panel;
import ui5calc.control.TextView;

public abstract class Page {

	protected final WebDriver driver;
	private final JavascriptExecutor executor;

	public Page(WebDriver driver) {
		this.driver = driver;
		this.executor = (JavascriptExecutor) driver;
	}

	protected Object executeJavaScript(String script) {
		Object result = executor.executeScript(script);
		return result;
	}

	/**
	 * Determines if the page, the web driver is showing, is the page this page
	 * objects should represent.
	 * 
	 * @return <code>true</code> if the page, the web driver is showing, is the
	 *         page this page objects should represent; <code>false</code>
	 *         otherwise
	 */
	abstract protected boolean currentPageIsThisPage();

	protected TextView getTextView(String id) {
		return new TextView(executor, id);
	}

	protected Panel getPanel(String id) {
		return new Panel(executor, id);
	}

	protected Button getButton(String id) {
		return new Button(executor, id);
	}

}
