import '../index.css'
const  jwt_decode = require('jwt-decode');
const axios = require('axios');
const dayjs = require('dayjs');
import '../icon.png'

const userProfileModal =  document.querySelector(".user-profile-modal");


const closeBtn = document.querySelectorAll(".close-link");

const login_loader = document.querySelector(".loader-login");
const signup_loader = document.querySelector(".loader-signup");


const NAV_HOME= document.querySelector("#nav-home")

const SEARCH_NAV_CONTAINER = document.querySelector("#search-nav-container");
const MOBILE_SEARCH_NAV_CONTAINER = document.querySelector("#search-nav-container-mobile");

const CURRENT_USER = document.querySelector("#current-user");

const MAIN_WRAP = document.querySelector("#main-wrap")

const sessionExpiredModal = document.querySelector(".session-expired-modal");

const NAV_LOGIN_BTN = document.querySelector("#nav-login");
const LOGIN_LINK = document.querySelector("#login-link");
const NAV_SIGNUP_BTN = document.querySelector("#nav-signup");
const SIGNUP_LINK = document.querySelector("#signup-link");
const NAV_LOGOUT_BTN = document.querySelector("#nav-logout");

const AUTH_LOGIN_WRAP = document.querySelector("#auth-login-wrap");
const AUTH_SIGNUP_WRAP = document.querySelector("#auth-signup-wrap");
const SEARCH_WRAP = document.querySelector("#search-wrap");

const LOGIN_EMAIL = document.querySelector("#login-email");
const LOGIN_PASSWORD = document.querySelector("#login-password");
const LOGIN_BTN = document.querySelector("#login");

const SIGNUP_NAME = document.querySelector("#signup-name");
const SIGNUP_EMAIL = document.querySelector("#signup-email");
const SIGNUP_PASSWORD = document.querySelector("#signup-password");
const SIGNUP_CONFIRM_PASSWORD = document.querySelector("#signup-confirm-password");
const SIGNUP_BTN = document.querySelector("#signup");

const SEARCH_BTN = document.querySelector("#search");
const SEARCH_BTN_MAIN = document.querySelector(".search-btn-main");

const NAV_SEARCH_BTN = document.querySelectorAll(".search-icon");

const HOME_MAIN_LOGO = document.querySelector("#home-main-logo");
const QUERY = document.querySelector("#query");
const HOME_CAPTION = document.querySelector("#home-caption")
const SEARCH_HEADER = document.querySelector("#search-header");
const RESULTS = document.querySelector("#results");

const RESULTSX = document.querySelector("#resultsx");

const ERROR_MSG = document.querySelector("#error");

const updateError = document.querySelector("#update-error")

const editUserInfoBtn = document.querySelector("#edit-your-info");
const editableUserInfo = document.querySelectorAll(".editable-user");
const newUserInput = document.querySelectorAll(".new-user-input");

const handleElement = document.querySelector("#profile-name-input");
const saveUserUpdate = document.querySelector("#update-user-profile-btn");


const profileUserName = document.querySelector("#profile-user-name");
const profileUserEmail = document.querySelector("#profile-user-email");
const profileUserAllergies = document.querySelector("#profile-user-allergies");
const profileUserDate = document.querySelector("#user-reg-date");


const updateSoy = document.querySelector("#update-soy");
const updatePeanut = document.querySelector("#update-peanut");
const updateDiabetes = document.querySelector("#update-diabetes");

const updateSoyIconTrue = document.querySelector("#update-soy .update-true");
const updateSoyIconFalse = document.querySelector("#update-soy .update-false");
const updatePeanutIconTrue = document.querySelector("#update-peanut .update-true");
const updatePeanutIconFalse = document.querySelector("#update-peanut .update-false");
const updateDiabetesIconTrue = document.querySelector("#update-diabetes .update-true");
const updateDiabetesIconFalse = document.querySelector("#update-diabetes .update-false");

const loaderUpdate = document.querySelector("#update-user-profile-btn .loader2");
const closeExpiredModal = document.querySelector(".expired-modal-cancel");
closeExpiredModal.addEventListener("click", logout, false);


function updateCurrentUser(userDetails){
    let currentUser = userDetails;
    return localStorage.setItem('currentUser', JSON.stringify(currentUser))
}


function openUserProfileModal() {
    window.scrollTo(0, 0);
    userProfileModal.classList.remove("hide");
}
CURRENT_USER.addEventListener("click", openUserProfileModal, false);


