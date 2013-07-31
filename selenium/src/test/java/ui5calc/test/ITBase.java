package ui5calc.test;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import ui5calc.pageobjects.CalculatorPage;

public abstract class ITBase {

	private static WebDriver driver;

	@BeforeClass
	public static void setupDriver() {
		driver = new FirefoxDriver();
	}

	protected CalculatorPage reloadCalculatorPage() throws Exception {
		driver.get("http://localhost:8080/web/");
		CalculatorPage calculatorPage = CalculatorPage.createForCurrentPage(
				CalculatorPage.class, driver);

		return calculatorPage;
	}

	@AfterClass
	public static void tearDownDriver() {
		driver.close();
	}

}
