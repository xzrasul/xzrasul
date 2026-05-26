window.onload = function () {
    for (var i = 1; i <= 45; i++) {
        var elementToHide = document.getElementById("text" + i);
        if (elementToHide) {
            elementToHide.style.display = "none";
        }
    }
};

function toggleText(imageNumber) {
    var text = document.getElementById('text' + imageNumber);
    
    if (text.style.display === 'none') {
        text.style.display = 'block'; // Показываем текст при первом клике
    } else {
        text.style.display = 'none'; // Скрываем текст при повторном клике
    }
  }