function showNewUserInput(){
    editableUserInfo.forEach((element) => {
        element.classList.add("hide");
    })
    newUserInput.forEach((element) => {
        element.classList.remove("hide");
    })
}
editUserInfoBtn.addEventListener("click", showNewUserInput, false)


let peanutStatusUpdate;
let soyStatusUpdate;
let diabetesStatusUpdate;
function appendUserDetails(user){


    let name = user.handle;
    let firstName = name.replace(/ .*/,'');

    CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;
    profileUserName.innerHTML = user.handle;
    profileUserEmail.innerHTML = user.email;

    handleElement.value = user.handle;

    dayjs().format()
    let dateCreated = dayjs(user.createdAt).format('MMM DD YYYY - (h:mm a)');
    profileUserDate.innerHTML = `You started using nutri-fí on <span class="orange">${dateCreated}</span>`
    let conditions = user.condition;

    if (!Array.isArray(conditions) || !conditions.length) {
        profileUserAllergies.innerHTML = `You haven't entered any medical conditions yet, you can change that by clicking the "edit your info" button`
    } else {
        profileUserAllergies.innerHTML = ""
        for (let i = 0; i < conditions.length; i++) {
            let allergy = document.createElement("span");
            allergy.classList.add("profile-main-text");
            allergy.classList.add("allergy-spans");
            allergy.innerHTML = `${conditions[i]}    `;
            profileUserAllergies.appendChild(allergy);
        }
    }

    if (user.peanut) {
        peanutStatusUpdate = true;
        updatePeanut.classList.add("medical-selected");
        updatePeanutIconFalse.classList.add("hide");
        updatePeanutIconTrue.classList.remove("hide");
    } else {
        peanutStatusUpdate = false;
        updatePeanut.classList.remove("medical-selected");
        updatePeanutIconFalse.classList.remove("hide");
        updatePeanutIconTrue.classList.add("hide");
    }

    if (user.soy) {
        soyStatusUpdate = true;
        updateSoy.classList.add("medical-selected");
        updateSoyIconFalse.classList.add("hide");
        updateSoyIconTrue.classList.remove("hide");
    } else {
        soyStatusUpdate = false;
        updateSoy.classList.remove("medical-selected");
        updateSoyIconFalse.classList.remove("hide");
        updateSoyIconTrue.classList.add("hide");
    }

    if (user.diabetes) {
        diabetesStatusUpdate = true;
        updateDiabetes.classList.add("medical-selected");
        updateDiabetesIconFalse.classList.add("hide");
        updateDiabetesIconTrue.classList.remove("hide");  
    } else {
        diabetesStatusUpdate = false;
        updateDiabetes.classList.remove("medical-selected");
        updateDiabetesIconFalse.classList.remove("hide");
        updateDiabetesIconTrue.classList.add("hide");
    }
}

function selectPeanut() {
    if(updatePeanut.classList.contains("medical-selected")) {
        peanutStatusUpdate = false;
        updatePeanut.classList.remove("medical-selected");
        updatePeanutIconFalse.classList.remove("hide");
        updatePeanutIconTrue.classList.add("hide");
    } else {
        peanutStatusUpdate = true;
        updatePeanut.classList.add("medical-selected");
        updatePeanutIconFalse.classList.add("hide");
        updatePeanutIconTrue.classList.remove("hide");
    }
}

updatePeanut.addEventListener("click", selectPeanut, false)

function selectSoy() {
    if(updateSoy.classList.contains("medical-selected")){
        soyStatusUpdate = false;
        updateSoy.classList.remove("medical-selected");
        updateSoyIconFalse.classList.remove("hide");
        updateSoyIconTrue.classList.add("hide");
    } else {
        soyStatusUpdate = true;
        updateSoy.classList.add("medical-selected");
        updateSoyIconFalse.classList.add("hide");
        updateSoyIconTrue.classList.remove("hide");
    }
}

updateSoy.addEventListener("click", selectSoy, false)

function selectDiabetes() {
    if(updateDiabetes.classList.contains("medical-selected")){
        diabetesStatusUpdate = false;
        updateDiabetes.classList.remove("medical-selected");
        updateDiabetesIconFalse.classList.remove("hide");
        updateDiabetesIconTrue.classList.add("hide");
    } else {
        diabetesStatusUpdate = true;
        updateDiabetes.classList.add("medical-selected");
        updateDiabetesIconFalse.classList.add("hide");
        updateDiabetesIconTrue.classList.remove("hide");
    }
}

