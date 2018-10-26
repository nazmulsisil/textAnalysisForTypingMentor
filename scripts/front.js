const jsonBtn = document.querySelector('.json-btn');
const wordLength = document.querySelector('.word-length');
const howMany = document.querySelector('.how-many');
const jsonResultDiv = document.querySelector('.json-result');

const getParaBtn = document.querySelector('.get-para-btn');
const paraMin = document.querySelector('.para-min');
const paraMax = document.querySelector('.para-max');
const paraResult = document.querySelector('.para-result');

jsonBtn.addEventListener('click', () => {
  jsonResultDiv.innerHTML = `<img style="height: 20px; margin: 10px;" className="loader__image" src="/images/loader.gif" />`;

  // Error handling: by default we start the following setTimeout which alerts the
  // user after some time to inform something went wrong.
  // But in case navigator.online is false then in the else section we've cancelled the
  // following timeout function, otherwise there will be redundant alerts to the user.
  // Same thing was done if navigator.online is true and fetch.then() or fetch.catch() happens.
  // so there will be 3 clearTimeout places
  const fetchBtnStartTime = setTimeout(() => {
    jsonResultDiv.innerHTML = '';
    alert('Something went wrong, please try again!');
  }, 20000);

  if (navigator.onLine) {
    fetch(`/getWords?wordLength=${wordLength.value}&howMany=${howMany.value}`)
      .then(function(response) {
        return response.text();
      })
      .then(function(result) {
        clearTimeout(fetchBtnStartTime);
        let finalData = result;

        if (IsJsonString(result) && Array.isArray(JSON.parse(result))) {
          finalData = JSON.parse(result)
            .filter(wordObj => {
              const word = Object.keys(wordObj)[0];
              return !/[\W]+/g.test(word);
            })
            .map(wordObj => {
              return Object.keys(wordObj)[0];
            });

          jsonResultDiv.innerHTML = `
            <div>
              <b>json result:</b>
              <br>
              ${finalData.join('<br>')}
            </div>
          `;
        } else {
          jsonResultDiv.innerHTML = '';
          alert(result);
        }
      })
      .catch(() => {
        jsonResultDiv.innerHTML = '';
        alert('Something went wrong, please try again!');
        clearTimeout(fetchBtnStartTime);
      });
  } else {
    jsonResultDiv.innerHTML = '';
    alert('Could not connect to the internet!');
    clearTimeout(fetchBtnStartTime);
  }
});

getParaBtn.addEventListener('click', () => {
  paraResult.innerHTML = `<img style="height: 20px; margin: 10px;" className="loader__image" src="/images/loader.gif" />`;

  // Error handling: by default we start the following setTimeout which alerts the
  // user after some time to inform something went wrong.
  // But in case navigator.online is false then in the else section we've cancelled the
  // following timeout function, otherwise there will be redundant alerts to the user.
  // Same thing was done if navigator.online is true and fetch.then() or fetch.catch() happens.
  // so there will be 3 clearTimeout places
  const fetchBtnStartTime = setTimeout(() => {
    paraResult.innerHTML = '';
    alert('Something went wrong, please try again!');
  }, 20000);

  if (navigator.onLine) {
    fetch(
      `/getParagraph?paraMinLength=${paraMin.value}&paraMaxLength=${
        paraMax.value
      }`
    )
      .then(function(response) {
        clearTimeout(fetchBtnStartTime);
        return response.text();
      })
      .then(function(result) {
        paraResult.textContent = result;
      })
      .catch(() => {
        paraResult.innerHTML = '';
        alert('Something went wrong, please try again!');
        clearTimeout(fetchBtnStartTime);
      });
  } else {
    paraResult.innerHTML = '';
    alert('Could not connect to the internet!');
    clearTimeout(fetchBtnStartTime);
  }
});

//
//
//
//
//////// Helper function //////////
//
//
//
//
//
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
