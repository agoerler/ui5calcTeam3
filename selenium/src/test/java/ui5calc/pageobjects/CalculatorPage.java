package ui5calc.pageobjects;

import java.lang.reflect.Constructor;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.common.base.Predicate;

public class CalculatorPage extends Page {

	private static final int TIMEOUT_IN_SECONDS = 10;

	public CalculatorPage(WebDriver driver) {
		super(driver);
	}

	public String getDisplay() {
		String result = getTextView("calc-display").getText();
		return result;
	}

	public static <T extends Page> T createForCurrentPage(Class<T> clazz,
			WebDriver driver) throws Exception {
		Constructor<T> constructor = clazz.getConstructor(WebDriver.class);
		final T result = constructor.newInstance(driver);

		// wait until page is loaded
		WebDriverWait driverWait = new WebDriverWait(driver, TIMEOUT_IN_SECONDS);
		Predicate<WebDriver> function = new Predicate<WebDriver>() {

			public boolean apply(WebDriver driver) {
				return result.currentPageIsThisPage();
			}

		};
		driverWait.until(function);

		return result;
	}

	@Override
	protected boolean currentPageIsThisPage() {
		String panelText = getPanel("calc-panel").getText();

		return "UI5 Calculator".equals(panelText);
	}

	public void pressOne() {
		getButton("calc-row4-col0").press();

	}

	public void pressNine() {
		getButton("calc-row2-col2").press();
	}

	public void pressSix() {
		getButton("calc-row3-col2").press();
	}

	public void pressPlus() {
		getButton("calc-row5-col3").press();
	}

	public void pressEquals() {
		getButton("calc-row6-col3").press();
	}

}
