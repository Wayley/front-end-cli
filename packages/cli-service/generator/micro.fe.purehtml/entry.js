const render = (content = 'Home Page') => {
  const html = `<div class="purehtml-welcome">Welcome</div><p>This is <span>${content}</span></p>`;
  $('#purehtml-container').html(html);
  return Promise.resolve();
};

const goRouter = (e) => {
  const { target } = e;
  setMenuActive(target);
  render($(target).text());
};
const setMenuActive = (target) => {
  $(target).addClass('active').siblings('.active').removeClass('active');
};
function init() {
  const { hash } = location;
  const target = $(`a.purehtml-menu-item[href='${hash}']`)[0];
  target && setMenuActive(target);
  render(target ? $(target).text() : '');
}

/* *********************************************** */
if (!window.__POWERED_BY_QIANKUN__) {
  init();
}
((global) => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('purehtml mount');
      return init();
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);
