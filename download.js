var links = [ "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"]
function download(uri, name) {
    //var link = document.createElement("a");
    link.download = name;
    //link.href = uri;
    //link.click();
}

for (i = 10; i < 100; i++) 
{ 
    console.log(links+""+i+".png", ""+ i)
    let linkUri= (i)=> links+"0"+i +".png"
    download(linkUri(i), ""+ i);
}