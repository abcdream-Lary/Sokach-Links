// 获取按钮
const backToTopButton = document.getElementById('backToTop');

// 检查按钮是否存在
if (!backToTopButton) {
    console.error('未找到返回顶部按钮');
} else {
    let isScrolling = false; // 标志位，表示是否正在滚动

    // 滚动事件监听
    window.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 当页面滚动超过 100px 时显示按钮
        backToTopButton.style.display = (scrollTop > 100) ? "flex" : "none";
    };

    // 鼠标滚轮事件监听
    window.onwheel = function() {
        isScrolling = true; // 进入滚动状态
    };

    backToTopButton.onclick = function() {
        isScrolling = false; // 重置滚动状态
        scrollToTop();
    };

    const scrollToTop = () => {
        if (isScrolling) { // 如果正在滚动，停止返回顶部
            return;
        }

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollToTop);
            // 使用 Math.max 防止速度为负数
            window.scrollTo(0, currentScroll - Math.max(currentScroll / 12, 0));
        }
    };
}
