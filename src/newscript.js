import '../index.css'
// import '../gifs/loader.gif'
const  jwt_decode = require('jwt-decode');
const axios = require('axios');
const dayjs = require('dayjs');


// const LOADER = document.querySelector(".loader-container");
// window.addEventListener("load", function() {
//     LOADER.className += " hidden";
// })

const body = document.querySelector("body");

const resultsWrapper = document.querySelector("#results-wrap");


function updateCurrentUser(userDetails){
    let currentUser = userDetails;
    console.log(currentUser);
    return localStorage.setItem('currentUser', JSON.stringify(currentUser))
}


const userProfileModal =  document.querySelector(".user-profile-modal");


const closeBtn = document.querySelectorAll(".close-link");

const login_loader = document.querySelector(".loader-login");
const signup_loader = document.querySelector(".loader-signup");


const NAV_HOME= document.querySelector("#nav-home")

const SEARCH_NAV_CONTAINER = document.querySelector("#search-nav-container");
const MOBILE_SEARCH_NAV_CONTAINER = document.querySelector("#search-nav-container-mobile");

const CURRENT_USER = document.querySelector("#current-user"); //Current User Display Name

const MAIN_WRAP = document.querySelector("#main-wrap")

const sessionExpiredModal = document.querySelector(".session-expired-modal");

const NAV_LOGIN_BTN = document.querySelector("#nav-login"); //Nav Login Button
const LOGIN_LINK = document.querySelector("#login-link"); // Login link on signup page
const NAV_SIGNUP_BTN = document.querySelector("#nav-signup"); // Nav Signup Button
const SIGNUP_LINK = document.querySelector("#signup-link"); // Signup link on login page
const NAV_LOGOUT_BTN = document.querySelector("#nav-logout"); // Nav logout Button

const AUTH_LOGIN_WRAP = document.querySelector("#auth-login-wrap"); //Login Field Container
const AUTH_SIGNUP_WRAP = document.querySelector("#auth-signup-wrap"); //Signup Field Container
const SEARCH_WRAP = document.querySelector("#search-wrap"); // Search Field Container

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


// let state = {
//     searchResult: "",
//     searchHeader: "",
//     searchQuery: "",
//     // body: body.innerHTML
// }

// function render(){
//     RESULTSX.innerHTML = state.searchResult;
//     SEARCH_HEADER.innerHTML = state.searchHeader;
//     QUERY.value = state.searchQuery;
// }

// (function initialize() {
//     window.history.replaceState(state, null, "");
//     render(state);
//   })();




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
    console.log(firstName)

    CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;
    profileUserName.innerHTML = user.handle;
    profileUserEmail.innerHTML = user.email;

    handleElement.value = user.handle;

    dayjs().format()
    let dateCreated = dayjs(user.createdAt).format('MMM DD YYYY - (h:mm a)');
    profileUserDate.innerHTML = `You started using nutri-fí on <span class="orange">${dateCreated}</span>`
    let conditions = user.condition;

    console.log(conditions)

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

    console.log("diabetes", updateDiabetes.value);
    console.log("peanut", updatePeanut.value);
    console.log("soy", updateSoy.value);

}

// let peanutStatusUpdate;
// let soyStatusUpdate;
// let diabetesStatusUpdate;
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
    console.log("handle", handle)

    const TOKEN = localStorage.FBIdToken;
    let config;
    if(TOKEN) {
        const decodedToken = jwt_decode(TOKEN);
        if(decodedToken && (decodedToken.exp * 1000 < Date.now())){ //if TOKEN is expired
            console.log("yes")
            sessionExpiredModal.classList.remove("hide");
            // localStorage.removeItem('FBIdToken')
            // localStorage.removeItem('currentUser')
            // updateError.innerHTML = "Your current session expired, please login to update your profile. Or you can keep using the app anonymously"
            // window.location.href = '/';
            loaderUpdate.classList.add("hide");
            // CURRENT_USER.innerHTML = ""
        } else {
            console.log("no")
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
            console.log(response.data)

            updateCurrentUser(response.data.userDetails);

            appendUserDetails(response.data.userDetails);

            // checkTokenStatus();


            editableUserInfo.forEach((element) => {
                element.classList.remove("hide");
            })
            newUserInput.forEach((element) => {
                element.classList.add("hide");
            })

        })
        .catch(function (error) {
            loaderUpdate.classList.add("hide");
            console.log(error.response.data)
        })


}