updateDiabetes.addEventListener("click", selectDiabetes, false)


function updateUserInfo(){
    loaderUpdate.classList.remove("hide");
    let handle = handleElement.value;

    const TOKEN = localStorage.FBIdToken;
    let config;
    if(TOKEN) {
        const decodedToken = jwt_decode(TOKEN);
        if(decodedToken && (decodedToken.exp * 1000 < Date.now())){
            sessionExpiredModal.classList.remove("hide");
            loaderUpdate.classList.add("hide");
        } else {
          config = {
            headers: { Authorization: `${TOKEN}` }
          };
        }
    } else {
        loaderUpdate.classList.add("hide");
        updateError.innerHTML = "You are currently not logged in, please log in to update your profile."
    }


    axios.post(
        'https://us-central1-drecipe-dc133.cloudfunctions.net/api/user/update',
        {
            handle: handle,
            isDiabetic: diabetesStatusUpdate,
            isSoyAllergic: soyStatusUpdate,
            isPeanutAllergic: peanutStatusUpdate
        },
        config
        )
        .then(function (response) {
            loaderUpdate.classList.add("hide");

            updateCurrentUser(response.data.userDetails);

            appendUserDetails(response.data.userDetails);

            editableUserInfo.forEach((element) => {
                element.classList.remove("hide");
            })
            newUserInput.forEach((element) => {
                element.classList.add("hide");
            })

        })
        .catch(function (error) {
            loaderUpdate.classList.add("hide");
        })


}

saveUserUpdate.addEventListener("click", updateUserInfo, false)



closeBtn.forEach((button) => {
    button.addEventListener("click", function(){
        if (SEARCH_WRAP.style.display === "none") {
            SEARCH_WRAP.style.display = "flex";
            AUTH_LOGIN_WRAP.style.display = "none";
            AUTH_SIGNUP_WRAP.style.display = "none";
            userProfileModal.classList.add("hide");
            sessionExpiredModal.classList.add("hide");
        } else {
            AUTH_LOGIN_WRAP.style.display = "none";
            AUTH_SIGNUP_WRAP.style.display = "none";
            userProfileModal.classList.add("hide");
            sessionExpiredModal.classList.add("hide");
        }
    }, false)
})


function goHome() {
    let searchSession = localStorage.searchSession;
    if(searchSession) {
        localStorage.removeItem('searchSession');
        localStorage.removeItem('searchHeader')
    }

}
NAV_HOME.addEventListener("click", goHome, false);


document.addEventListener("click", (evt) => {
    let targetElement = evt.target;

    if (AUTH_LOGIN_WRAP.style.display == "none" && AUTH_SIGNUP_WRAP.style.display == "none") {
    } else if (targetElement == NAV_LOGIN_BTN) { 
        clickNavLogin();
    } else if (targetElement == NAV_SIGNUP_BTN){
        clickNavSignup();
    } else if ((targetElement == QUERY) || (targetElement == NAV_SEARCH_BTN)) {
        AUTH_LOGIN_WRAP.style.display = "none";
        AUTH_SIGNUP_WRAP.style.display = "none";
    } 
});


(function checkTokenStatus() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const TOKEN = localStorage.FBIdToken;

    if(TOKEN) {
        const decodedToken = jwt_decode(TOKEN);
        if(decodedToken.exp * 1000 < Date.now()){ 
            sessionExpiredModal.classList.remove("hide");
        }
    } else if (!TOKEN) {
        localStorage.removeItem('currentUser');    
    }
    if (currentUser) {
        appendUserDetails(currentUser);

        let name = currentUser.handle;
        let firstName = name.replace(/ .*/,'');

        CURRENT_USER.classList.remove("hide")
        CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;

        NAV_LOGIN_BTN.style.display="none";
        NAV_SIGNUP_BTN.style.display="none";
        AUTH_LOGIN_WRAP.style.display="none";
        NAV_LOGOUT_BTN.style.display="flex";
        SEARCH_WRAP.style.display="flex";
    }
}());


