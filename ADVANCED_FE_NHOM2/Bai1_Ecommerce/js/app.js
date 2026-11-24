(function ($) {
  "use strict";
  const products = [
    {
      id: "robot",
      name: "Robot thông minh Mini",
      category: "STEM",
      price: 349000,
      old: 499000,
      stock: 72,
      tag: "BEST SELLER",
      rating: 4.5,
      description: "Robot lập trình cơ bản giúp bé tư duy logic.",
      img: "robotthongminh.jpg",
      galleryImg: "robotthongminh2.jpg",
    },
    {
      id: "blocks",
      name: "Bộ xếp hình ABC 80 chi tiết",
      category: "Giao duc",
      price: 229000,
      old: 299000,
      stock: 40,
      tag: "NEW",
      rating: 5,
      description: "Bộ xếp hình nhiều màu kích thích khả năng sáng tạo.",
      img: "boxephinh.jpg",
      galleryImg: "boxephinh2.jpg",
    },
    {
      id: "rocket",
      name: "Tên lửa khám phá vũ trụ",
      category: "STEM",
      price: 399000,
      old: 520000,
      stock: 85,
      tag: "NEW",
      rating: 4,
      description: "Đồ chơi lắp ráp tàu vũ trụ dành cho trẻ em.",
      img: "tenlua.jpg",
      galleryImg: "tenlua2.jpg",
    },
    {
      id: "teddy",
      name: "Gấu bông Mây Hồng",
      category: "Thu bong",
      price: 179000,
      old: 250000,
      stock: 20,
      tag: "BEST SELLER",
      rating: 4.5,
      description: "Gấu bông mềm mại và dễ thương.",
      img: "gaubong.jpg",
      galleryImg: "gaubong2.jpg",
    },
  ];
  const money = (n) => n.toLocaleString("vi-VN") + "₫";
  const img = (p) => "assets/" + p.img;
  const discount = (p) => Math.round((1 - p.price / p.old) * 100);
  const safeJSON = (key, fallback) => {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return Array.isArray(v) ? v : fallback;
    } catch {
      return fallback;
    }
  };
  const getCart = () => safeJSON("wonderlab_cart", []);
  function saveCart(c) {
    localStorage.setItem("wonderlab_cart", JSON.stringify(c));
    updateCount();
  }
  function updateCount() {
    $(".cart-count").text(getCart().reduce((n, x) => n + x.qty, 0));
  }
  const defaultColor = "Nguyên bản";
  function add(id, qty, size, color = defaultColor) {
    let c = getCart();
    let p = products.find((x) => x.id === id);
    qty = Number(qty);
    if (!p || !Number.isInteger(qty) || qty < 1) return false;
    size = p.id === "teddy" ? size : null;
    let used = c.filter((x) => x.id === id).reduce((n, x) => n + x.qty, 0);
    if (used + qty > p.stock) {
      alert("Không đủ hàng trong kho!");
      return false;
    }
    let item = c.find(
      (x) => x.id === id && x.size === size && (x.color || defaultColor) === color,
    );
    if (item) item.qty += qty;
    else c.push({ id, qty, size, color });
    saveCart(c);
    return true;
  }
  function rating(v) {
    return `<input class="shop-rating" value="${v}" data-size="xs">`;
  }
  function card(p) {
    return `<div class="col-sm-6 col-md-4"><article class="product-card"><span class="ribbon discount">-${discount(p)}%</span><span class="ribbon tag">${p.tag}</span><a href="product.html?id=${p.id}"><img src="${img(p)}" alt="${p.name}"></a><div class="caption"><h4><a href="product.html?id=${p.id}">${p.name}</a></h4><p><span class="price">${money(p.price)}</span> <small class="old-price">${money(p.old)}</small></p>${rating(p.rating)}<p><button class="btn btn-success btn-sm quick-add" data-id="${p.id}">Thêm vào giỏ</button> <a class="btn btn-default btn-sm" href="product.html?id=${p.id}">Chi tiết</a></p></div></article></div>`;
  }
  function initRating(inputs = $(".shop-rating")) {
    if ($.fn.rating) {
      inputs.rating({
        displayOnly: true,
        showClear: false,
        showCaption: false,
        step: 0.5,
        theme: "krajee-svg",
      });
    }
  }
  $(document).on("click", ".quick-add", function () {
    if (add($(this).data("id"), 1, "S")) alert("Đã thêm sản phẩm vào giỏ");
  });
  if ($("#product-list").length) {
    let q = new URLSearchParams(location.search),
      search = (q.get("q") || "").toLowerCase(),
      cat = q.get("category");
    let a = products.filter(
      (x) =>
        (!cat || cat === x.category) && x.name.toLowerCase().includes(search),
    );
    $("#product-list").html(
      a.length ? a.map(card).join("") : "<p>Không tìm thấy sản phẩm.</p>",
    );
    initRating();
  }
  if ($("#detail-name").length) {
    let id = new URLSearchParams(location.search).get("id") || "robot",
      p = products.find((x) => x.id === id) || products[0];
    $("#detail-name").text(p.name);
    $("#detail-description").text(p.description);
    $("#detail-price").text(money(p.price));
    $("#detail-old").text(money(p.old));
    $("#detail-discount").text("-" + discount(p) + "%");
    $("#stock-progress")
      .css("width", p.stock + "%")
      .attr("aria-valuenow", p.stock)
      .text(p.stock + "%");
    $("#stock-label").text(
      p.stock + " sản phẩm còn trong kho (mức tham chiếu 100)",
    );
    $("#qty").attr("max", p.stock);
    $("#zoom-main").attr({ src: img(p), xoriginal: img(p), alt: p.name });
    const pics = [
      { src: img(p), alt: p.name },
      { src: "assets/" + p.galleryImg, alt: "Ảnh thứ hai của " + p.name },
    ];
    $("#zoom-thumbs").html(
      pics
        .map(
          (x) =>
            `<a href="${x.src}"><img class="xzoom-gallery" src="${x.src}" xpreview="${x.src}" alt="${x.alt}"></a>`,
        )
        .join(""),
    );
    if ($.fn.xzoom)
      $("#zoom-main, .xzoom-gallery").xzoom({
        position: "inside",
        mposition: "inside",
        scroll: true,
      });
    $("#detail-rating").val(p.rating);
    $("#size-selector").toggle(p.id === "teddy");
    $("#related-products").html(
      products
        .filter((x) => x.id !== p.id)
        .slice(0, 2)
        .map(card)
        .join(""),
    );
    $("#size-options button").on("click", function () {
      $("#size-options button").removeClass("selected-size");
      $(this).addClass("selected-size");
    });
    $("#add-detail").on("click", function () {
      let qty = Number($("#qty").val()),
        size = $("#size-options .selected-size").data("size");
      if (add(p.id, qty, size, $("#color").val()))
        $("#detail-message").text("Đã thêm vào giỏ. Mở mục Đơn hàng để xem.");
    });
    initRating();
    const reviewKey = "wonderlab_reviews_" + p.id;
    function renderReviews() {
      const list = $("#customer-reviews").empty();
      for (const review of safeJSON(reviewKey, [])) {
        const stars = $("<input>", { class: "shop-rating", "data-size": "xs" }).val(review.score);
        const comment = $("<p>").text(review.name + ": " + review.comment);
        $("<div>", { class: "review" }).append(stars, comment).appendTo(list);
        initRating(stars);
      }
    }
    $("#review-form").on("submit", function (event) {
      event.preventDefault();
      const name = $("#review-name").val().trim();
      const comment = $("#review-text").val().trim();
      if (!name || !comment) {
        $("#review-feedback").text("Vui lòng nhập tên và nhận xét.");
        return;
      }
      const reviews = safeJSON(reviewKey, []);
      reviews.push({ name, comment, score: Number($("#review-score").val()) });
      localStorage.setItem(reviewKey, JSON.stringify(reviews));
      this.reset();
      renderReviews();
      $("#review-feedback").text("Đã lưu đánh giá trên trình duyệt.");
    });
    renderReviews();
  }
  function renderLine(item, index) {
    const p = products.find((product) => product.id === item.id);
    if (!p) return "";
    const variants = $("<div>").text(
      "Màu: " + (item.color || defaultColor) + (item.size ? " · Size: " + item.size : ""),
    ).html();
    const remove = Number.isInteger(index)
      ? `<div class="col-sm-2"><button class="btn btn-danger btn-sm remove-item" data-index="${index}">Xóa</button></div>`
      : "";
    return `<div class="status-card row"><div class="col-sm-2"><img class="img-responsive" src="${img(p)}" alt=""></div><div class="col-sm-4"><a href="product.html?id=${p.id}">${p.name}</a><div>${variants}</div></div><div class="col-sm-2">SL: ${item.qty}</div><div class="col-sm-2">${money(item.qty * (item.price ?? p.price))}</div>${remove}</div>`;
  }
  function renderOrders() {
    const cart = getCart();
    $("#cart-items").html(
      cart.length
        ? cart
            .map(renderLine)
            .join("")
        : "<p>Giỏ hàng trống.</p>",
    );
    $("#cart-total").text(
      "Tổng: " +
        money(
          cart.reduce((n, item) => {
            const p = products.find((x) => x.id === item.id);
            return n + (p ? p.price * item.qty : 0);
          }, 0),
        ),
    );
    let orders = safeJSON("wonderlab_orders", []);
    $("#orders").html(
      orders.length
        ? orders
            .map(
              (o) =>
                `<section class="status-card"><p><strong>Đơn ${o.id}</strong> — ${o.date} — ${money(o.total)} <span class="label label-success">Đã tiếp nhận</span></p>${(o.items || []).map((item) => renderLine(item)).join("")}<details><summary>1 tin nhắn</summary><p>WonderLab đã tiếp nhận đơn hàng mô phỏng của bạn.</p></details></section>`,
            )
            .join("")
        : "<p>Chưa có đơn hàng.</p>",
    );
  }
  if ($("#cart-items").length) {
    renderOrders();
    $("#cart-items").on("click", ".remove-item", function () {
      let c = getCart();
      c.splice(Number($(this).data("index")), 1);
      saveCart(c);
      renderOrders();
    });
    $("#clear-cart").on("click", function () {
      saveCart([]);
      renderOrders();
    });
    $("#checkout").on("click", function () {
      const c = getCart();
      if (!c.length) return alert("Giỏ hàng đang trống");
      const total = c.reduce(
        (n, x) => n + (products.find((p) => p.id === x.id)?.price || 0) * x.qty,
        0,
      );
      let o = safeJSON("wonderlab_orders", []);
      o.unshift({
        id: Date.now().toString().slice(-8),
        date: new Date().toLocaleString("vi-VN"),
        total,
        items: c.map((item) => ({
          ...item,
          price: products.find((p) => p.id === item.id)?.price,
        })),
      });
      localStorage.setItem("wonderlab_orders", JSON.stringify(o));
      saveCart([]);
      renderOrders();
      alert("Đặt hàng mô phỏng thành công");
    });
  }
  updateCount();
})(jQuery);
