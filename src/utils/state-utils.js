export function updateItemInState(item, items, insertAtEnd) {
  const itemsObject = [...items];
  const itemToUpdateIndex = itemsObject.findIndex((single) => single._id === item._id);
  if (itemToUpdateIndex >= 0) {
    itemsObject.splice(itemToUpdateIndex, 1, item);
  } else {
    if (insertAtEnd) {
      itemsObject.push(item);
    } else {
      itemsObject.unshift(item);
    }
  }

  return itemsObject;
}

export function deleteItemInState(itemId, items) {
  const itemsObject = [...items];
  const itemToDeleteIndex = itemsObject.findIndex((single) => single._id === itemId);
  if (itemToDeleteIndex >= 0) {
    itemsObject.splice(itemToDeleteIndex, 1);
  }

  return itemsObject;
}