(function checkSearchSession() {
    let searchSession = localStorage.searchSession;
    if (searchSession) {
        RESULTSX.innerHTML = searchSession;
        
        SEARCH_HEADER.innerHTML = localStorage.searchHeader
        HOME_MAIN_LOGO.style.display = "none";
        HOME_CAPTION.style.display = "none";


        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            if (vw < 1100 && HOME_MAIN_LOGO.style.display === "none") {
                MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
                MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
                SEARCH_NAV_CONTAINER.style.display = "none";
                
            } else if (vw >= 1100 && HOME_MAIN_LOGO.style.display === "none") {
                SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
                SEARCH_NAV_CONTAINER.style.display = "flex";
                MOBILE_SEARCH_NAV_CONTAINER.style.display = "none";
    
            }

        SEARCH_BTN_MAIN.style.display = "none";
        QUERY.className = "search-nav"
        MAIN_WRAP.style.paddingTop = "30px";
    }   
}())



let query;
function changeHeader() {
    query = QUERY.value;
    SEARCH_HEADER.innerHTML = `Searching for <span style="color:#ed4700">${query}</span><span class=loader2></span>`;
}



let queryTerms = [];

let searchHeader
let searchSession;
function search() {
    NAV_SEARCH_BTN.forEach((button) => {
        button.classList.add("no-pointer-event")
    })

    
    let query = QUERY.value;
    changeHeader(query);

    if (query.trim() === '') {
        ERROR_MSG.innerHTML = "Search must not be empty, please enter a valid recipe"
        SEARCH_HEADER.innerHTML = `Error`;
    } else {
        ERROR_MSG.innerHTML = ""
    }


    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        if (vw < 1100) {
            MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
            SEARCH_NAV_CONTAINER.style.display = "none";
        } else {
            SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
            SEARCH_NAV_CONTAINER.style.display = "flex";
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "none";
        }



    SEARCH_BTN_MAIN.style.display = "none";
    QUERY.className = "search-nav"

    HOME_MAIN_LOGO.style.display = "none";
    HOME_CAPTION.style.display = "none";
    
    const TOKEN = localStorage.FBIdToken;
    let config;
    if(TOKEN) {
        const decodedToken = jwt_decode(TOKEN);
        if(decodedToken && (decodedToken.exp * 1000 < Date.now())){
            
            localStorage.removeItem('FBIdToken')
            localStorage.removeItem('currentUser')
            window.location.href = '/';
            ERROR_MSG.innerHTML = `<h3> Session expired, please login or continue to use the app anonymously.</h3>`
            CURRENT_USER.innerHTML = ""
        } else {
          config = {
            headers: { Authorization: `${TOKEN}` }
          };
        }
      } else {
        config = {
          headers: { Authorization: null}
        }
      }


    RESULTS.innerHTML= "";
    RESULTSX.innerHTML= "";

    axios.post(
        'https://us-central1-drecipe-dc133.cloudfunctions.net/api/search',
        {
          query: query
        },
        config
        )
      .then(function (response) {
        queryTerms.push(query);
  
        let serverResponse = response.data.data.results;

        if (serverResponse && (searchSession !== null)) {
            localStorage.removeItem("searchSession")
        }
        if (serverResponse == "") {
            if (config.headers.Authorization !== null) {
                ERROR_MSG.innerHTML = `It looks like there aren't any great matches for your search. You might be allergic to food containing <span class="orange">${query}</span>. Please try again.`
            } else {
                ERROR_MSG.innerHTML = `It looks like there aren't any great matches for your search, please try again.`
            }
            SEARCH_HEADER.innerHTML = `No results for <span style="color:#ed4700">${query}</span>`;

         }

        

        if (serverResponse.length > 0) {
            SEARCH_HEADER.innerHTML = `Showing results for <span style="color:#ed4700">${query}</span>`;

            searchHeader = localStorage.setItem("searchHeader", SEARCH_HEADER.innerHTML)
        }

        MAIN_WRAP.style.paddingTop = "30px";

      let result;
      let recipeNameElement;
      let recipeNameNode;
      let imgElement;
      let carbElement;
      let carbNode;
      let caloriesElement;
      let caloriesNode;
      let servingsElement;
      let servingsNode;
      let timeNode;
      let timeElement;
      for (let i = 0; i < serverResponse.length; i++) {
  
        /* Recipe Name */
        RESULTS.innerHTML += `<p class="recipe-name result-${i+1}">${serverResponse[i].title}</p>`;


        recipeNameElement = document.createElement("h2");
        recipeNameElement.classList.add(`recipe-name`);
        recipeNameNode = document.createTextNode(`${serverResponse[i].title}`);
        recipeNameElement.appendChild(recipeNameNode);
  
        /* Recipe Picture */
        RESULTS.innerHTML += `<img src="${serverResponse[i].image}" alt="${serverResponse[i].title}" class="recipe-picture result-${i+1}">`;


        imgElement = document.createElement("img");
        imgElement.classList.add(`recipe-image`);

        let imageSrc = `${serverResponse[i].image}`;
        imageSrc = imageSrc.substring(0, imageSrc.length -11);
        imageSrc = imageSrc + "556x370.jpg";
        imgElement.src = imageSrc;
  
        /* Carbohydrate Content */
        let nutrtionDetails = serverResponse[i].nutrition.nutrients



        carbElement = document.createElement("p");
        carbElement.classList.add(`recipe-carb`);
        carbNode = document.createTextNode(`Carbohydrate amount: ${nutrtionDetails[1].amount}${nutrtionDetails[1].unit}`);
        carbElement.appendChild(carbNode);

        caloriesElement = document.createElement("p");
        caloriesElement.classList.add(`recipe-calories`);
        caloriesNode = document.createTextNode(`Calorie count: ${nutrtionDetails[0].amount}${nutrtionDetails[0].unit}`)
        caloriesElement.appendChild(caloriesNode);

        /* Servings */
        servingsElement = document.createElement("p")
        servingsElement.classList.add("recipe-servings");
        servingsNode = document.createTextNode(`Servings: ${serverResponse[i].servings}`)
        servingsElement.appendChild(servingsNode);

        /* Cook Time */
        let time;
        let hr;
        let mins;
        timeElement = document.createElement("p")
        timeElement.classList.add("recipe-time");
        if (serverResponse[i].readyInMinutes >= 60) {
            time = serverResponse[i].readyInMinutes
            hr = Math.floor(time/60);
            mins = Math.floor(((time/60) - hr) * 60)
            if ( mins !== 0) {
                timeNode = document.createTextNode(`Cook time: ${hr} hours, ${mins} minutes`)
            } else if (hr === 1){
                timeNode = document.createTextNode(`Cook time: ${hr} hour`)
            } else {
                timeNode = document.createTextNode(`Cook time: ${hr} hours`)
            }
        } else {
            timeNode = document.createTextNode(`Cook time: ${serverResponse[i].readyInMinutes} minutes`)
        }
        timeElement.appendChild(timeNode);


        let name_and_image = document.createElement("div");
        name_and_image.classList.add(`recipe-name-and-image`);
        name_and_image.appendChild(recipeNameElement);
        name_and_image.appendChild(imgElement);

        let recipe_numbers = document.createElement("div");
        recipe_numbers.classList.add(`recipe-numbers-wrapper`);
        recipe_numbers.appendChild(caloriesElement);
        recipe_numbers.appendChild(carbElement);
        recipe_numbers.appendChild(servingsElement);
        recipe_numbers.appendChild(timeElement);


        let recipe_info = document.createElement("div");
        recipe_info.classList.add(`recipe-info-wrapper`);
        recipe_info.appendChild(name_and_image);
        recipe_info.appendChild(recipe_numbers);

        result = document.createElement("div");
        result.classList.add(`recipe-result`)
        result.setAttribute("id", `result-0${i+1}`)

        result.appendChild(recipe_info);

        RESULTSX.appendChild(result)

        let EACH_RECIPE_RESULT;
        EACH_RECIPE_RESULT = document.querySelector(`#result-0${i+1}`);

        let ingredients = serverResponse[i].missedIngredients;

        for (let j = 0; j < ingredients.length; j++) {
            RESULTS.innerHTML += `<p class="recipe-ingredient" id="result-${i+1}-ingredient">${ingredients[j].original}</p>`
        }

        let INGREDIENT_LIST;
        let INGREDIENT_LIST_DIV;

        INGREDIENT_LIST_DIV = document.createElement("div") 
        INGREDIENT_LIST_DIV.classList.add(`recipe-ingredients-wrapper`);
        INGREDIENT_LIST = document.querySelectorAll(`#result-${i+1}-ingredient`);
        if (INGREDIENT_LIST.length !== 0) {
            INGREDIENT_LIST_DIV.innerHTML += `<h4 class="ingredient-header" id="ingredient-${i+1}-header">Ingredients: </h4>`
        } else {
            INGREDIENT_LIST_DIV.innerHTML += `<h4 class="ingredients-header" id="ingredients-${i+1}-header">Ingredients: </h4><p>Get the detailed ingredients at <a href="${serverResponse[i].sourceUrl}" target="_blank">${serverResponse[i].creditsText}</a></p>`
        }

        for (let i = 0; i < INGREDIENT_LIST.length; i++) {
            INGREDIENT_LIST_DIV.appendChild(INGREDIENT_LIST[i]); 
        }
        EACH_RECIPE_RESULT.appendChild(INGREDIENT_LIST_DIV) 

        let instructions = serverResponse[i].analyzedInstructions; 
        
        for (let inst = 0; inst < instructions.length; inst++) {
            let cookingSteps = instructions[inst].steps; 
    
            for (let s = 0; s < cookingSteps.length; s++) {
            RESULTS.innerHTML += `<p class="recipe-instruction" id="result-${i+1}-instruction">${cookingSteps[s].step}</p>` 
            }
            
        }

        let INSTRUCTION_LIST;
        let INSTRUCTION_LIST_DIV;

        INSTRUCTION_LIST_DIV = document.createElement("div") 
        INSTRUCTION_LIST_DIV.classList.add(`recipe-instructions-wrapper`);
        INSTRUCTION_LIST = document.querySelectorAll(`#result-${i+1}-instruction`); 

        if (INSTRUCTION_LIST.length !== 0) {
            INSTRUCTION_LIST_DIV.innerHTML += `<h4 class="instructions-header" id="instructions-${i+1}-header">Directions: </h4>`
        } else {
            INSTRUCTION_LIST_DIV.innerHTML += `<h4 class="instructions-header" id="instructions-${i+1}-header">Directions: </h4><p>Read the detailed directions at <a href="${serverResponse[i].sourceUrl}" target="_blank">${serverResponse[i].creditsText}</a></p>`
        }

        for (let i = 0; i < INSTRUCTION_LIST.length; i++) {
            INSTRUCTION_LIST_DIV.appendChild(INSTRUCTION_LIST[i]); 
        }
        EACH_RECIPE_RESULT.appendChild(INSTRUCTION_LIST_DIV) 

        let recipe_lists = document.createElement("div");
        recipe_lists.classList.add(`recipe-lists-wrapper`);
        recipe_lists.appendChild(INGREDIENT_LIST_DIV);
        recipe_lists.appendChild(INSTRUCTION_LIST_DIV);


        result.appendChild(recipe_lists);

        searchSession = localStorage.setItem("searchSession", RESULTSX.outerHTML);

      }
      
        NAV_SEARCH_BTN.forEach((button) => {
        button.classList.remove("no-pointer-event")
        })
  
      })
  
      .catch( (err) => {
    });

}

