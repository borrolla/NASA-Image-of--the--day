const apiKey = "kSc7gq0QoaOuCRjWjARsbIpIMHiAwVlgcsx1JRJu";
const currentImageContainer = document.getElementById("current-image-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchHistory = document.getElementById("search-history");

const getCurrentImageOfTheDay = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchImage(currentDate);
};

const getImageOfTheDay = (date) => {
    fetchImage(date);
    saveSearch(date);
    addSearchToHistory();
};

const fetchImage = (date) => {
    const url =`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    fetch(url)
       .then(response => response.json())
       .then(data => {
        displayImage(data);
       })
       .catch(err => {
        currentImageContainer.innerHTML = `<p>Error fetching data. Try again later.</p>`;
        console.log(err);
       });
};

const displayImage = (data => {
    
        currentImageContainer.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.date}</p>
          ${data.media_type === "image" ? `<img src="${data.url}" alt="${data.title}" width="80%" />` : `<iframe width="80%" height="200" src="${data.url}" frameborder="0"></iframe>`}
          <p>${data.explanation}</p>`;
      
});

const saveSearch = (date) => {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    if(!searches.includes(date)){
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
    }
};


const addSearchToHistory = () => {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searchHistory.innerHTML = "";
    searches.forEach(date => {
        const li = document.createElement("li");
        li.textContent = date;
        li.addEventListener("click", () => {
            getImageOfTheDay(date);
        });
        searchHistory.appendChild(li);
    });
};


//Form submit
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedDate = searchInput.value;
    if(selectedDate){
        getImageOfTheDay(selectedDate);
    }
});

///Intit
getCurrentImageOfTheDay();
addSearchToHistory();