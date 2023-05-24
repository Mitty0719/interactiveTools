class VerticalTree {
  static init(id, data) {
    const treeCon = document.querySelector(`#${id}`);
    this.createLevel(treeCon, data, 1)
  }

  static createLevel(parentNode, data, depth) {
    const level = document.createElement('ul');
    level.className = 'vtree-menu-list';
    for(const menu of data) {
      const item = document.createElement('li');
      const title = document.createElement('div');
      item.className = 'vtree-menu-item';
      item.classList.add(`tree-level-${depth}`);
      title.className = 'vtree-menu-title';
      title.innerText = menu.title;

      item.appendChild(title);

      if(menu.children) {
        this.createLevel(item, menu.children, depth + 1);

        // plusBtn
        const toggleCon = document.createElement('div');
        const toggle = document.createElement('span');
        toggleCon.className = 'vtree-menu-toggle-con'
        toggle.className = 'vtree-menu-toggle-btn';
  
        toggle.addEventListener('click', () => {
          item.classList.toggle('opened');
        })
  
        toggleCon.appendChild(toggle);
        item.prepend(toggleCon);
      }

      level.appendChild(item);
    }
    parentNode.appendChild(level);
  }
}