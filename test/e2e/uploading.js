import { Selector, Role } from 'testcafe';


const indexPage = "http://localhost:8000";

const louise = Role(indexPage, async t => {
  await t
    .typeText('[name="email"]', process.env.TESTCAFE_EMAIL)
    .typeText('[name="password"]', process.env.TESTCAFE_PW)
    .click('[type="submit"]');
});

fixture("Logged In")
  .page(indexPage);

test("Uploading and deleting", async t => {
  await t
    .useRole(louise)
    .navigateTo(indexPage)
    .click('.queue__text')
    .setFilesToUpload('input[type="file"]', [
      'test-audio-for-testing.wav'
    ])
    .typeText('input.title[name="title"]', "test title")
    .typeText('input.contributor', "louise yang")
    .click("button.upload-button")
    .expect(Selector(".queued-item__file-title").exists).ok()
    .click("a.edit__link")
    .click("img.trash__icon")
    .click("div.delete__yes")
    .expect(Selector(".queue__header").innerText).eql("Files You're Uploading")
    .expect(Selector("input.search__query").exists).ok();
});
