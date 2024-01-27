const button = document.querySelector("#button");
const output = document.querySelector("#output");

button.addEventListener("click", function(e){
    e.preventDefault();

    // fetch("data.txt")
    // .then((data) => data.text())
    // .then((data) => {
    //     console.log(data, "data")
    //     output.innerHTML = data;
    // })
    // .catch(console.error);

    // return;
    // .catch((error)=> console.error(error));

    fetch("Customers.json")
    .then((response) => response.json())
    .then((data)=> {
        let outputTemp = "";
        data.forEach((singleData) => {
            outputTemp += `<ul>
            <li>Id: ${singleData.id}</li>
            <li>Name: ${singleData.name}</li>
            <li>Company: ${singleData.company}</li>
            <li>Phone: ${singleData.phone}</li>
            </ul>`;
        });
        output.innerHTML = outputTemp;
    })
    .catch(console.error);
})