function checkScreenWidth() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        if (vw < 1100 && HOME_MAIN_LOGO.style.display === "none") {
            MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
            SEARCH_NAV_CONTAINER.style.display = "none";
            
        } else if (vw >= 60 && HOME_MAIN_LOGO.style.display === "none") {
            SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
            SEARCH_NAV_CONTAINER.style.display = "flex";
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "none";
        }
}

window.addEventListener("resize", checkScreenWidth, false)

SEARCH_BTN.addEventListener("click", search, false)

NAV_SEARCH_BTN.forEach((button) => {
    button.addEventListener("click", search, false)
})

function clickNavLogin () {
    window.scrollTo(0, 0);
    SEARCH_WRAP.style.display="none";
    if (AUTH_SIGNUP_WRAP.style.display !== "none"){
        AUTH_SIGNUP_WRAP.style.display = "none"
    }
    AUTH_LOGIN_WRAP.style.display="flex";
}

NAV_LOGIN_BTN.addEventListener("click", clickNavLogin, false);
LOGIN_LINK.addEventListener("click", clickNavLogin, false);


function clickNavSignup () {
    window.scrollTo(0, 0);
    SEARCH_WRAP.style.display="none";
    if (AUTH_LOGIN_WRAP.style.display !== "none"){
        AUTH_LOGIN_WRAP.style.display = "none"
    }
    AUTH_SIGNUP_WRAP.style.display="flex";
}

