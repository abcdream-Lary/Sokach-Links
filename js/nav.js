document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止默认的跳转行为

        const targetId = link.getAttribute('href'); // 获取目标位置
        const targetElement = document.querySelector(targetId); // 获取对应的元素

        if (targetElement) {
            console.log(`找到目标元素: ${targetId}`); // 打印找到的元素
            smoothScroll(targetElement);
        } else {
            console.error(`找不到目标元素: ${targetId}`);
        }
    });
});

function smoothScroll(target) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 600; // 动画持续时间
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 进度限制在 0 到 1 之间

        // 使用缓动函数
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        // 判断动画是否完成
        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
