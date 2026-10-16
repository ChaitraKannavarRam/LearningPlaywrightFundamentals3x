import { test, expect } from "@playwright/test";

test("Practice assertions", async ({ page }) => {
  await page.goto(
    "https://app.thetestingacademy.com/playwright/multiple_element_filter",
  );
  await expect(page.locator("#login-heading")).toHaveText("Student Login");

  expect(await page.title()).toContain(
    "Multiple Element Filter Login — The Testing Academy",
  );
  const email = page.getByRole("textbox", { name: "email" });
  await expect(email).toBeVisible();
  await expect(email).toBeEnabled();
  await expect(email).toBeInViewport();
  await expect(email).toBeEmpty();
  await expect(email).toBeEditable();
  await expect(email).not.toBeHidden();
  await expect(email).toHaveAttribute("autocomplete", "email");
  await expect(email).toHaveId("email");
  await expect(email).toBeEmpty();
  await expect(email).toBeAttached();
  await email.fill("cdefg@gmail.com");
  expect("cdefg@gmail.com").toMatch(/@/);
  await expect(email).toHaveValue("cdefg@gmail.com");
  await expect(email).toHaveCount(1);

  const password = page.getByRole("textbox", { name: "password" });
  await expect(password).toBeVisible();
  await expect(password).toBeEnabled();

  await password.fill("123645");

  const checkbox = page.getByRole("checkbox", { name: "Remember me" });
  expect(await checkbox.isChecked()).toBeFalsy();
  await expect(checkbox).not.toBeChecked();
  await checkbox.check();

  await page.getByRole("button", { name: "Login to Practice Account" }).click();

  await expect(page).toHaveURL(
    "https://app.thetestingacademy.com/playwright/multiple_element_filter?email=cdefg%40gmail.com&password=123645&remember=yes#login-success",
  );

  const forgotPassword = page.getByTestId("form-forgot-password");
  await expect(forgotPassword).toBeEnabled();
  await expect(forgotPassword).not.toBeFocused();
  await forgotPassword.click();
});
