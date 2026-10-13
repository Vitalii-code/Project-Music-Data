import { countUsers } from "../js/common.mjs";

test("User count is correct", () => {
  expect(countUsers()).toBe(4);
});
