document.addEventListener("DOMContentLoaded", () => {
  // Fetch API
  let container = document.getElementById("container");
  if (container) {
    const products = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        data.map((d) => {
          let product = document.createElement("div");
          let prodImg = document.createElement("img");
          let title = document.createElement("div");
          let price = document.createElement("div");
          let ratings = document.createElement("div");

          product.classList.add("product");
          prodImg.classList.add("prodImg");
          title.classList.add("title");
          price.classList.add("price");
          ratings.classList.add("ratings");

          // Add data
          prodImg.src = d.image;
          title.innerText = d.title;
          price.innerText = `SAR ${d.price}`;
          ratings.innerText = `⭐️ ${d.rating.rate} (${d.rating.count})`;

          // Append data
          product.appendChild(prodImg);
          product.appendChild(title);
          product.appendChild(price);
          product.appendChild(ratings);

          container.appendChild(product);
        });
      } catch (err) {
        console.log(err);
      }
    };
    products();
  }

  let profile = document.getElementById("profile");
  if (profile) {
    let signOut = document.getElementById("signOut");
    if (localStorage.getItem("loggedIn")) {
      signOut.innerText = "Sign Out";
      let signInBtn = document.getElementById("signIn-btn");
      signInBtn.innerText = "Start Shopping";
      signInBtn.href = "#";
      profile.innerText = localStorage.getItem("username");
      profile.href = "#";
    } else {
      profile.innerText = "Sign In";
      profile.href = "signIn.html";
    }
    signOut.onclick = (e) => {
      localStorage.removeItem("loggedIn");
    };
  }

  // Handle Sign up
  if (window.location.pathname.includes("signUp.html")) {
    const signUp = () => {
      let signUpForm = document.getElementById("signUp-form");
      let email = document.getElementById("email");
      let username = document.getElementById("username");
      let password = document.getElementById("password");
      signUpForm.onsubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("email", email.value);
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);
        window.location.href = "signIn.html";
      };
    };
    signUp();
  }

  // Handle Sign in
  if (window.location.pathname.includes("signIn.html")) {
    const signIn = () => {
      let signInForm = document.getElementById("signIn-form");
      let username = document.getElementById("username");
      let password = document.getElementById("password");
      signInForm.onsubmit = (e) => {
        e.preventDefault();
        if (
          localStorage.getItem("username") === username.value &&
          localStorage.getItem("password") === password.value
        ) {
          window.location.href = "index.html";
          localStorage.setItem("loggedIn", "true");
        } else {
          alert("Sorry, username or password is not correct");
        }
      };
    };
    signIn();
  }
});
