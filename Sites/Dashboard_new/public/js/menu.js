function insertMenu() {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", "http://localhost:3500/menu.html", true);
    txtFile.onreadystatechange = function () {
        if (txtFile.readyState === 4) {
            if (txtFile.status === 200) {
                menuBar.innerHTML = txtFile.responseText;
            }
        }
    }
    txtFile.send(null)
}
insertMenu();