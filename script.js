function buttonswitcher(id) {
  console.log(id);
  $("#" + id).toggleClass("pager-elements-active");
  setTimeout(() => {
    $("#" + id).toggleClass("pager-elements-active");
  }, 100);
}
