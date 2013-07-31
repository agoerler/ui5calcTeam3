package ui5calc.test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

import ui5calc.pageobjects.CalculatorPage;

public class ITCalculator extends ITBase {

	@Test
	public void testInitialDisplayShows0() throws Exception {
		CalculatorPage calculatorPage = reloadCalculatorPage();

		assertThat(calculatorPage.getDisplay(), is("0"));

	}

	@Test
	public void testAdd() throws Exception {
		CalculatorPage calculatorPage = reloadCalculatorPage();

		calculatorPage.pressNine();
		calculatorPage.pressPlus();
		calculatorPage.pressOne();
		calculatorPage.pressSix();
		calculatorPage.pressEquals();

		assertThat(calculatorPage.getDisplay(), is("25"));

	}

}