NAV_SIGNUP_BTN.addEventListener("click", clickNavSignup, false);
SIGNUP_LINK.addEventListener("click", clickNavSignup, false);

/* Login Logout */
function logout () {
    CURRENT_USER.classList.add("hide");
    localStorage.removeItem('searchHeader');
    localStorage.removeItem('searchSession');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/';
  }

NAV_LOGOUT_BTN.addEventListener("click", logout, false);


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}


function login() {
    login_loader.classList.remove("hide");

    if (LOGIN_EMAIL.value.trim() === "") {
        login_loader.classList.add("hide");
        LOGIN_EMAIL.placeholder = "Please enter your email address"
        LOGIN_EMAIL.classList.add("red");
    }

    if (LOGIN_PASSWORD.value.trim() === "") {
        login_loader.classList.add("hide");
        LOGIN_PASSWORD.placeholder = "Please enter your password"
        LOGIN_PASSWORD.classList.add("red");
    }

    if (LOGIN_EMAIL.value.trim() !== "" && LOGIN_PASSWORD.value.trim() !== "")
    axios.post(
        'https://us-central1-drecipe-dc133.cloudfunctions.net/api/login',
        {
            email: LOGIN_EMAIL.value,
            password: LOGIN_PASSWORD.value,
        })
        .then((response) => {
            login_loader.classList.add("hide");
            setAuthorizationHeader(response.data.token)
            
            updateCurrentUser(response.data.userDetails);
            appendUserDetails(response.data.userDetails);

            let name = response.data.userDetails.handle;
            let firstName = name.replace(/ .*/,'');

            CURRENT_USER.classList.remove("hide");
            CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;
    
            NAV_LOGIN_BTN.style.display="none"; 
            NAV_SIGNUP_BTN.style.display="none";
            AUTH_LOGIN_WRAP.style.display="none"; 
            NAV_LOGOUT_BTN.style.display="flex";
            SEARCH_WRAP.style.display="flex";
        })
        .catch((error) => {
            login_loader.classList.add("hide");
            document.querySelector(".wrong-credentials-login").innerHTML = "Wrong credentials, please try again";
        })

}


