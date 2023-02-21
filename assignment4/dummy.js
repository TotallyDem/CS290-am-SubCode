// Demonstrating scope
{
    let x = "world";
    {
        let x = "hello"
        console.log(x);
    }
    console.log(x);
}

const outputbox = document.getElementById("outputbox");
const inputbox = document.getElementById("inputbox")

function updatetext() {
    outputbox.innerHTML = inputbox.value;
}