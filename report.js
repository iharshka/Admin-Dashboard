// To fetch Investor Name
var sharedauthtoken = localStorage.getItem("authData");
var Authorization;
// console.log(sharedauthtoken);
if (!sharedauthtoken) {
  Authorization = {
    Authorization: "",
  };
} else Authorization = JSON.parse(sharedauthtoken);
// console.log(Authorization);

//Code for DYNAMIC nav dropdown, limited Allowed page Access
document.addEventListener("DOMContentLoaded", async function () {
  $.ajax({
    url: "https://investors-backend.viiventures.co/funds/get-allowed-funds-users",
    method: "GET",
    headers: {
      Authorization: Authorization.Authorization,
    },
    success: function (result) {
      // console.log(result.body); //working fine
      var allowedfunds = result.body.allowed_funds;
      var allowedusers = result.body.allowed_users;

      allowedfunds.forEach(function (item, index) {
        var dropdownoption = document.getElementsByClassName(
          "fundopt" + `${index + 1}`
        );
        dropdownoption.innerHTML = `
        <a style="text-decoration: none; color: #ffffff;"href="${item.link}">${item.name}</a>
        <ul class="sub-menu for-hover"
            style="background-color: #2f455c; border-radius: 0.1em;">
            <li
                class="menu-item menu-item-type-post_type menu-item-object-page">
                <a style="text-decoration: none; color: #ffffff;"
                    href="${item.link}#2023">2023</a>
            </li>
            <li
                class="menu-item menu-item-type-post_type menu-item-object-page">
                <a style="text-decoration: none; color: #ffffff;"
                    href="${item.link}#2022">2022</a>
            </li>
            <li
                class="menu-item menu-item-type-post_type menu-item-object-page">
                <a style="text-decoration: none; color: #ffffff;"
                    href="${item.link}#2021">2021</a>
            </li>
        </ul>`;
        // console.log(index);
      });

      allowedusers.forEach(function (item, index) {
        var dropdownuser = document.getElementsByClassName(
          "useropt" + `${index + 1}`
        );
        dropdownuser.innerHTML = `
        <a style="text-decoration: none; color: #ffffff;" href="index2.html#${item.user}">${item.username}</a>`;
      });
    },
  });
});
var responseData;
var dataFromAPI;

document.addEventListener("DOMContentLoaded", async function () {
  $.ajax({
    url: "https://investors-backend.viiventures.co/funds/reports?format=json",
    type: "GET",
    contentType: "application/json",
    headers: {
      Authorization: Authorization.Authorization,
    },
    success: function (result) {
      // CallBack(result);
      // console.log(result);
      // responseData = result.json();
      // console.log(responseData);
      dataFromAPI = result.body;
      // console.log(result.body.overall_portfolio);

      if (result.status_code == 401)
        window.location.href = "auth-normal-sign-in.html";

      // Update the Username with the API call
      const usernameelement = document.getElementById("usernamerighttop");
      const usernameelementmbl = document.getElementById("usernamerighttopmbl");
      usernameelement.textContent = dataFromAPI.username;
      usernameelementmbl.textContent = dataFromAPI.username;

      //Investor Report Password and PDF Links SCRIPT
      // Function to update HTML content with the received data
      // Update VII Ventures SPC
      updateFund(dataFromAPI["VII Ventures SPC"], "fundspc");

      // Update VII Ventures Fund 1 SP
      updateFund(dataFromAPI["Vii Ventures Fund 1 SP"], "fund1spc");

      // Update VII Ventures Fund 2 SP
      updateFund(dataFromAPI["Vii Ventures Fund 2 SP"], "fund2spc");

      // Function to update a specific fund's data in HTML
      function updateFund(fundData, elementClass) {
        // Update the password
        const passwordElement = document.querySelector(`.${elementClass} p`);
        passwordElement.innerHTML = `<span style="font-weight: bolder; font-size: 14px;">Password:</span><span style="font-size: 14px;"> </span><span style="font-size: 14px;">${fundData.password}</span>`;

        // Update the download links for 2021 and 2022
        const downloadLinks = document.querySelectorAll(
          `.${elementClass} .elementor-button-link`
        );
        downloadLinks[0].href = fundData["2021"];
        downloadLinks[1].href = fundData["2022"];
      }
    },
  });
});

// async function fetchDataAndUpdateHTML() {
//   try {
//     // Make an API call to the provided endpoint
//     const response = await fetch(
//       "https://investors-backend.viiventures.co/funds/reports?format=json"
//     );
//     const apiData = await response.json();

//     // Update the HTML content with the received data
//     updateHTMLContent(apiData.body);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