LOGIN_BTN.addEventListener("click", login, false);


const emailLabel = document.querySelector(".email-label");
const confirmPasswordLabel = document.querySelector(".confirm-password-label");
const passwordLabel = document.querySelector(".password-label");
const authInput = document.querySelectorAll(".auth-input");

let peanutStatus = false;
let soyStatus = false;
let diabetesStatus = false;
function signup () {
    signup_loader.classList.remove("hide");

    axios.post(
        'https://us-central1-drecipe-dc133.cloudfunctions.net/api/signup',
        {
            "handle": SIGNUP_NAME.value,
            "email": SIGNUP_EMAIL.value,
            "password": SIGNUP_PASSWORD.value,
            "confirmPassword": SIGNUP_CONFIRM_PASSWORD.value,
            "isDiabetic": diabetesStatus,
            "isPeanutAllergic": peanutStatus,
            "isSoyAllergic": soyStatus
        }
        )
        
    .then(function (response) {
        signup_loader.classList.add("hide");

        setAuthorizationHeader(response.data.token)

        updateCurrentUser(response.data.userDetails);
        CURRENT_USER.classList.remove("hide");

        let name = response.data.userDetails.handle;
        let firstName = name.replace(/ .*/,'');
        
        CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;

        appendUserDetails(response.data.userDetails)

        NAV_LOGIN_BTN.style.display="none";
        NAV_SIGNUP_BTN.style.display="none";
        AUTH_SIGNUP_WRAP.style.display="none";
        NAV_LOGOUT_BTN.style.display="flex";
        SEARCH_WRAP.style.display="flex";


    
    })
    .catch(function (error) {

        signup_loader.classList.add("hide");

        let nameError = error.response.data.handle;
        let emailError = error.response.data.email;
        let passwordError = error.response.data.password;
        let confirmPasswordError = error.response.data.confirmPassword;


          if (typeof nameError !== 'undefined') {
            SIGNUP_NAME.placeholder = "Please enter your name"
            SIGNUP_NAME.classList.add("red");
          }
          if (typeof emailError !== 'undefined') {
              SIGNUP_EMAIL.placeholder = "Please enter a valid email"
              emailLabel.innerHTML = "Please enter a valid email"
              SIGNUP_EMAIL.classList.add("red");
              emailLabel.innerHTML = "Please enter a valid email"
              emailLabel.innerHTML = error.response.data.email
          }
          if (typeof passwordError !== 'undefined') {
            if (passwordError !== "Please use a stronger password") {
                SIGNUP_PASSWORD.placeholder = "Please enter a password"
                SIGNUP_PASSWORD.classList.add("red");
            }

            passwordLabel.innerHTML = passwordError;
          }
          if (typeof confirmPasswordError !== 'undefined') {
            SIGNUP_CONFIRM_PASSWORD.placeholder = "Passwords do not match";
            SIGNUP_CONFIRM_PASSWORD.classList.add("red");

            confirmPasswordLabel.innerHTML = "Passwords do not match";
          }

    })
}

