let data = [];
const select = document.querySelector("#select");
const img = document.querySelector("#img");
const bottom = document.querySelector(".bottom");
let img_src_for_social_media;
const jokes = async () => {
  const setHeader = {
    headers: {
      Accept: "application/json",
    },
  };
  const link = await fetch("https://icanhazdadjoke.com", setHeader); //setting headers imp see thapa 14:5
  data = await link.json();
  bottom.innerHTML = data.joke;
  //   console.log(data.joke);
};

const general_quotes = async (type) => {
  // quotes

  const url1 = `https://famous-quotes4.p.rapidapi.com/random?category=${type}&count=1`;
  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9605ca9043mshb5b1a3819c483bap1b3281jsn96f598bbc63a",
      "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url1, options1);
    const result = await response.json();
    bottom.innerHTML = result[0].text;
  } catch (error) {
    console.error(error);
  }
};

const general_categories = async () => {
  // categories

  const url = "https://famous-quotes4.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9605ca9043mshb5b1a3819c483bap1b3281jsn96f598bbc63a",
      "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //appending options dynamically in select tag
    result.forEach((elem) => {
      let opt = new Option(`${elem}`, `${elem}`);
      select.add(opt, undefined);
      // opt.addEventListener('change',alert("ok"))
    });
  } catch (error) {
    console.error(error);
  }
};

const category_selected = () => {
  console.log(select.value); //getting the selected option value
  general_quotes(select.value);
};

const programming_memes = async () => {
  const url = "https://programming-memes-images.p.rapidapi.com/v1/memes";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9605ca9043mshb5b1a3819c483bap1b3281jsn96f598bbc63a",
      "X-RapidAPI-Host": "programming-memes-images.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    bottom.innerHTML = "";
    let randomNumber = Math.floor(Math.random() * 12) + 1;
    let elem = document.createElement("img"); //creating elem and appending it to bottom
    elem.setAttribute("src", `${result[randomNumber].image}`);
    img_src_for_social_media=result[randomNumber].image
    bottom.append(elem);
    console.log(elem);
  } catch (error) {
    console.error(error);
  }
};

const current_elem = (e) => {
  bottom.classList.add("common");
  switch (e) {
    case "jokes":
      jokes();
      break;
    case "quotes":
      general_categories();

      break;
    case "memes":
      programming_memes();
      break;

    default:
      break;
  }
  //   e.addEventListener('click',alert("ok"))
};
// current_elem("jokes");

const social_media_share = () => {
  // console.log(bottom.textContent)
  if (bottom.textContent !== "") {
    let text=bottom.textContent
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent("This Funny Joke 😂😂\n"+text),"_blank")
  } else {
    console.log(img_src_for_social_media);
    window.open('https://twitter.com/intent/tweet?media='+(img_src_for_social_media),"_blank")
  }
};
