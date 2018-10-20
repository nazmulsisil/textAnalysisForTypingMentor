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

  fetch(`/getWords?wordLength=${wordLength.value}&howMany=${howMany.value}`)
    .then(function(response) {
      return response.text();
    })
    .then(function(result) {
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
        alert(result);
      }
    });
});

getParaBtn.addEventListener('click', () => {
  paraResult.innerHTML = `<img style="height: 20px; margin: 10px;" className="loader__image" src="/images/loader.gif" />`;

  fetch(
    `/getParagraph?paraMinLength=${paraMin.value}&paraMaxLength=${
      paraMax.value
    }`
  )
    .then(function(response) {
      return response.text();
    })
    .then(function(result) {
      paraResult.textContent = result;
    });
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
