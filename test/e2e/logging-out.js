import { Selector, Role } from "testcafe";

const indexPage = "http://localhost:8000";

const louise = Role(indexPage, async t => {
  await t
    .typeText('[name="email"]', process.env.TESTCAFE_EMAIL)
    .typeText('[name="password"]', process.env.TESTCAFE_PW)
    .click('[type="submit"]');
});

fixture("Logged In").page(indexPage);

test("Logging out", async t => {
  await t
    .useRole(louise)
    .navigateTo(indexPage)
    .click(".header__button")
    .expect(Selector(".auth0-lock-input").exists)
    .ok();
});