saveUserUpdate.addEventListener("click", updateUserInfo, false)



closeBtn.forEach((button) => {
    button.addEventListener("click", function(){
        console.log(HOME_MAIN_LOGO.style.display)
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


// GO HOME 
function goHome() {
    let searchSession = localStorage.searchSession;
    if(searchSession) {
        localStorage.removeItem('searchSession');
        localStorage.removeItem('searchHeader')
    }

}
NAV_HOME.addEventListener("click", goHome, false);


document.addEventListener("click", (evt) => {
    let targetElement = evt.target; // clicked element

    if (AUTH_LOGIN_WRAP.style.display == "none" && AUTH_SIGNUP_WRAP.style.display == "none") {
        console.log("Login and Signup Wrap is not visible")
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
        console.log(decodedToken.exp * 1000);
        console.log(Date.now())
        if(decodedToken.exp * 1000 < Date.now()){ //if TOKEN is expired
            // localStorage.removeItem('currentUser');    
            // localStorage.removeItem('FBIdToken');
            sessionExpiredModal.classList.remove("hide");
            // ERROR_MSG.innerHTML = `<h3> Session expired, please login or continue to use the app anonymously.</h3>`
            // CURRENT_USER.innerHTML = ""
        }
    } else if (!TOKEN) {
        localStorage.removeItem('currentUser');    
    }
    if (currentUser) {
        appendUserDetails(currentUser);

        let name = currentUser.handle;
        let firstName = name.replace(/ .*/,'');
        console.log(firstName)

        CURRENT_USER.classList.remove("hide")
        CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;
        console.log(CURRENT_USER.innerHTML)

        NAV_LOGIN_BTN.style.display="none"; // Hide Nav Login Button
        NAV_SIGNUP_BTN.style.display="none"; // Hide Nav Signup Button
        AUTH_LOGIN_WRAP.style.display="none"; // Hide Login Field
        NAV_LOGOUT_BTN.style.display="flex"; // Show Nav Logout Button
        SEARCH_WRAP.style.display="flex"; // Show search Field
        console.log(currentUser)
    }
}());


(function checkSearchSession() {
    let searchSession = localStorage.searchSession;
    if (searchSession) {
        console.log(searchSession)
        RESULTSX.innerHTML = searchSession;
        
        SEARCH_HEADER.innerHTML = localStorage.searchHeader
        HOME_MAIN_LOGO.style.display = "none";
        HOME_CAPTION.style.display = "none";


        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        console.log(vw)
            if (vw < 1100 && HOME_MAIN_LOGO.style.display === "none") {
                MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
                MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
                SEARCH_NAV_CONTAINER.style.display = "none";
                console.log("mobile")
                
            } else if (vw >= 1100 && HOME_MAIN_LOGO.style.display === "none") {
                SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
                SEARCH_NAV_CONTAINER.style.display = "flex";
                MOBILE_SEARCH_NAV_CONTAINER.style.display = "none";
                console.log("not mobile")
    
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
    // return query;
}
// changeHeader(query);



let queryTerms = [];

let searchHeader
let searchSession;
function search() {
    NAV_SEARCH_BTN.forEach((button) => {
        button.classList.add("no-pointer-event")
    })

    
    let query = QUERY.value;
    changeHeader(query);

    // history.pushState(query, `search for ${query}`, `/search=${query}`)

    if (query.trim() === '') {
        ERROR_MSG.innerHTML = "Search must not be empty, please enter a valid recipe"
        SEARCH_HEADER.innerHTML = `Error`;
        // SEARCH_HEADER.innerHTML = ""
    } else {
        // LOADER.className = "loader-container"
        ERROR_MSG.innerHTML = ""
    }

    console.log(query);


    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    console.log(vw)
        if (vw < 1100) {
            MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
            SEARCH_NAV_CONTAINER.style.display = "none";
            console.log("mobile")
            
        } else {
            SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
            SEARCH_NAV_CONTAINER.style.display = "flex";
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "none";
            console.log("not mobile")
        }



    SEARCH_BTN_MAIN.style.display = "none";
    QUERY.className = "search-nav"

    HOME_MAIN_LOGO.style.display = "none";
    HOME_CAPTION.style.display = "none";
    

    // let currentUser = localStorage.currentUser
    const TOKEN = localStorage.FBIdToken;
    let config;
    console.log(`Current Token is ${TOKEN}`)
    if(TOKEN) {
        console.log("there is a token")
        const decodedToken = jwt_decode(TOKEN);
        if(decodedToken && (decodedToken.exp * 1000 < Date.now())){ //if TOKEN is expired
            
            localStorage.removeItem('FBIdToken')
            localStorage.removeItem('currentUser')
            window.location.href = '/';
            ERROR_MSG.innerHTML = `<h3> Session expired, please login or continue to use the app anonymously.</h3>`
            CURRENT_USER.innerHTML = ""
        } else {
          config = {
            headers: { Authorization: `${TOKEN}` }
          };
          console.log("Using token for authorization")
        }
      } else {
        config = {
          headers: { Authorization: null}
        }
        console.log("NOT using token for authorization")
      }

    console.log(config);

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
            console.log("Former search session removed")
        }
        if (serverResponse == "") {
            if (config.headers.Authorization !== null) {
                ERROR_MSG.innerHTML = `It looks like there aren't any great matches for your search. You might be allergic to food containing <span class="orange">${query}</span>. Please try again.`
            } else {
                ERROR_MSG.innerHTML = `It looks like there aren't any great matches for your search, please try again.`
            }
            SEARCH_HEADER.innerHTML = `No results for <span style="color:#ed4700">${query}</span>`;

         }
        //  if (Object.keys(serverResponse).length === 0) {
        //     console.log(serverResponse);
        //     console.log(typeof(serverResponse))
        // }

        

        if (serverResponse.length > 0) {
            SEARCH_HEADER.innerHTML = `Showing results for <span style="color:#ed4700">${query}</span>`;

            // LOADER.className += " hidden";

            // SEARCH_HEADER.innerHTML = `Showing results for <span style="color:#ed4700">${query}</span>`;
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

        // imgElement.src = `${serverResponse[i].image}`;
  
        /* Carbohydrate Content */
        let nutrtionDetails = serverResponse[i].nutrition.nutrients



        carbElement = document.createElement("p");
        carbElement.classList.add(`recipe-carb`);
        console.log("ahhhhhhhhhhh")
        carbNode = document.createTextNode(`Carbohydrate amount: ${nutrtionDetails[1].amount}${nutrtionDetails[1].unit}`);
        console.log("gooooooooooooo")
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
        
       
        /*** APPENDING ELEMENTS TO WRAPPERS***************/


        // Recipe Name and Image Wrapper Div
        let name_and_image = document.createElement("div");
        name_and_image.classList.add(`recipe-name-and-image`);
        name_and_image.appendChild(recipeNameElement);
        name_and_image.appendChild(imgElement);

        // Recipe Numbers Wrapper Div
        let recipe_numbers = document.createElement("div");
        recipe_numbers.classList.add(`recipe-numbers-wrapper`);
        recipe_numbers.appendChild(caloriesElement);
        recipe_numbers.appendChild(carbElement);
        recipe_numbers.appendChild(servingsElement);
        recipe_numbers.appendChild(timeElement);


        // Recipe Info Wrapper Div
        let recipe_info = document.createElement("div");
        recipe_info.classList.add(`recipe-info-wrapper`);
        recipe_info.appendChild(name_and_image);
        recipe_info.appendChild(recipe_numbers);
        
        /*** APPEND ALL ELEMENTS TO RESULTSX */
        result = document.createElement("div");
        result.classList.add(`recipe-result`)
        result.setAttribute("id", `result-0${i+1}`)

        result.appendChild(recipe_info);
        // result.appendChild(recipe_lists);

        RESULTSX.appendChild(result)

        // searchSession = localStorage.setItem("searchSession", RESULTSX.outerHTML);

        /****************************************************/

        let EACH_RECIPE_RESULT;
        EACH_RECIPE_RESULT = document.querySelector(`#result-0${i+1}`); // Each recipe in serverResponse obtained from invisible RESULTS

        /************************************* RECIPE INGREDIENTS **************************************************************/
        let ingredients = serverResponse[i].missedIngredients; // Obtain ingredients from server response

        for (let j = 0; j < ingredients.length; j++) {
            RESULTS.innerHTML += `<p class="recipe-ingredient" id="result-${i+1}-ingredient">${ingredients[j].original}</p>` // Add recipes to the  invisible RESULTS
        }

        let INGREDIENT_LIST;
        let INGREDIENT_LIST_DIV;

        INGREDIENT_LIST_DIV = document.createElement("div") // Create a div for ingredients list
        INGREDIENT_LIST_DIV.classList.add(`recipe-ingredients-wrapper`);
        INGREDIENT_LIST = document.querySelectorAll(`#result-${i+1}-ingredient`); // Ingredients lists belonging to each serverResponse recipe obtained from invisible RESULTS
        console.log(INGREDIENT_LIST.length);
        if (INGREDIENT_LIST.length !== 0) {
            INGREDIENT_LIST_DIV.innerHTML += `<h4 class="ingredient-header" id="ingredient-${i+1}-header">Ingredients: </h4>`
        } else {
            INGREDIENT_LIST_DIV.innerHTML += `<h4 class="ingredients-header" id="ingredients-${i+1}-header">Ingredients: </h4><p>Get the detailed ingredients at <a href="${serverResponse[i].sourceUrl}" target="_blank">${serverResponse[i].creditsText}</a></p>`
        }

        for (let i = 0; i < INGREDIENT_LIST.length; i++) {
            INGREDIENT_LIST_DIV.appendChild(INGREDIENT_LIST[i]); // Append ingredients list to each recipe response
        }
        EACH_RECIPE_RESULT.appendChild(INGREDIENT_LIST_DIV) // Append ingredients to each ingredients list div
        /*************************************************************************************************************************/


        /************************************* COOKING INSTRUCTIONS **************************************************************/
        let instructions = serverResponse[i].analyzedInstructions; // Obtain instructions object from server response
        
        for (let inst = 0; inst < instructions.length; inst++) {
            let cookingSteps = instructions[inst].steps; // Obtain instructions steps object from each recipe
    
            for (let s = 0; s < cookingSteps.length; s++) {
            RESULTS.innerHTML += `<p class="recipe-instruction" id="result-${i+1}-instruction">${cookingSteps[s].step}</p>` // Obtain each instruction step  from instructions steps object and add to invisible RESULT element
            }
            
        }

        let INSTRUCTION_LIST;
        let INSTRUCTION_LIST_DIV;

        INSTRUCTION_LIST_DIV = document.createElement("div") // Create a div for instructions list
        INSTRUCTION_LIST_DIV.classList.add(`recipe-instructions-wrapper`);
        INSTRUCTION_LIST = document.querySelectorAll(`#result-${i+1}-instruction`); // Instructions lists belonging to each serverResponse recipe obtained from invisible RESULTS

        if (INSTRUCTION_LIST.length !== 0) {
            INSTRUCTION_LIST_DIV.innerHTML += `<h4 class="instructions-header" id="instructions-${i+1}-header">Directions: </h4>`
        } else {
            INSTRUCTION_LIST_DIV.innerHTML += `<h4 class="instructions-header" id="instructions-${i+1}-header">Directions: </h4><p>Read the detailed directions at <a href="${serverResponse[i].sourceUrl}" target="_blank">${serverResponse[i].creditsText}</a></p>`
            console.log("Hello eyin temi")
        }

        for (let i = 0; i < INSTRUCTION_LIST.length; i++) {
            INSTRUCTION_LIST_DIV.appendChild(INSTRUCTION_LIST[i]); // Append instructions list to each recipe response
        }
        EACH_RECIPE_RESULT.appendChild(INSTRUCTION_LIST_DIV) // Append instructions to each instructions list div

        /*************************************************************************************************************************/

        // Recipe Lists Wrapper Div
        let recipe_lists = document.createElement("div");
        recipe_lists.classList.add(`recipe-lists-wrapper`);
        recipe_lists.appendChild(INGREDIENT_LIST_DIV);
        recipe_lists.appendChild(INSTRUCTION_LIST_DIV);


        result.appendChild(recipe_lists);

        searchSession = localStorage.setItem("searchSession", RESULTSX.outerHTML);

      }

        // state.searchQuery = QUERY.value;
        // state.searchResult = RESULTSX.innerHTML;
        // state.searchHeader = SEARCH_HEADER.innerHTML;

        // window.history.pushState(state, null, "")
      
        NAV_SEARCH_BTN.forEach((button) => {
        button.classList.remove("no-pointer-event")
        })
  
      })
  
      .catch( (err) => {
          console.log(err.response);
    });

}

// window.onpopstate = function (event) {
//     if (event.state) { state = event.state; }
//     searchSession = localStorage.setItem("searchSession", state.searchResult);
//     searchHeader = localStorage.setItem("searchHeader", state.searchHeader);
//     if (state.searchResult == "") {
//         // window.location.href = '/index.html';
//     }
//     render(state);
//   };


function checkScreenWidth() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    console.log(vw)
        if (vw < 1100 && HOME_MAIN_LOGO.style.display === "none") {
            MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
            SEARCH_NAV_CONTAINER.style.display = "none";
            console.log("mobile")
            
        } else if (vw >= 60 && HOME_MAIN_LOGO.style.display === "none") {
            SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
            SEARCH_NAV_CONTAINER.style.display = "flex";
            MOBILE_SEARCH_NAV_CONTAINER.style.display = "none";
            console.log("not mobile")

        }
}

// let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
// console.log(isMobile)
// if (isMobile) {
//     MOBILE_SEARCH_NAV_CONTAINER.insertBefore(QUERY, MOBILE_SEARCH_NAV_CONTAINER.firstChild);
//     MOBILE_SEARCH_NAV_CONTAINER.style.display = "flex";
// } else {
//     SEARCH_NAV_CONTAINER.insertBefore(QUERY, SEARCH_NAV_CONTAINER.firstChild);
//     SEARCH_NAV_CONTAINER.style.display = "flex";
// }


window.addEventListener("resize", checkScreenWidth, false)


// document.querySelector(".back").addEventListener("click", function(){
//     console.log(queryTerms);
//     console.log(queryTerms[queryTerms.length - 2])

//     query = queryTerms[queryTerms.length - 2];
//     console.log(query);
//     search("muffins");

//     queryTerms.pop(query)
//     // console.log(queryTerms.pop())
// })


// window.addEventListener("popstate", event => {
//     console.log(event.state.value)
//     console.log(query);
//     changeHeader(event.state);
//     console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
// })

SEARCH_BTN.addEventListener("click", search, false)

NAV_SEARCH_BTN.forEach((button) => {
    button.addEventListener("click", search, false)
})
// NAV_SEARCH_BTN.addEventListener("click", search, false)

/* Navivation Buttons */

function clickNavLogin () {
    window.scrollTo(0, 0);
    SEARCH_WRAP.style.display="none";
    if (AUTH_SIGNUP_WRAP.style.display !== "none"){
        AUTH_SIGNUP_WRAP.style.display = "none"
    }
    AUTH_LOGIN_WRAP.style.display="flex";
    console.log("Nav Login Button Clicked");
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
    console.log("Nav Signup Button Clicked");
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



/* Search Button */





/* Login Button */
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
            console.log(firstName)

            CURRENT_USER.classList.remove("hide");
            CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;
    
            NAV_LOGIN_BTN.style.display="none"; // Hide Nav Login Button
            NAV_SIGNUP_BTN.style.display="none"; // Hide Nav Signup Button
            AUTH_LOGIN_WRAP.style.display="none"; // Hide Login Field
            NAV_LOGOUT_BTN.style.display="flex"; // Show Nav Logout Button
            SEARCH_WRAP.style.display="flex"; // Show search Field
        })
        .catch((error) => {
            login_loader.classList.add("hide");
            document.querySelector(".wrong-credentials-login").innerHTML = "Wrong credentials, please try again";
            console.log(error.response.data.general)
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


    console.log("Signup Button Clicked")
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

        console.log(response.data.userName)
        console.log(response.data.token)
        setAuthorizationHeader(response.data.token)

        updateCurrentUser(response.data.userDetails);
        CURRENT_USER.classList.remove("hide");

        let name = response.data.userDetails.handle;
        let firstName = name.replace(/ .*/,'');
        console.log(firstName)
        
        CURRENT_USER.innerHTML = `<span class="material-icons">account_circle</span>Hello &nbsp; <span class="orange">  ${firstName}</span>`;

        appendUserDetails(response.data.userDetails)

        NAV_LOGIN_BTN.style.display="none"; // Hide Nav Login Button
        NAV_SIGNUP_BTN.style.display="none"; // Hide Nav Signup Button
        AUTH_SIGNUP_WRAP.style.display="none"; // Hide Login Field
        NAV_LOGOUT_BTN.style.display="flex"; // Show Nav Logout Button
        SEARCH_WRAP.style.display="flex"; // Show search Field


    
    })
    .catch(function (error) {

        signup_loader.classList.add("hide");
        console.log(error.response)

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
              console.log(error.response.data)
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





/* SIGNUP ALLERGIES*/

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
        console.log(peanutStatus);

    } else if (SIGNUP_PEANUT.className = "medical-condition-wrap true") {
        SIGNUP_PEANUT.className = "medical-condition-wrap false";
        peanutStatus = false;
        PEANUT_BTN.style.color = "rgb(162, 162, 162)";
        PEANUT_BTN.style.border = "1px solid rgb(162, 162, 162)";
        CHECK.style.display = "none";
        console.log(peanutStatus);
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
        console.log(soyStatus);

    } else if (SIGNUP_SOY.className = "medical-condition-wrap true") {
        SIGNUP_SOY.className = "medical-condition-wrap false"
        soyStatus = false;
        SOY_BTN.style.color = "rgb(162, 162, 162)";
        SOY_BTN.style.border = "1px solid rgb(162, 162, 162)";
        CHECK.style.display = "none";
        console.log(soyStatus);
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
        console.log(diabetesStatus);

    } else if (SIGNUP_DIABETES.className = "medical-condition-wrap true") {
        SIGNUP_DIABETES.className = "medical-condition-wrap false";
        diabetesStatus = false;
        DIABETES_BTN.style.color = "rgb(162, 162, 162)";
        DIABETES_BTN.style.border = "1px solid rgb(162, 162, 162)";
        CHECK.style.display = "none";
        console.log(diabetesStatus);
    }
}
SIGNUP_DIABETES.addEventListener("click", diabetes, false);
