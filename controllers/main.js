async function fetchData() {
  try {
    const res = await fetch("./../../data/Data.json");

    if (!res.ok) {
      throw new Error(
        "Something went wrong with the network: " + res.statusText
      );
    }

    const data = await res.json();

    // Tạo HTML cho nav-tabs
    const navTabsHTML = data.navPills
      .map((pill, index) => {
        const isActive = index === 0 ? "active" : "";
        const ariaSelected = index === 0 ? "true" : "false";
        return `
                <li class="nav-item">
                    <a class="nav-link ${isActive}" 
                        id="${pill.tabName}-tab" 
                        data-toggle="tab" 
                        href="#${pill.tabName}" role="tab" 
                        aria-controls="${pill.tabName}" 
                        aria-selected="${ariaSelected}">${pill.showName}</a>
                </li>
            `;
      })
      .join("");

    // Tạo HTML cho tab-content
    const tabContentHTML = data.navPills
      .map((pill, index) => {
        const isActive = index === 0 ? "active show" : "";
        const itemsHTML = data.tabPanes
          .filter((item) => item.type === pill.type)
          .map(
            (item) => `
                    <div class="d-inline-block p-4 m-2" style="width: 225px;">
                        <img src="${item.imgSrc_jpg}" alt="${item.name}" style="width: 100%;">
                        <h5 class="text-center my-3">${item.name}</h5>
                        <button style="width: 100%" class="tryOn-btn" data-type="${pill.type}" data-img-src="${item.imgSrc_png}">Thử đồ</button>
                    </div>
                `
          )
          .join("");

        return `
                <div class="tab-pane fade ${isActive}" id="${pill.tabName}" role="tabpanel" aria-labelledby="${pill.tabName}-tab">
                    ${itemsHTML}
                </div>
            `;
      })
      .join("");

    // Chèn HTML vào DOM một lần
    document.getElementById("nav-tabs").innerHTML = navTabsHTML;
    document.getElementById("tab-content").innerHTML = tabContentHTML;

    // Sử dụng Event Delegation để xử lý sự kiện click
    document
      .getElementById("tab-content")
      .addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("tryOn-btn")) {
          const button = event.target;
          const type = button.getAttribute("data-type");
          const imgSrc = button.getAttribute("data-img-src");

          const modelPart = document.querySelector(`.${type}`);
          if (modelPart) {
            modelPart.style.backgroundImage = `url("${imgSrc}")`;
          }
        }
      });
  } catch (err) {
    console.error("Có vấn đề với việc đọc dữ liệu của bạn: ", err);
  }
}

fetchData();
