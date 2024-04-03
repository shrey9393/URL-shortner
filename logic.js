let btn = document.getElementById("shorten");
if (btn) {
  btn.addEventListener("click", short);
}

async function short() {
  let longurl = document.getElementById("longurl").value;
  let shortURL = document.getElementById("result");
  document.getElementById("copy").addEventListener("click", function () {
    var copyText = document.getElementById("result");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  });
  try {
    let response = await fetch(
      `https://is.gd/create.php?format=json&url=${longurl}`
    );
    if (response.ok) {
      let shorturl = await response.text();
      var parsedData = JSON.parse(shorturl);
      shortURL.value = parsedData.shorturl;
    } else {
      console.error("Network response was not ok.");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
