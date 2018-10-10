import { Selector, Role } from "testcafe";

const indexPage = "http://localhost:8000";
const tagsValue = "test-cafe-upload";

const louise = Role(indexPage, async t => {
  await t
    .typeText('[name="email"]', process.env.TESTCAFE_EMAIL)
    .typeText('[name="password"]', process.env.TESTCAFE_PW)
    .click('[type="submit"]');
});

fixture("Logged In").page(indexPage);

test("Uploading and searching", async t => {
  const sampleTitle = "Ingraine the Brave";
  await t
    .useRole(louise)
    .navigateTo(indexPage)
    .click(".queue__text")
    .setFilesToUpload('input[type="file"]', ["test-audio-for-testing.wav"])
    .typeText('input.title[name="title"]', sampleTitle)
    .typeText("input.contributor", "louise yang")
    .typeText('input[name="tags"]', tagsValue)
    .click("button.upload-button")
    .typeText("input.search__query", tagsValue)
    .pressKey("enter")
    .click("a.audio__link")
    .expect(Selector("h1.audio-page__title").innerText)
    .eql(sampleTitle)
    .click("img.trash__icon")
    .click("div.delete__yes");
});
