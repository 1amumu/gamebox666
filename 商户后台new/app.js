const orders = [
  {
    id: "DD20260507018",
    customer: "陈曼",
    product: "企业版订阅",
    amount: "¥18,800",
    status: "paid",
    statusText: "已支付",
    time: "10:42",
  },
  {
    id: "DD20260507017",
    customer: "周宁",
    product: "数据看板套餐",
    amount: "¥6,420",
    status: "pending",
    statusText: "待处理",
    time: "10:18",
  },
  {
    id: "DD20260507016",
    customer: "王启",
    product: "仓储管理模块",
    amount: "¥12,300",
    status: "paid",
    statusText: "已支付",
    time: "09:55",
  },
  {
    id: "DD20260507015",
    customer: "李嘉",
    product: "营销自动化",
    amount: "¥4,980",
    status: "refunded",
    statusText: "已退款",
    time: "09:21",
  },
  {
    id: "DD20260507014",
    customer: "赵琳",
    product: "客服工单席位",
    amount: "¥9,600",
    status: "pending",
    statusText: "待处理",
    time: "08:47",
  },
  {
    id: "DD20260507013",
    customer: "林越",
    product: "财务对账插件",
    amount: "¥3,280",
    status: "paid",
    statusText: "已支付",
    time: "08:12",
  },
];

const table = document.querySelector("#orderTable");
const filters = document.querySelectorAll(".filter");
const searchInput = document.querySelector("#searchInput");
const navItems = document.querySelectorAll(".nav-item");
const viewTitle = document.querySelector("#viewTitle");
const menuButton = document.querySelector("#menuButton");
const sidebar = document.querySelector(".sidebar");

let activeStatus = "all";

const titles = {
  overview: "业务总览",
  orders: "订单管理",
  users: "用户管理",
  products: "商品管理",
  settings: "系统设置",
};

function renderOrders() {
  const keyword = searchInput.value.trim().toLowerCase();
  const visibleOrders = orders.filter((order) => {
    const matchesStatus = activeStatus === "all" || order.status === activeStatus;
    const searchable = `${order.id} ${order.customer} ${order.product} ${order.amount} ${order.statusText}`.toLowerCase();
    return matchesStatus && searchable.includes(keyword);
  });

  if (!visibleOrders.length) {
    table.innerHTML = `<tr><td class="empty-state" colspan="7">没有匹配的数据</td></tr>`;
    return;
  }

  table.innerHTML = visibleOrders
    .map(
      (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.product}</td>
          <td>${order.amount}</td>
          <td><span class="status ${order.status}">${order.statusText}</span></td>
          <td>${order.time}</td>
          <td><button class="action-button" type="button">查看</button></td>
        </tr>
      `,
    )
    .join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeStatus = button.dataset.status;
    renderOrders();
  });
});

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });
    button.classList.add("active");
    button.setAttribute("aria-current", "page");
    viewTitle.textContent = titles[button.dataset.view] || "管理控制台";
    sidebar.classList.remove("open");
  });
});

searchInput.addEventListener("input", renderOrders);

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  const isMobile = window.matchMedia("(max-width: 820px)").matches;
  if (!isMobile || sidebar.contains(event.target) || menuButton.contains(event.target)) {
    return;
  }
  sidebar.classList.remove("open");
});

renderOrders();
