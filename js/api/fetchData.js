fetch("./../../data/Data.json")
    .then(res => {
        if(!res.ok) {
            throw new Error('Something went wrong with the network ' + res.statusText);
        }
        return res.json();
    })
    .then(data => {
        const navTabs = document.getElementById('nav-tabs');
        const tabContent = document.getElementById('tab-content');

        data.navPills.forEach((pill, index) => {
            const isActive = index === 0 ? 'active' : '';

            const navItem = document.createElement('li');
            navItem.classList.add('nav-item');
            navItem.innerHTML = `
                    <a class="nav-link ${isActive}" 
                        id="${pill.tabName}-tab" 
                        data-toggle="tab" 
                        href="#${pill.tabName}" role="tab" 
                        aria-controls="${pill.tabName}" 
                        aria-selected="${isActive === 'active'}">${pill.showName}</a>
                    `;
            navTabs.appendChild(navItem);

            const tabPane = document.createElement('div');
            tabPane.classList.add('tab-pane', 'fade');
            if(isActive) {
                tabPane.classList.add(isActive);
            }
            tabPane.id = pill.tabName;
            tabPane.setAttribute('role', 'tabpanel');
            tabPane.setAttribute('aria-labelledby', `${pill.tabName}-tab`);

            const items = data.tabPanes.filter(item => item.type === pill.type);
            items.forEach(item => {
                const itemContent = document.createElement('div');
                itemContent.classList.add('d-inline-block', 'p-4', 'm-2');
                itemContent.style.width = '225px';
                itemContent.innerHTML = `
                        <img src="${item.imgSrc_jpg}" alt="${item.name} " style="width: 100%;">
                        <h5 class='text-center my-3'>${item.name}</h5>
                        <button style='width: 100%' class='tryOn-btn' data-type="${pill.type}" data-img-src="${item.imgSrc_png}">Thử đồ</button>
                    `;
                tabPane.appendChild(itemContent);
      });

      tabContent.appendChild(tabPane);
        });

        document.querySelectorAll('.tryOn-btn').forEach(button => {
            button.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const imgSrc = this.getAttribute('data-img-src');
    
                // Update the relevant model part's background image
                const modelPart = document.querySelector(`.${type}`);
                if (modelPart) {
                    modelPart.style.backgroundImage = `url("${imgSrc}")`;
                }
            });
        });
    })
    .catch(err => {
        console.error('Có vấn đề với việc đọc dữ liệu của bạn: ', err);
    });
