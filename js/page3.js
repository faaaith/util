
window.onload = function () {
    var prev = $('#prev');
    var next = $('#next');
    var list = $('.list');
    var button = document.getElementById('lightButton').getElementsByTagName('li');
    var index = 0;

    function showButton() {         
        for (var i = 0, len = button.length; i < len; i++) {
            if (button[i].className === 'light') {
                removeClass(button[i], 'light');
                break;
            }
        }
        addClass(button[index], 'light');
    }

    var animated = false;          

    function animate(offset) {       
        animated = true;
        var newLeft = parseInt(list.style.left) + offset;
        var time = 300;            
        var interval = 10;            
        var speed = offset / (time / interval);    

        function go () {
            if (   (speed < 0 && parseInt(list.style.left) > newLeft)
                || (speed > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            }
            else {
                list.style.left = newLeft + 'px';
                if (newLeft >= 0) {
                    list.style.left = -3600 + 'px';
                }
                else if (newLeft <= -4200) {
                    list.style.left = -600 + 'px';
                }
                animated = false;
            }
        }
        go();
    }

    $.click(prev, function () {     
        if (!animated) {
            animate(600);
            index--;
            if (index === -1) {
                index = 5;
            }
            showButton();
        }
    });
    $.click(next, function () {
        if (!animated) {
            animate(-600);
            index++;
            if (index === 6) {
                index = 0;
            }
            showButton();
        }
    });

    for (var i = 0, len = button.length; i < len; i++) {    
        $.click(button[i], function() {
            if (!animated) {
                var toIndex = parseInt(this.getAttribute('index'));
                if (toIndex === index) {
                    return;
                }
                animate((toIndex - index) * (-600));
                index = toIndex;
                showButton();
            }
        });
    }
};

var timer;
function playASC() {          
    if (timer) {
        stop();
    }
    var next = $('#next');
    timer = setInterval(function () {
        next.click();
    }, 1000);
}

function playDESC() {          
    if (timer) {
        stop();
    }
    var prev = $('#prev');
    timer = setInterval(function () {
        prev.click();
    }, 1000);
}

function stop() {
    clearInterval(timer);
}