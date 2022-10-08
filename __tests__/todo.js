/**
 * Jest has globals to allow us to create test suites and test cases. Following are some globals
 * describe(): to create test suites
 * test(): to create test cases
 * expect(): assertions
 * beforeAll(): to add seed data before each test gets executed. This removed coupling/ dependence of tests
 */

const todoList = require("../index");

const { all, add, markAsComplete } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark the todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
