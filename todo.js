const todoList = () => {
  const all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((todoItem) => getTodoItemStatus(todoItem) === -1);
  };

  const dueToday = () => {
    return all.filter((todoItem) => getTodoItemStatus(todoItem) === 0);
  };

  const dueLater = () => {
    return all.filter((todoItem) => getTodoItemStatus(todoItem) === 1);
  };

  const toDisplayableList = (list) => {
    return list
      .map((listItem) => {
        let todoListText = `[${listItem.completed ? "x" : " "}] ${
          listItem.title
        }`;

        const listItemStatus = getTodoItemStatus(listItem);
        if (listItemStatus === -1 || listItemStatus === 1)
          todoListText +=
            " " + new Date(listItem.dueDate).toISOString().split("T")[0];

        return todoListText;
      })
      .join("\n");
  };

  const getTodoItemStatus = (todoItem) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(todoItem.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (now.valueOf() === dueDate.valueOf()) return 0; // Due Today
    else if (now < dueDate) return 1; // Due Later

    return -1; // Overdue
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