SIGNUP_BTN.addEventListener("click", signup, false);


SIGNUP_EMAIL.addEventListener("keypress", function(){
    emailLabel.innerHTML = "Email:";
}, false);

SIGNUP_PASSWORD.addEventListener("keypress", function(){
    passwordLabel.innerHTML = "Password:";
}, false);

SIGNUP_CONFIRM_PASSWORD.addEventListener("keypress", function(){
    confirmPasswordLabel.innerHTML = "Confirm password:"
}, false);


const SIGNUP_PEANUT = document.querySelector("#signup-peanut");
const SIGNUP_SOY = document.querySelector("#signup-soy");
const SIGNUP_DIABETES = document.querySelector("#signup-diabetes");


function peanut() {
    const PEANUT_BTN = document.querySelector("#peanut-btn");
    const CHECK = document.querySelector("#peanut-true");
    if (SIGNUP_PEANUT.className == "medical-condition-wrap false") {
        SIGNUP_PEANUT.className = "medical-condition-wrap true";
        peanutStatus = true;
        PEANUT_BTN.style.color = "#ed4700";
        PEANUT_BTN.style.border = "1px solid #ff6435";
        CHECK.style.display = "";
        CHECK.style.color = "#ed4700";

    } else if (SIGNUP_PEANUT.className = "medical-condition-wrap true") {
        SIGNUP_PEANUT.className = "medical-condition-wrap false";
        peanutStatus = false;
        PEANUT_BTN.style.color = "rgb(162, 162, 162)";
        PEANUT_BTN.style.border = "1px solid rgb(162, 162, 162)";
        CHECK.style.display = "none";
    }
}
SIGNUP_PEANUT.addEventListener("click", peanut, false);



function soy() {
    const SOY_BTN = document.querySelector("#soy-btn");
    const CHECK = document.querySelector("#soy-true");
    if (SIGNUP_SOY.className == "medical-condition-wrap false") {
        SIGNUP_SOY.className = "medical-condition-wrap true";
        soyStatus = true;
        SOY_BTN.style.color = "#ed4700";
        SOY_BTN.style.border = "1px solid #ff6435";
        CHECK.style.display = "";
        CHECK.style.color = "#ed4700";

    } else if (SIGNUP_SOY.className = "medical-condition-wrap true") {
        SIGNUP_SOY.className = "medical-condition-wrap false"
        soyStatus = false;
        SOY_BTN.style.color = "rgb(162, 162, 162)";
        SOY_BTN.style.border = "1px solid rgb(162, 162, 162)";
        CHECK.style.display = "none";
    }
}
SIGNUP_SOY.addEventListener("click", soy, false);



function diabetes() {
    const DIABETES_BTN = document.querySelector("#diabetes-btn");
    const CHECK = document.querySelector("#diabetes-true");
    if (SIGNUP_DIABETES.className == "medical-condition-wrap false") {
        SIGNUP_DIABETES.className = "medical-condition-wrap true";
        diabetesStatus = true;
        DIABETES_BTN.style.color = "#ed4700";
        DIABETES_BTN.style.border = "1px solid #ff6435";
        CHECK.style.display = "";
        CHECK.style.color = "#ed4700";

    } else if (SIGNUP_DIABETES.className = "medical-condition-wrap true") {
        SIGNUP_DIABETES.className = "medical-condition-wrap false";
        diabetesStatus = false;
        DIABETES_BTN.style.color = "rgb(162, 162, 162)";
        DIABETES_BTN.style.border = "1px solid rgb(162, 162, 162)";
        CHECK.style.display = "none";
    }
}
SIGNUP_DIABETES.addEventListener("click", diabetes, false);
