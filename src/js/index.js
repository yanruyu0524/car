var bscroll = new BScroll('.wrap', {
    probeType: 2,
    click: true
});

ajax({
    url: '/api/car',
    success: function(data) {
        var data = JSON.parse(data).result;
        rander(data);

    }
})

function rander(data) {
    var str = ``;
    var right = ``;
    for (var i in data) {
        if (data[i].length != 0) {
            right += `<h4>${i}</h4>`;
            str += ` <div class="box ${i}">
            <h4>${i}</h4>`;
            data[i].forEach(function(file) {
                str += `<p>${file.Name}</p>`
            })
        }
    }
    str += `</div>`;
    $('.right').html(right);
    $('.content').html(str);
}
$('.right').on('click', 'h4', function() {
    var text = $(this).text();
    bscroll.scrollToElement('.' + text, 1000, 0);
    //滚动到制定元素上，通过在box上添加类名，和点击的导航内容一样
})