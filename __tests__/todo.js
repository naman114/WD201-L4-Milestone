/**
 * Jest has globals to allow us to create test suites and test cases. Following are some globals
 * describe(): to create test suites
 * test(): to create test cases
 * expect(): assertions
 * beforeAll(): to add seed data before each test gets executed. This removed coupling/ dependence of tests
 */

/**
 * Husky
 * npm install husky -D
 * npm set-script prepare "husky install"
 * npm run prepare
 * npx husky add .husky/pre-commit "npm test"
 * https://www.pupilfirst.school/targets/18863
 */

const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    now.toLocaleDateString("en-CA");
    tomorrow.toLocaleDateString("en-CA");
    yesterday.toLocaleDateString("en-CA");

    add({
      title: "Water the plants",
      completed: false,
      dueDate: now,
    });
    add({
      title: "Eat fruits",
      completed: false,
      dueDate: tomorrow,
    });
    add({
      title: "Do the homework",
      completed: false,
      dueDate: yesterday,
    });
  });

  test("Checks creating a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Checks marking a todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Checks retrieval of overdue items", () => {
    expect(overdue().length).toBe(1);
  });

  test("Checks retrieval of due today items.", () => {
    expect(dueToday().length).toBe(2);
  });

  test("Checks retrieval of due later items", () => {
    expect(dueLater().length).toBe(1);
  });
});
